import bcrypt from 'bcrypt'
import pool from '../data/database.js'
import { createSession, setSessionCookie } from '../services/session.service.js'

// req.body has already been validated and normalized by authValidation.

const SALT_ROUNDS = 12

// Unique constraint name -> request field, for 409 responses.
const UNIQUE_FIELDS = {
  users_email_key: 'email',
  users_username_key: 'username',
}

export async function signup(req, res) {
  const { email, username, password, display_name, avatar_url } = req.body

  const client = await pool.connect()
  try {
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS)

    // User and session are created together: if the session insert fails,
    // the user row is rolled back too.
    await client.query('begin')

    const { rows } = await client.query(
      `insert into users (email, username, password_hash, display_name, avatar_url)
       values ($1, $2, $3, $4, $5)
       returning id, email, username, display_name, avatar_url, email_verified, created_at`,
      [email, username, passwordHash, display_name, avatar_url],
    )
    const user = rows[0]
    const session = await createSession(client, user.id)

    await client.query('commit')

    setSessionCookie(res, session)
    res.status(201).json({ message: 'Account created', user, expires_at: session.expires_at })
  } catch (err) {
    await client.query('rollback').catch(() => {})

    // 23505 = unique_violation: email or username already taken
    if (err.code === '23505') {
      const field = UNIQUE_FIELDS[err.constraint] ?? 'account'
      return res.status(409).json({
        message: 'Account already exists',
        errors: { [field]: [`This ${field} is already in use`] },
      })
    }

    console.error('Signup failed', err)
    res.status(500).json({ message: 'Something went wrong, please try again' })
  } finally {
    client.release()
  }
}

// Runs after requireAuth, which has already checked the session.
export function me(req, res) {
  res.json({ user: req.user, expires_at: req.session.expires_at })
}

// Compared against when the email is unknown, so a missing account takes
// as long to reject as a wrong password and can't be detected by timing.
const DUMMY_HASH = bcrypt.hashSync('dummy-password', SALT_ROUNDS)

export async function signin(req, res) {
  const { email, password } = req.body

  const client = await pool.connect()
  try {
    const { rows } = await client.query(
      `select id, email, username, password_hash, display_name, avatar_url, email_verified
       from users
       where email = $1`,
      [email],
    )
    const user = rows[0]

    const passwordMatches = await bcrypt.compare(password, user?.password_hash ?? DUMMY_HASH)

    // Same response for unknown email and wrong password, so it doesn't reveal
    // which emails have accounts.
    if (!user || !passwordMatches) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    await client.query('begin')

    const { rows: updated } = await client.query(
      `update users
       set last_login_at = now(), updated_at = now()
       where id = $1
       returning last_login_at`,
      [user.id],
    )
    const session = await createSession(client, user.id)

    await client.query('commit')

    const { password_hash, ...publicUser } = user
    setSessionCookie(res, session)
    res.json({
      message: 'Signed in',
      user: { ...publicUser, last_login_at: updated[0].last_login_at },
      expires_at: session.expires_at,
    })
  } catch (err) {
    await client.query('rollback').catch(() => {})
    console.error('Signin failed', err)
    res.status(500).json({ message: 'Something went wrong, please try again' })
  } finally {
    client.release()
  }
}

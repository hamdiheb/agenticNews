import bcrypt from 'bcrypt'
import pool from '../data/database.js'

// req.body has already been validated and normalized by authValidation.

const SALT_ROUNDS = 12

// Unique constraint name -> request field, for 409 responses.
const UNIQUE_FIELDS = {
  users_email_key: 'email',
  users_username_key: 'username',
}

export async function signup(req, res) {
  const { email, username, password, display_name, avatar_url } = req.body

  try {
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS)

    const { rows } = await pool.query(
      `insert into users (email, username, password_hash, display_name, avatar_url)
       values ($1, $2, $3, $4, $5)
       returning id, email, username, display_name, avatar_url, email_verified, created_at`,
      [email, username, passwordHash, display_name, avatar_url],
    )

    res.status(201).json({ message: 'Account created', user: rows[0] })
  } catch (err) {
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
  }
}

export async function signin(req, res) {
  res.status(501).json({ message: 'Sign in is not implemented yet' })
}

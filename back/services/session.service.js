import crypto from 'node:crypto'
import pool from '../data/database.js'

export const SESSION_COOKIE = 'session_id'

// Creates a session row for the user. Pass a transaction client to run it
// inside the caller's transaction. expires_at uses the table default (3 days).
export async function createSession(db, userId) {
  const sessionId = crypto.randomBytes(32).toString('hex')

  const { rows } = await db.query(
    `insert into sessions (user_id, session_id)
     values ($1, $2)
     returning session_id, expires_at`,
    [userId, sessionId],
  )

  return rows[0]
}

// Looks up a session with its user. `expired` is computed by the database
// so the comparison uses the same clock that set expires_at.
export async function findSession(sessionId) {
  const { rows } = await pool.query(
    `select s.id as session_row_id, s.valid, s.expires_at,
            s.expires_at <= now() as expired,
            u.id, u.email, u.username, u.display_name, u.avatar_url,
            u.email_verified, u.last_login_at, u.created_at
     from sessions s
     join users u on u.id = s.user_id
     where s.session_id = $1`,
    [sessionId],
  )
  return rows[0]
}

export async function invalidateSession(sessionRowId) {
  await pool.query('update sessions set valid = false where id = $1', [sessionRowId])
}

// httpOnly keeps the session id away from page scripts. Clearing a cookie
// only works with the same options it was set with, so they're shared.
const cookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
})

// The cookie expires together with the session row.
export function setSessionCookie(res, session) {
  res.cookie(SESSION_COOKIE, session.session_id, {
    ...cookieOptions(),
    expires: session.expires_at,
  })
}

export function clearSessionCookie(res) {
  res.clearCookie(SESSION_COOKIE, cookieOptions())
}

import {
  SESSION_COOKIE,
  findSession,
  invalidateSession,
  clearSessionCookie,
} from '../services/session.service.js'

// Lets the request through only with a valid, unexpired session cookie.
// On success the signed-in user is available as req.user.
export default async function requireAuth(req, res, next) {
  const sessionId = req.cookies?.[SESSION_COOKIE]

  if (!sessionId) {
    return res.status(401).json({ message: 'Please sign in' })
  }

  try {
    const session = await findSession(sessionId)

    if (!session || !session.valid) {
      clearSessionCookie(res)
      return res.status(401).json({ message: 'Please sign in' })
    }

    if (session.expired) {
      await invalidateSession(session.session_row_id)
      clearSessionCookie(res)
      return res.status(401).json({ message: 'Your session has expired, please sign in again' })
    }

    const { session_row_id, valid, expired, expires_at, ...user } = session
    req.user = user
    req.session = { id: session_row_id, expires_at }
    next()
  } catch (err) {
    console.error('Session check failed', err)
    res.status(500).json({ message: 'Something went wrong, please try again' })
  }
}

import {
  validateEmail,
  validatePassword,
  validateUsername,
  validateDisplayName,
  validateAvatarUrl,
  collectErrors,
} from './validationRules.js'

export function validateSignin(req, res, next) {
  const { email, password } = req.body ?? {}

  const errors = collectErrors({
    email: validateEmail(email),
    password: validatePassword(password),
  })

  if (Object.keys(errors).length) {
    return res.status(400).json({ message: 'Validation failed', errors })
  }

  req.body.email = email.trim().toLowerCase()
  next()
}

// Validates the client-provided columns of the users table.
// id, email_verified, last_login_at and the timestamps are set by the server/database.
export function validateSignup(req, res, next) {
  const { email, username, password, display_name, avatar_url } = req.body ?? {}

  const errors = collectErrors({
    email: validateEmail(email),
    username: validateUsername(username),
    password: validatePassword(password),
    display_name: validateDisplayName(display_name),
    avatar_url: validateAvatarUrl(avatar_url),
  })

  if (Object.keys(errors).length) {
    return res.status(400).json({ message: 'Validation failed', errors })
  }

  // Keep only the fields signup is allowed to set, normalized.
  req.body = {
    email: email.trim().toLowerCase(),
    username: username.trim(),
    password,
    display_name: display_name.trim(),
    avatar_url: avatar_url || null,
  }
  next()
}

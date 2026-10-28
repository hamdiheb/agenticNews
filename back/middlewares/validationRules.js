// Field rules shared by the auth validation middlewares.
// Each validator returns an array of error messages (empty when valid).

const EMAIL_MIN_LENGTH = 6
const PASSWORD_MIN_LENGTH = 8
const USERNAME_MIN_LENGTH = 3
const USERNAME_MAX_LENGTH = 30
const DISPLAY_NAME_MAX_LENGTH = 50

const isBlank = (value) => typeof value !== 'string' || value.trim() === ''

export function validateEmail(email) {
  const errors = []

  if (isBlank(email)) {
    return ['Email is required']
  }

  const value = email.trim()

  if (value.length < EMAIL_MIN_LENGTH) {
    errors.push(`Email must be at least ${EMAIL_MIN_LENGTH} characters`)
  }
  if (!value.includes('@')) {
    errors.push('Email must include @')
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    errors.push('Email format is invalid')
  }

  return errors
}

export function validatePassword(password) {
  const errors = []

  if (typeof password !== 'string' || password === '') {
    return ['Password is required']
  }

  if (password.length < PASSWORD_MIN_LENGTH) {
    errors.push(`Password must be at least ${PASSWORD_MIN_LENGTH} characters`)
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must include a lowercase letter')
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must include an uppercase letter')
  }
  if (!/[^A-Za-z0-9]/.test(password)) {
    errors.push('Password must include a special character')
  }

  return errors
}

export function validateUsername(username) {
  const errors = []

  if (isBlank(username)) {
    return ['Username is required']
  }

  const value = username.trim()

  if (value.length < USERNAME_MIN_LENGTH || value.length > USERNAME_MAX_LENGTH) {
    errors.push(
      `Username must be between ${USERNAME_MIN_LENGTH} and ${USERNAME_MAX_LENGTH} characters`,
    )
  }
  if (!/^[A-Za-z0-9_.]+$/.test(value)) {
    errors.push('Username can only contain letters, numbers, _ and .')
  }

  return errors
}

export function validateDisplayName(displayName) {
  if (isBlank(displayName)) {
    return ['Display name is required']
  }
  if (displayName.trim().length > DISPLAY_NAME_MAX_LENGTH) {
    return [`Display name must be at most ${DISPLAY_NAME_MAX_LENGTH} characters`]
  }
  return []
}

// avatar_url is optional in the users table, so only check it when present.
export function validateAvatarUrl(avatarUrl) {
  if (avatarUrl == null || avatarUrl === '') {
    return []
  }
  if (typeof avatarUrl !== 'string') {
    return ['Avatar URL must be a string']
  }

  try {
    const url = new URL(avatarUrl)
    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      return ['Avatar URL must start with http:// or https://']
    }
  } catch {
    return ['Avatar URL is invalid']
  }

  return []
}

// Runs each validator against its field and collects failures by field name.
export function collectErrors(checks) {
  const errors = {}
  for (const [field, fieldErrors] of Object.entries(checks)) {
    if (fieldErrors.length) errors[field] = fieldErrors
  }
  return errors
}

import { useEffect, useRef, useState } from 'react'
import './AuthModal.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

// Sign-up fields mirror the users table (back/data/schema.sql);
// the server derives password_hash, id, timestamps and email_verified.
const fields = {
  signin: [
    { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
    { name: 'password', label: 'Password', type: 'password', autoComplete: 'current-password' },
  ],
  signup: [
    { name: 'display_name', label: 'Display name', type: 'text', autoComplete: 'name' },
    {
      name: 'username',
      label: 'Username',
      type: 'text',
      autoComplete: 'username',
      pattern: '[a-zA-Z0-9_]{3,30}',
      title: '3–30 letters, numbers or underscores',
    },
    { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      autoComplete: 'new-password',
      minLength: 8,
    },
    { name: 'avatar_url', label: 'Avatar URL', type: 'url', optional: true },
  ],
}

const copy = {
  signin: {
    title: 'Sign in',
    submit: 'Sign in',
    switchText: 'New here?',
    switchLabel: 'Create an account',
  },
  signup: {
    title: 'Subscribe',
    submit: 'Create account',
    switchText: 'Already have an account?',
    switchLabel: 'Sign in',
  },
}

function AuthModal({ mode, onModeChange, onClose }) {
  const dialogRef = useRef(null)
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  useEffect(() => {
    const dialog = dialogRef.current
    if (mode && !dialog.open) dialog.showModal()
    if (!mode && dialog.open) dialog.close()
  }, [mode])

  function switchMode(next) {
    setError('')
    onModeChange(next)
  }

  function close() {
    setError('')
    onClose()
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const body = Object.fromEntries(new FormData(event.currentTarget))
    if (!body.avatar_url) delete body.avatar_url

    setPending(true)
    setError('')
    try {
      const res = await fetch(`${API_URL}/v1/auth/${mode}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || data.message || 'Something went wrong')
      onClose()
    } catch (err) {
      setError(err.message === 'Failed to fetch' ? 'Could not reach the server' : err.message)
    } finally {
      setPending(false)
    }
  }

  const text = copy[mode] ?? copy.signin

  return (
    <dialog
      ref={dialogRef}
      className="auth-modal"
      aria-labelledby="auth-title"
      onClose={close}
      // Clicking the backdrop lands on the dialog element itself
      onClick={(e) => e.target === e.currentTarget && close()}
    >
      <div className="auth-panel">
        <button type="button" className="auth-close" aria-label="Close" onClick={close}>
          ×
        </button>

        <div className="auth-tabs" role="tablist">
          {['signin', 'signup'].map((key) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={mode === key}
              onClick={() => switchMode(key)}
            >
              {key === 'signin' ? 'Sign in' : 'Sign up'}
            </button>
          ))}
        </div>

        <h2 id="auth-title" className="auth-title">{text.title}</h2>

        {mode && (
          <form key={mode} className="auth-form" onSubmit={handleSubmit}>
            {fields[mode].map(({ name, label, optional, ...input }) => (
              <label key={name}>
                <span className="mono-label">
                  {label}
                  {optional && <em> (optional)</em>}
                </span>
                <input name={name} required={!optional} {...input} />
              </label>
            ))}

            {error && <p className="auth-error" role="alert">{error}</p>}

            <button type="submit" className="subscribe auth-submit" disabled={pending}>
              {pending ? 'Please wait…' : text.submit}
            </button>
          </form>
        )}

        <p className="auth-switch">
          {text.switchText}{' '}
          <button type="button" onClick={() => switchMode(mode === 'signin' ? 'signup' : 'signin')}>
            {text.switchLabel}
          </button>
        </p>
      </div>
    </dialog>
  )
}

export default AuthModal

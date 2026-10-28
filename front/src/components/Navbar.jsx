import { sections } from '../data/stories'
import './Navbar.css'

function Navbar({ onAuth }) {
  return (
    <header className="topnav">
      <a href="/" className="nav-logo">News</a>
      <nav aria-label="Sections">
        <ul>
          {sections.map((s) => (
            <li key={s}>
              <a href={`#${s.toLowerCase()}`}>{s}</a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="nav-actions">
        <button type="button" className="signin" onClick={() => onAuth('signin')}>
          Sign in
        </button>
        <button type="button" className="subscribe" onClick={() => onAuth('signup')}>
          Subscribe
        </button>
        <button type="button" className="menu" aria-label="Menu">
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}

export default Navbar

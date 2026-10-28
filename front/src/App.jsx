import { useState } from 'react'
import {
  sections,
  hero,
  topStories,
  freeToRead,
  stream,
  following,
  mostPopular,
  podcasts,
} from './data/stories'
import './App.css'

function CommentCount({ count }) {
  return (
    <span className="comments">
      <svg viewBox="0 0 16 16" aria-hidden="true">
        <path d="M2 3h12v8H6l-4 3z" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      {count}
    </span>
  )
}

function Byline({ author, date, comments }) {
  return (
    <p className="byline">
      <span className="author">{author}</span>
      {date && <span className="date">{date}</span>}
      {comments != null && <CommentCount count={comments} />}
    </p>
  )
}

function TopNav() {
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
        <a href="#signin" className="signin">Sign in</a>
        <button type="button" className="subscribe">Subscribe</button>
        <button type="button" className="menu" aria-label="Menu">
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <article className="hero-story">
      <img src={hero.image} alt="" />
      <div className="hero-text">
        <h1>{hero.title}</h1>
        <p className="hero-subhead">{hero.subhead}</p>
        <Byline {...hero} />
      </div>
    </article>
  )
}

function NumberedList({ stories, thumbs = false }) {
  return (
    <ol className="numbered-list">
      {stories.map((story, i) => (
        <li key={story.title}>
          <a href="#story">
            <span className="rank">{i + 1}</span>
            <div className="numbered-body">
              <h3>{story.title}</h3>
              <Byline {...story} />
            </div>
            {thumbs && <img src={story.image} alt="" width="60" height="60" />}
          </a>
        </li>
      ))}
    </ol>
  )
}

function FreeToRead() {
  return (
    <section className="free-card">
      <h2 className="section-label">Free to read</h2>
      <p className="mono-label">Refreshes daily at 1pm EDT</p>
      <ul>
        {freeToRead.map((story) => (
          <li key={story.title}>
            <a href="#story">
              <img src={story.image} alt="" width="80" height="80" />
              <div>
                <h3>{story.title}</h3>
                <Byline author={story.author} />
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

function PillToggle({ value, onChange }) {
  const options = [
    ['stream', 'Today’s Stream'],
    ['following', 'Following'],
  ]
  return (
    <div className="pill-toggle" role="tablist">
      {options.map(([key, label]) => (
        <button
          key={key}
          type="button"
          role="tab"
          aria-selected={value === key}
          onClick={() => onChange(key)}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

function ArticleCard({ story }) {
  return (
    <article className="article-card">
      <a href="#story">
        <div>
          <h3>{story.title}</h3>
          <Byline {...story} />
        </div>
        <img src={story.image} alt="" />
      </a>
    </article>
  )
}

function SectionCard({ variant, label, link, stories }) {
  return (
    <section className={`section-card ${variant}`}>
      <header>
        <h2 className="mono-label">{label}</h2>
        {link && <a href="#all" className="mono-label">{link} →</a>}
      </header>
      <NumberedList stories={stories} />
    </section>
  )
}

function App() {
  const [feed, setFeed] = useState('stream')
  const feedStories = feed === 'stream' ? stream : following

  return (
    <>
      <div className="wordmark" aria-hidden="true">News</div>
      <div className="page">
        <TopNav />
        <main>
          <div className="lead">
            <Hero />
            <aside>
              <h2 className="section-label">Top Stories</h2>
              <NumberedList stories={topStories} thumbs />
            </aside>
          </div>

          <FreeToRead />

          <div className="feed">
            <div>
              <PillToggle value={feed} onChange={setFeed} />
              <div className="stream">
                {feedStories.map((story) => (
                  <ArticleCard key={story.title} story={story} />
                ))}
              </div>
            </div>
            <aside className="feed-side">
              <SectionCard variant="popular" label="Most Popular" stories={mostPopular} />
              <SectionCard variant="podcasts" label="Podcasts" link="See all podcasts" stories={podcasts} />
            </aside>
          </div>
        </main>
      </div>
    </>
  )
}

export default App

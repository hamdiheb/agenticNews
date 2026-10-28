import { useState } from 'react'
import {
  hero,
  topStories,
  freeToRead,
  stream,
  following,
  mostPopular,
  podcasts,
} from '../data/stories'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import TopStories from '../components/TopStories'
import FreeToRead from '../components/FreeToRead'
import PillToggle from '../components/PillToggle'
import ArticleCard from '../components/ArticleCard'
import SectionCard from '../components/SectionCard'
import AuthModal from '../components/AuthModal'
import './Home.css'

function Home() {
  const [feed, setFeed] = useState('stream')
  const [authMode, setAuthMode] = useState(null)
  const feedStories = feed === 'stream' ? stream : following

  return (
    <>
      <div className="wordmark" aria-hidden="true">News</div>
      <AuthModal mode={authMode} onModeChange={setAuthMode} onClose={() => setAuthMode(null)} />
      <div className="page">
        <Navbar onAuth={setAuthMode} />
        <main>
          <div className="lead">
            <Hero story={hero} />
            <TopStories stories={topStories} />
          </div>

          <FreeToRead stories={freeToRead} />

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

export default Home

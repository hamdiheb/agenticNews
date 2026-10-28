import Byline from './Byline'
import './FreeToRead.css'

function FreeToRead({ stories }) {
  return (
    <section className="free-card">
      <h2 className="section-label">Free to read</h2>
      <p className="mono-label">Refreshes daily at 1pm EDT</p>
      <ul>
        {stories.map((story) => (
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

export default FreeToRead

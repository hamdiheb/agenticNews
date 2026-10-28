import Byline from './Byline'
import './Hero.css'

function Hero({ story }) {
  return (
    <article className="hero-story">
      <img src={story.image} alt="" />
      <div className="hero-text">
        <h1>{story.title}</h1>
        <p className="hero-subhead">{story.subhead}</p>
        <Byline {...story} />
      </div>
    </article>
  )
}

export default Hero

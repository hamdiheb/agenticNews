import Byline from './Byline'
import './ArticleCard.css'

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

export default ArticleCard

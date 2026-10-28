import Byline from './Byline'
import './NumberedList.css'

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

export default NumberedList

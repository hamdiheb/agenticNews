import './Byline.css'

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

export default Byline

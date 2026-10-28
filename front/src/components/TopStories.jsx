import NumberedList from './NumberedList'

function TopStories({ stories }) {
  return (
    <aside>
      <h2 className="section-label">Top Stories</h2>
      <NumberedList stories={stories} thumbs />
    </aside>
  )
}

export default TopStories

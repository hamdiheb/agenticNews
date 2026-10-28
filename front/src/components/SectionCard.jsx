import NumberedList from './NumberedList'
import './SectionCard.css'

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

export default SectionCard

import './PillToggle.css'

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

export default PillToggle

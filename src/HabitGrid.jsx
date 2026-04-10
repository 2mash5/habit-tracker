function HabitGrid({ recentDates }) {
  const days = []
  for (let i = 89; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const dateStr = date.toISOString().split('T')[0]
    days.push(dateStr)
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px', maxWidth: '200px' }}>
      {days.map(day => (
        <div
          key={day}
          style={{
            width: '14px',
            height: '14px',
            backgroundColor: recentDates.includes(day) ? '#4ade80' : '#e5e7eb',
            borderRadius: '2px',
          }}
        />
      ))}
    </div>
  )
}

export default HabitGrid
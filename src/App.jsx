import { useState } from 'react'
import './App.css'

function App() {
  const [habits, setHabits] = useState([
    { id: 1, name: 'Read 30 minutes', done: false, completedDates: [] },
    { id: 2, name: 'Exercise', done: false, completedDates: [] },
    { id: 3, name: 'Drink water', done: false, completedDates: [] },
  ])
  const [input, setInput] = useState('')

  function addHabit() {
    if (!input.trim()) return
    setHabits([...habits, { id: Date.now(), name: input, done: false, completedDates: [] }])
    setInput('')
  }

function toggleHabit(id) {
  const today = new Date().toISOString().split('T')[0]
  setHabits(habits.map(habit => {
    if (habit.id !== id) return habit
    const alreadyDone = habit.completedDates.includes(today)
    return {
      ...habit,
      done: !habit.done,
      completedDates: alreadyDone
        ? habit.completedDates.filter(d => d !== today)
        : [...habit.completedDates, today]
    }
  }))
}

function calculateStreak(completedDates) {
  let streak = 0
  let date = new Date()
  while (true) {
    const dateStr = date.toISOString().split('T')[0]
    if (completedDates.includes(dateStr)) {
      streak++
      date.setDate(date.getDate() - 1)
    } else {
      break
    }
  }
  return streak
}

  return (
    <div>
      <h1>Habit Tracker</h1>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Add a new habit..."
      />
      <button onClick={addHabit}>Add</button>
      <ul>
        {habits.map(habit => (
          <li key={habit.id}>
            <input
              type="checkbox"
              checked={habit.done}
              onChange={() => toggleHabit(habit.id)}
            />
            <span className={habit.done ? 'done' : ''}>{habit.name}</span>
            <span>🔥 {calculateStreak(habit.completedDates)}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
import { useState } from 'react'
import './App.css'

function App() {
  const [habits, setHabits] = useState([
    { id: 1, name: 'Read 30 minutes', done: false, currentStreak: 0, longestStreak: 0, lastCompletedDate: null, recentDates: [] },
    { id: 2, name: 'Exercise', done: false, currentStreak: 0, longestStreak: 0, lastCompletedDate: null, recentDates: [] },
    { id: 3, name: 'Drink water', done: false, currentStreak: 0, longestStreak: 0, lastCompletedDate: null, recentDates: [] },
  ])
  const [input, setInput] = useState('')

  function addHabit() {
    if (!input.trim()) return
    setHabits([...habits, { id: Date.now(), name: input, done: false, currentStreak: 0, longestStreak: 0, lastCompletedDate: null, recentDates: [] }])
    setInput('')
  }

  function toggleHabit(id) {
    const today = new Date().toISOString().split('T')[0]
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]

    setHabits(habits.map(habit => {
      if (habit.id !== id) return habit

      const alreadyDone = habit.recentDates.includes(today)

      let newDates = alreadyDone
        ? habit.recentDates.filter(d => d !== today)
        : [...habit.recentDates, today].slice(-90)

      let newStreak = alreadyDone
        ? habit.currentStreak - 1
        : habit.lastCompletedDate === yesterday
          ? habit.currentStreak + 1
          : 1

      newStreak = Math.max(0, newStreak)

      const newLongest = Math.max(habit.longestStreak, newStreak)

      return {
        ...habit,
        done: !habit.done,
        recentDates: newDates,
        currentStreak: newStreak,
        longestStreak: newLongest,
        lastCompletedDate: alreadyDone ? null : today,
      }
    }))
  }

  function deleteHabit(id) {
    if (window.confirm('Delete this habit?')) {
      setHabits(habits.filter(habit => habit.id !== id))
    }
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
            <span>🔥 {habit.currentStreak}</span>
            <button onClick={() => deleteHabit(habit.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
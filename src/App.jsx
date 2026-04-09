import { useState } from 'react'
import './App.css'

function App() {
  const [habits, setHabits] = useState([
    { id: 1, name: 'Read 30 minutes', done: false },
    { id: 2, name: 'Exercise', done: false },
    { id: 3, name: 'Drink water', done: false },
  ])
  const [input, setInput] = useState('')

  function addHabit() {
    if (!input.trim()) return
    setHabits([...habits, { id: Date.now(), name: input, done: false }])
    setInput('')
  }

  function toggleHabit(id) {
    setHabits(habits.map(habit =>
      habit.id === id ? { ...habit, done: !habit.done } : habit
    ))
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
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
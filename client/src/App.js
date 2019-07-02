import React, { useState, useReducer } from 'react'
import './App.css'

function App() {
  const initialState = {
    players: [],
    currentPlayerOne: '',
    currentPlayerTwo: ''
  }

  const playerReducer = (state, action) => {
    switch (action.type) {
      default:
        return {...state}
    }
  }

  const [createPlayerInput, setCreatePlayerInput] = useState('')
  const [state, dispatch] = useReducer(playerReducer, initialState)
  
  return (
    <div className="app">
      <header className="app__header">Pool Scoreboard</header>
      <main>
        <section className="create-player__section">
          <form>
            <label htmlFor="create-player__input">Create a player</label>
            <input
              type="text"
              name="create-player__input"
              value={createPlayerInput}
              onChange={e => setCreatePlayerInput(e.target.value)}
            />
            <input type="submit" value="Submit" />
          </form>
        </section>
        <section className="player-select__section">
          <select><option>Player 1</option></select>
          <select><option>Player 2</option></select>
        </section>
      </main>
    </div>

  )
}

export default App

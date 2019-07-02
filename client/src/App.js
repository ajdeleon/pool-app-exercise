import React from 'react'
import './App.css'

import usePlayerApi from './hooks/usePlayerApi'
import CreatePlayerInput from './components/CreatePlayerInput'
import PlayerSelectContainer from './components/PlayerSelectContainer'

function App() {
  const [{ players, isLoading, isError }, updateData] = usePlayerApi()

  return (
    <div className="app">
      <header className="app__header">Pool Scoreboard</header>
      <main>
        <section className="create-player__section">
          <CreatePlayerInput players={players} handleUpdate={updateData} />
        </section>
        <section className="player-select__section">
          <PlayerSelectContainer players={players} />
        </section>
        <section>
          <h3>Leaderboard</h3>
          {
            isError ? 'There was an error loading the data. Please try to refresh the page.' : (
              <ul className="leaderboard__list">
                {isLoading ? '...loading' : players.map(player => <li key={player.name}>{player.name} - {player.wins}</li>)}
              </ul>
            )
          }
        </section>
      </main>
    </div>

  )
}

export default App

import React from 'react'
import './App.css'

import usePlayerApi from './hooks/usePlayerApi'
import CreatePlayerInput from './components/CreatePlayerInput'
import PlayerSelectContainer from './components/PlayerSelectContainer'
import Leaderboard from './components/Leaderboard'

function App() {
  const [{ players, isLoading, isError }, updateData] = usePlayerApi()

  return (
    <div className="app">
      <header className="app__header">
        <h2>Pool Scoreboard</h2>
      </header>
      <main>
        <CreatePlayerInput players={players} handleUpdate={updateData} />
        <PlayerSelectContainer players={players} handleUpdate={updateData}  />
        <Leaderboard players={players} isLoading={isLoading} isError={isError} handleUpdate={updateData} />
      </main>
    </div>

  )
}

export default App

import React, { useState } from 'react'
import api from '../api'

const Leaderboard = (props) => {
  const [adminOpen, setAdminOpen] = useState(false)
  const { players, isLoading, isError, handleUpdate } = props

  const deletePlayer = async (player) => {
    try {
      await api.delete('/player', {  data: { "name": player } })
    } catch (err) {
      console.log(err)
    }

    handleUpdate(player)
  }

  const deleteAllPlayers = async () => {
    let res
    if (players.length === 0) return alert('No players to delete')

    try {
      res = await api.delete('/players')
    } catch (err) {
      console.log(err)
    }

    handleUpdate(res)
  }

  const renderLeaderboardList = (player) => (
    adminOpen
    ? (
      <li key={player.name}>{player.name} - {player.wins} <button className="leaderboard__list-item--delete" onClick={() => deletePlayer(player.name)}>X</button> </li>
    )
    : <li key={player.name}>{player.name} - {player.wins}</li>
  )


  return (
    <>
      <section className="leaderboard__section">
        <h3>Leaderboard</h3>
        {
          isError ? 'There was an error loading the data. Please try to refresh the page.' : (
            <ul className="leaderboard__list">
              {isLoading ? '...loading' :
                  players
                  .sort((a, b) => b.wins - a.wins)
                  .map(player => renderLeaderboardList(player))
              }
            </ul>
          )
        }
        {adminOpen && <button className="button--red" onClick={() => deleteAllPlayers()}>Delete All Players</button>}
      </section>
      <section>
        <button className="admin__button button--blue" onClick={() => setAdminOpen(!adminOpen)}>{adminOpen ? 'Close Admin' : 'Admin Panel'}</button>
      </section>
    </>
  )
}

export default Leaderboard


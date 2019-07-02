import React, { useState } from 'react'
import axios from 'axios'

const PlayerSelectContainer = (props) => {
  const [ currentPlayerOne, setCurrentPlayerOne ] = useState('')
  const [ currentPlayerTwo, setCurrentPlayerTwo ] = useState('')

  const incrementPlayerScore = async player => {
    if (!currentPlayerOne || !currentPlayerTwo) {
      alert('Please select two players')
      return
    }

    await axios.patch('http://localhost:4000/player', { "name": player })
    
    props.handleUpdate(player)
    setCurrentPlayerOne('')
    setCurrentPlayerTwo('')
  }

  return (
    <>
    <div>
      <select
        onChange={e => setCurrentPlayerOne(e.target.value)}
        value={currentPlayerOne || 'player_one'}
      >
        <option disabled value="player_one">
          Player 1
        </option>
        {props.players
          .filter(player => player.name !== currentPlayerTwo)
          .map(player => {
            return (
              <option value={player.name} key={player.name}>
                {player.name}
              </option>
            )
          })}
      </select>
      <button onClick={() => incrementPlayerScore(currentPlayerOne)}>Player 1 wins!</button>
    </div>
    <div>
      <select
        onChange={e => setCurrentPlayerTwo(e.target.value)}
        value={currentPlayerTwo || 'player_two'}
      >
        <option disabled value="player_two">
          Player 2
        </option>
        {props.players
          .filter(player => player.name !== currentPlayerOne)
          .map(player => {
            return (
              <option value={player.name} key={player.name}>
                {player.name}
              </option>
            )
          })}
      </select>
      <button onClick={() => incrementPlayerScore(currentPlayerTwo)}>Player 2 wins!</button>
    </div>
    </>
  )
}

export default PlayerSelectContainer

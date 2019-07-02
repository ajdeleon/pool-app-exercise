import React, { useState } from 'react'

const PlayerSelectContainer = (props) => {
  const [ currentPlayerOne, setCurrentPlayerOne ] = useState('')
  const [ currentPlayerTwo, setCurrentPlayerTwo ] = useState('')

  return (
    <>
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
    </>
  )
}

export default PlayerSelectContainer

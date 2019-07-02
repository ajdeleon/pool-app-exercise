import React from 'react'

const PlayerSelect = (props) => {
  return (
      <select
        onChange={e => props.updatePlayer()}
        value={props.currentPlayerOne || 'player_one'}
      >
        <option disabled value="player_one">
          Player 1
        </option>
        {props.players
          .filter(player => player.name !== props.currentPlayerTwo)
          .map(player => {
            return (
              <option value={player.name} key={player.name}>
                {player.name}
              </option>
            )
          })}
      </select>
  )
}

export default PlayerSelect

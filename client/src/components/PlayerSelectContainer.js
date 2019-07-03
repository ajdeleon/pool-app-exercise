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
    try {
      await axios.patch('http://localhost:4000/player', { "name": player })
    } catch (err) {
      console.error(err.message)
    }
    
    props.handleUpdate(player)
    setCurrentPlayerOne('')
    setCurrentPlayerTwo('')
  }

  return (
    <section className="player-select__section">
      <div className="player-select__div">
        <select
          className="player__select"
          onChange={e => setCurrentPlayerOne(e.target.value)}
          value={currentPlayerOne || 'player_one'}
          tabIndex="2"
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
        <button className="button--green" tabIndex="3" onClick={() => incrementPlayerScore(currentPlayerOne)}>Player 1 wins!</button>
      </div>
      <div className="player-select__div">
        <select
          className="player__select"
          onChange={e => setCurrentPlayerTwo(e.target.value)}
          value={currentPlayerTwo || 'player_two'}
          tabIndex="2"
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
        <button className="button--green" tabIndex="3" onClick={() => incrementPlayerScore(currentPlayerTwo)}>Player 2 wins!</button>
      </div>
    </section>
  )
}

export default PlayerSelectContainer

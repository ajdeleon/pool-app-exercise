import React, { useState } from 'react'
import axios from 'axios'

const CreatePlayerInput = (props) => {
  const [createPlayerInput, setCreatePlayerInput] = useState('')

  const createPlayer = (e) => {
    // return early if duplicate so player.name can be used as a unique key
    if (props.players.map(p => p.name).includes(createPlayerInput)) {
      alert('Player already exists, please choose another name')
      e.preventDefault()
      return
    }

    axios.post('http://localhost:4000/player', {
      "name": createPlayerInput
    })
    e.preventDefault()
    
    setCreatePlayerInput('')
    props.handleUpdate(createPlayerInput)
  }
  
  return (

    <form onSubmit={(e) => createPlayer(e)}>
      <label htmlFor="create-player__input">Create a player</label>
      <input
        type="text"
        name="create-player__input"
        value={createPlayerInput}
        onChange={e => setCreatePlayerInput(e.target.value)}
      />
      <input type="submit" value="Submit" />
    </form>
  )
}


export default CreatePlayerInput

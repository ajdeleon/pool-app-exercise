import React, { useState } from 'react'
import axios from 'axios'

const CreatePlayerInput = (props) => {
  const [createPlayerInput, setCreatePlayerInput] = useState('')

  const createPlayer = async e => {
    // return early if duplicate so player.name can be used as a unique key
    if (props.players.map(p => p.name).includes(createPlayerInput)) {
      alert('Player already exists, please choose another name')
      e.preventDefault()
      return
    }

    e.preventDefault()

    try {
      await axios.post('http://localhost:4000/player', {
        "name": createPlayerInput
      })
    } catch (err) {
      console.log(err.message)
    }

    props.handleUpdate(createPlayerInput)
    
    setCreatePlayerInput('')
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

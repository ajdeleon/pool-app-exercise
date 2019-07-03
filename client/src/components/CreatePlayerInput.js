import React, { useState } from 'react'
import axios from 'axios'

const CreatePlayerInput = (props) => {
  const [createPlayerInput, setCreatePlayerInput] = useState('')

  const createPlayer = async e => {
    // return early if duplicate so player.name can be used as a unique key
    if (props.players.map(p => p.name).includes(createPlayerInput)) {
      alert('Player already exists, please choose another name.')
      e.preventDefault()
      return
    }

    if (!createPlayerInput) {
      alert('Please enter a name.')
      e.preventDefault()
      return
    }

    e.preventDefault()

    try {
      await axios.post('http://localhost:4000/player', {
        "name": createPlayerInput.toUpperCase()
      })
    } catch (err) {
      console.log(err.message)
    }

    props.handleUpdate(createPlayerInput)
    
    setCreatePlayerInput('')
  }
  
  return (
    <section className="create-player__section">
      <form 
        className="create-player__form"
        onSubmit={(e) => createPlayer(e)}
      >
        <label htmlFor="create-player__input">Create a player</label>
        <input
          className="create-player__input--text"
          tabIndex="1"
          type="text"
          name="create-player__input"
          value={createPlayerInput}
          onChange={e => setCreatePlayerInput(e.target.value)}
        />
        <input className="button--blue" tabIndex="1" type="submit" value="Submit" />
      </form>
    </section>
  )
}


export default CreatePlayerInput

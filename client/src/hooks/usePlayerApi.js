import { useState, useEffect, useReducer } from 'react'
import axios from 'axios'

import { FETCH_INIT, FETCH_SUCCESS, FETCH_FAILURE } from './types'

const playerReducer = (state, action) => {
  switch (action.type) {
    case FETCH_INIT:
      return { ...state, isLoading: true, isError: false }
    case FETCH_SUCCESS:
      return { ...state, isLoading: false, isError: false, players: action.payload }
    case FETCH_FAILURE:
      return { ...state, isLoading: false, isError: true }
    default:
      throw new Error()
  }
}

const usePlayerApi = () => {
  const [updater, setUpdater] = useState('')
  const initialState = {
    players: [],
    isLoading: false,
    isError: false
  }

  const [state, dispatch] = useReducer(playerReducer, initialState)

  useEffect(() => {
    let didNotMount = false

    const fetchData = async () => {
      dispatch({ type: FETCH_INIT })


      try {
        const res = await axios.get('http://localhost:4000/players')

        if (!didNotMount) {
          dispatch({ type: FETCH_SUCCESS, payload: res.data })
        }

      } catch (err) {
        if (!didNotMount) {
          dispatch({ type: FETCH_FAILURE })
        }
      }
    }

    fetchData()

    return () => {
      didNotMount = true
    }
  }, [updater])

  return [state, setUpdater]
}

export default usePlayerApi

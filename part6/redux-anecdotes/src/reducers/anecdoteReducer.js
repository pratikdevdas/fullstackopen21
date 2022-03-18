import { createSlice } from "@reduxjs/toolkit"
import backendService from "../services/backend"

const anecdoteSlice = createSlice({
  name:'anecdote',
  initialState:[],
  reducers: {
    increaseVote(state, action){
      const id = action.payload
      const anecdoteToVote = state.find(n => n.id === id)
      console.log(anecdoteToVote)
      const changedAnecdote = {
        ...anecdoteToVote,
        votes : anecdoteToVote.votes + 1
      }
      console.log(changedAnecdote)

      return state.map(anecdote => 
        anecdote.id !== id ? anecdote : changedAnecdote )
    },
    appendAnecdote(state,action){
      state.push(action.payload)
    },
    setAnecdotes(state, action){
      return action.payload
    }
  }
})

export const { increaseVote, appendAnecdote, setNotes, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdote =  () => {
  return async dispatch => {
    const anecdotes = await backendService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    // we need to extract to a varialble since we dont have the action creater above
    const newAnecdote = await backendService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const updateVote = (id,place) => {
  return async dispatch => {
    // we dont need to extract to a varialble since we have the action creater above
     await backendService.update(id,place)
    dispatch(increaseVote(id))
  }
}

export default anecdoteSlice.reducer
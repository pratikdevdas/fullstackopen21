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

export const { increaseVote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdote =  () => {
  return async dispatch => {
    const anecdotes = await backendService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await backendService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}


export default anecdoteSlice.reducer
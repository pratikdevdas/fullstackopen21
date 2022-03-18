import { createSlice } from "@reduxjs/toolkit"
import backendService from "../services/backend"



const anecdoteSlice = createSlice({
  name:'anecdote',
  initialState:[],
  reducers: {
    createAnecdote(state,action){
      const content = action.payload
      state.push(content)
    },
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
    const newNote = await backendService.createNew(content)
    dispatch(appendAnecdote(newNote))
  }
}

export default anecdoteSlice.reducer
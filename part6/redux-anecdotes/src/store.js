import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
import backendService from './services/backend'
import anecdoteReducer,{ appendAnecdote} from './reducers/anecdoteReducer'

const store = configureStore({
    reducer: {
      anecdotes: anecdoteReducer,
      notification: notificationReducer ,
      filter: filterReducer
    }
  })

  backendService.getAll().then(anecdotes => 
    anecdotes.forEach(anecdote => {
      store.dispatch(appendAnecdote(anecdote))
    })
  )
  export default store
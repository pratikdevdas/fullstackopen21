import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
import anecdoteReducer from './reducers/anecdoteReducer'

const store = configureStore({
    reducer: {
      anecdotes: anecdoteReducer,
      notification: notificationReducer ,
      filter: filterReducer
    }
  })

  export default store
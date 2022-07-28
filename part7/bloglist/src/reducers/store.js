import { combineReducers, configureStore } from '@reduxjs/toolkit'
// import blogService from '../services/blogs'
import storage from 'redux-persist/lib/storage'
import notificationReducer from './notificationReducer'
import blogReducer from './blogReducer'
import userReducer from './userReducer'
import thunk from 'redux-thunk'
import { persistReducer } from 'redux-persist'

const reducers = combineReducers({
  notification: notificationReducer,
  blog: blogReducer,
  user: userReducer,
})

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
  reducer: persistedReducer,
  devTools: 'production',
  middleware: [thunk],
})

export default store

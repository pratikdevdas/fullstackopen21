import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Users from './components/Users'
import SingleUser from './components/SingleUser.js'
import SingleBlog from './components/SingleBlog.js'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './reducers/store'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

// routing and redux persist moved to index.js
let persistor = persistStore(store)

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<SingleUser />} />
          <Route path="/blogs/:id" element={<SingleBlog />} />
          <Route path="/" element={<App />} />
        </Routes>
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)

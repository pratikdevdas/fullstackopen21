import React from "react"
import ReactDOM from "react-dom";
import App from "./App";
import axios from 'axios'

axios.get('http://localhost:3001/persons').then(response => {
  const persons = response.data
  ReactDOM.render(
    <App persons={persons} />,
    document.getElementById('root')
  )
})
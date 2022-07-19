import React from 'react'
import { useSelector } from 'react-redux'
const Notification = () => {
  const notification = useSelector((state) => state.notification)
  const value = notification.map((n) => n.message).reverse()[0]
  return <div>{value}</div>
}

export default Notification

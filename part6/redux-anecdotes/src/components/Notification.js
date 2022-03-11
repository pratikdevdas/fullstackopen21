import { useSelector } from 'react-redux'

const Notification = () => {
  
const notification = useSelector(state => state.notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  const value = notification.map(n => n.message).reverse()[0]
  console.log(value)
  
  return (
    <div style={style}>
     {value} 
    </div>
  )
}

export default Notification
import { connect } from 'react-redux'

const Notification = (props) => {
  
const notification = props.notification
console.log(notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  
  // to show last element of the array
  const value = notification.map(n => n.message).reverse()[0]
  
  return (
    <div style={style}>
     {value} 
    </div>
  )
}

const mapStateToProps = state => {
  return{
    notification: state.notification
  }
}

const ConnectedAnecdote = connect(mapStateToProps)(Notification)
export default ConnectedAnecdote
import { connect } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification, unSetNotification } from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {

    const addAnecdote = async(event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.createAnecdote(anecdote)
        props.setNotification(`${anecdote} is added`)
        setTimeout(() => {
            props.unSetNotification()
        }, 3000);
      }

      return(<>
           <h2>create new</h2>
       <form onSubmit={addAnecdote}>
          <div><input name='anecdote' />
           <button type='submit' >create</button>
          </div>
      </form>
      </>)
}

export default connect(
    null,
    { createAnecdote, setNotification, unSetNotification}
)(AnecdoteForm)
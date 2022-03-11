import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification, unSetNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {

    const dispatch = useDispatch()
    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        console.log(content)
        dispatch(createAnecdote(content))
        dispatch(setNotification(`${content} is added`))
        setTimeout(() => {
            dispatch(unSetNotification())
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

export default AnecdoteForm
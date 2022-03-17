import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification, unSetNotification } from "../reducers/notificationReducer";
import backendService from "../services/backend";

const AnecdoteForm = () => {

    const dispatch = useDispatch()
    const addAnecdote = async(event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
        console.log(anecdote) 
        const newAnecdote = await backendService.createNew(anecdote)
        dispatch(createAnecdote(newAnecdote))
        dispatch(setNotification(`${anecdote} is added`))
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
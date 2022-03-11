import { useSelector, useDispatch } from 'react-redux'
import { voteIncrease } from "../reducers/anecdoteReducer";
import { setNotification, unSetNotification } from '../reducers/notificationReducer';

 const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()
   
    const vote = (id,content) => {
      dispatch(voteIncrease(id))
      dispatch(setNotification(`${content} is voted`))
      setTimeout(() => {
        dispatch(unSetNotification())
    }, 3000);
    }
    const sortedAnecdotes = anecdotes.sort((a,b)=>b.votes - a.votes)

  return (
    <div>
         <h2>Anecdotes</h2>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id,anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </div>  
  )
}

export default AnecdoteList

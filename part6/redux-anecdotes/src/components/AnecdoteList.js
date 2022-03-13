import { useSelector, useDispatch } from 'react-redux'
import { increaseVote } from "../reducers/anecdoteReducer";
import { setNotification, unSetNotification } from '../reducers/notificationReducer';

 const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filtering = useSelector(state => state.filter.map(n=>n.filter))

    const dispatch = useDispatch()
   
    const vote = (id,content) => {
      dispatch(increaseVote(id))
      dispatch(setNotification(`${content} is voted`))
      setTimeout(() => {
        dispatch(unSetNotification())
    }, 3000);
    }

    // https://stackoverflow.com/questions/4317456/getting-the-last-item-in-a-javascript-object
    const filter = filtering[Object.keys(filtering)[Object.keys(filtering).length - 1]]
    
    console.log(filter)
    
    const filteredAnecdotes = anecdotes.filter(a=> a.content.toLowerCase().includes(filter.toLowerCase()))
    console.log(filteredAnecdotes)
    const sortedAnecdotes = filteredAnecdotes.sort((a,b)=>b.votes - a.votes)
   
  return (
    <div>
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

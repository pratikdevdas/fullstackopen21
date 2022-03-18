import { useSelector, useDispatch } from 'react-redux'
import { increaseVote } from "../reducers/anecdoteReducer";
import { setNotification, unSetNotification } from '../reducers/notificationReducer';
import backendService from "../services/backend"


 const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filtering = useSelector(state => state.filter.map(n=>n.filter))

    const dispatch = useDispatch()
   
    const vote = async(anecdote) => {
      const updatedAnecdote = await backendService.update(anecdote.id, { ...anecdote, votes: anecdote.votes + 1 })
      dispatch(increaseVote(updatedAnecdote.id))
      dispatch(setNotification(`${anecdote.content} is voted`))
      setTimeout(() => {
        dispatch(unSetNotification())
    }, 3000);
    }

    // https://stackoverflow.com/questions/4317456/getting-the-last-item-in-a-javascript-object
    const filter = filtering[Object.keys(filtering)[Object.keys(filtering).length - 1]]
    
    console.log(anecdotes)
    
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
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>  
  )
}

export default AnecdoteList

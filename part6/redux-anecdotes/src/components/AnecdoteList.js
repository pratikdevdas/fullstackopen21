import { useSelector, useDispatch } from 'react-redux'
import { updateVote } from "../reducers/anecdoteReducer";
import { manageNotification } from '../reducers/notificationReducer';

 const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filtering = useSelector(state => state.filter.map(n=>n.filter))

    const dispatch = useDispatch()
   
    const vote = async(anecdote) => {
      dispatch(updateVote(anecdote.id, {...anecdote, votes: anecdote.votes + 1 }))
      dispatch(manageNotification(`${anecdote.content}`,3))
    }

    // https://stackoverflow.com/questions/4317456/getting-the-last-item-in-a-javascript-object
    const filter = filtering[Object.keys(filtering)[Object.keys(filtering).length - 1]]
    
    
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

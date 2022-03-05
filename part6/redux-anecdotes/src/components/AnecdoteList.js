import { useSelector, useDispatch } from 'react-redux'
import { voteIncrease } from "../reducers/anecdoteReducer";

 const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()
   
    const vote = (id) => {
      dispatch(voteIncrease(id))
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
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>  
  )
}

export default AnecdoteList

import { useSelector, useDispatch } from 'react-redux'
import { voteIncrease, createAnecdote } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()
 
  const vote = (id) => {
    dispatch(voteIncrease(id))
  }

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log(content)
    dispatch(createAnecdote(content))
  }

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#description
  // https://github.com/pratikdevdas/fullstackopen21/blob/27b4768b86643d66d8459a9d071fc66d617ae8f1/part5/bloglist-frontend/src/App.js#L156

  const sortedAnecdotes = anecdotes.sort((a,b)=>b.votes - a.votes)
  console.log(anecdotes)
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
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App
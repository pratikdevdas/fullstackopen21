import {useQuery} from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import { useState } from 'react'
import Books from './Books'

const BookContainer = (props) => {

  const result = useQuery(ALL_BOOKS)
  const [genre,setGenre] = useState(null)  
  if (!props.show) {
    return null
  }

  const books = result?.data?.allBooks
  let array = []
  books.forEach(element =>  array = element.genres.concat(array));
  const uniq = [...new Set(array)]

  return (
    <div>
      <h2>books</h2>
      {genre && <>in genre {genre}</>}
          <Books books={books} genre={genre} />
          {uniq?.map((a)=><button onClick={()=>setGenre(a)}>{a}</button>)}
    </div>
  )
}

export default BookContainer

import {useQuery} from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import { useState } from 'react'

const Books = (props) => {

  const result = useQuery(ALL_BOOKS)
  const [genre,setGenre] = useState(null)  
  if (!props.show) {
    return null
  }

  const books = result?.data?.allBooks
  let array = []
  books.forEach(element =>  array = element.genres.concat(array));
  const uniq = [...new Set(array)]
  const filteredValue =  genre ? books.filter((a)=> a.genres.includes(genre)) : books

  return (
    <div>
      <h2>books</h2>
      {genre && <>in genre {genre}</>}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredValue?.map((a) => (
            <tr key={a._id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
          {uniq?.map((a)=><button onClick={()=>setGenre(a)}>{a}</button>)}
    </div>
  )
}

export default Books

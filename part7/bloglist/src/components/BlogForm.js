import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBlogs } from '../reducers/blogReducer'
// import PropTypes from 'prop-types'

const BlogForm = ({ blogAdder }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const dispatch = useDispatch()

  const handleTitle = (event) => {
    event.preventDefault()
    setNewTitle(event.target.value)
  }

  const handleAuthor = (event) => {
    event.preventDefault()
    setNewAuthor(event.target.value)
  }

  const handleUrl = (event) => {
    event.preventDefault()
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0,
    }
    blogAdder(blog)
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
    dispatch(addBlogs(blog))
  }

  return (
    <div className="formDiv">
      <div>
        <form onSubmit={addBlog}>
          <div>
            Title:{' '}
            <input
              value={newTitle}
              onChange={handleTitle}
              placeholder="firsttitle"
            />
          </div>
          <div>
            author:{' '}
            <input
              value={newAuthor}
              onChange={handleAuthor}
              className="author"
            />
          </div>
          <div>
            url: <input value={newUrl} onChange={handleUrl} />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      </div>
    </div>
  )
}

// BlogForm.propTypes = {
//   handleTitle: PropTypes.func.isRequired,
// }
export default BlogForm

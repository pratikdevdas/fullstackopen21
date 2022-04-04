import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ blogAdder, message }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

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
    blogAdder({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0,
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div className="formDiv">
      <div>
        <div className="msg">{message}</div>
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

BlogForm.propTypes = {
  handleTitle: PropTypes.func.isRequired,
}
export default BlogForm

import React from 'react'
import PropTypes from 'prop-types'
const BlogForm = ({
  message,
  blogAdder,
  newTitle,
  handleTitle,
  newAuthor,
  handleAuthor,
  handleUrl,
  newUrl
}) => {
  return (
    <div>

      <div>
        <div className='msg'>{message}</div>
        <form onSubmit={blogAdder}>
          <div>
        Title: <input value={newTitle} onChange={handleTitle}/>
          </div>
          <div>
        author: <input value={newAuthor} onChange={handleAuthor}/>
          </div>
          <div>
        url: <input value={newUrl} onChange={handleUrl}/>
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      </div>
    </div>
  )
}

BlogForm.propTypes={
  handleTitle: PropTypes.func.isRequired
}
export default BlogForm
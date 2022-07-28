import React from 'react'

// import PropTypes from 'prop-types'
const BlogForm = ({
  addBlog,
  newAuthor,
  newUrl,
  newTitle,
  handleAuthor,
  handleTitle,
  handleUrl,
}) => {
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

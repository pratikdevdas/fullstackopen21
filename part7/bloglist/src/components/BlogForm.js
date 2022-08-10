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
        <form onSubmit={addBlog} className="form-control">
          <div className="my-2">
            <span className="label-text">Title of the Blog :</span>
            <input
              value={newTitle}
              onChange={handleTitle}
              className="input input-bordered px-3 mx-3 w-64 h-7"
              placeholder="Title"
            />
          </div>
          <div className="my-2">
            <span className="label-text">Author : </span>

            <input
              value={newAuthor}
              onChange={handleAuthor}
              placeholder="Author"
              className="input input-bordered px-3 mx-3 w-64 h-7"
            />
          </div>
          <div className="my-2">
            <span className="label-text">Url : </span>

            <input
              value={newUrl}
              onChange={handleUrl}
              placeholder="URL"
              className="input input-bordered px-3 mx-3 w-64 h-7"
            />
          </div>
          <div>
            <button type="submit" className="btn">
              add
            </button>
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

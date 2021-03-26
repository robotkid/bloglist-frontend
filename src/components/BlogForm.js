import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState(0)

  const addBlog = async (event) => {
    event.preventDefault()

    createBlog({
      author,
      title,
      url,
      likes
    })

    setAuthor('')
    setTitle('')
    setUrl('')
    setLikes(0)
  }

  return (
    <div className="formDiv">
      <h2>Add a blog</h2>
      <form onSubmit={addBlog}>
        <div>
          author:
          <input
            type='text'
            value={author}
            name='Author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          title:
          <input
            type='text'
            value={title}
            name='Title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type='url'
            value={url}
            name='Url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        {/* <div>
          likes:
          <input
            type='number'
            value={likes}
            name='author'
            onChange={({ target }) => setLikes(target.value)}
          />
        </div> */}
        <div><button type='submit'>Save</button></div>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
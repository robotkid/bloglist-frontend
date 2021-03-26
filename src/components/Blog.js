import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogDetails = ({ blog, deleteHandler, likeHandler, user }) => (
  <div>
    <p>{blog.url}</p>
    <p>likes {blog.likes} <button onClick={() => likeHandler(blog)}>like</button></p>
    <p>{blog.user.name}</p>
    {blog.user.name === user.name &&
      <button onClick={() => deleteHandler(blog)}>
        delete
      </button>
    }
  </div>
)

BlogDetails.propTypes = {
  blog: PropTypes.object.isRequired,
  deleteHandler: PropTypes.func.isRequired,
  likeHandler: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

const Blog = ({ blog, deleteHandler, likeHandler, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [show, setShow] = useState(false)

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={() => setShow(!show)}>
        {show ? 'hide' : 'view'}
      </button>
      {show && <BlogDetails blog={blog} deleteHandler={deleteHandler} likeHandler={likeHandler} user={user} />}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  deleteHandler: PropTypes.func.isRequired,
  likeHandler: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog
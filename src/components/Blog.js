import React, { useState } from 'react'

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

export default Blog
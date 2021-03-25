import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const BlogForm = props => {
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState(0)


  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      author,
      title,
      url,
      likes
    }
    setAuthor('')
    setTitle('')
    setUrl('')
    setLikes(0)

    props.callback(blogObject)
  }

  return (
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
      <div>title: <input type='text' value={title} name='title' onChange={({target}) => setTitle(target.value)} /></div>
      <div>url: <input type='url' value={url} name='url' onChange={({target}) => setUrl(target.value)} /></div>
      <div>likes: <input type='number' value={likes} name='author' onChange={({target}) => setLikes(target.value)} /></div>
      <div><button type='submit'>Add new blog</button></div>
    </form>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const loggedInUser = JSON.parse(loggedInUserJSON)
      setUser(loggedInUser)
      blogService.setToken(loggedInUser.token)
    }
  }, [])

  const addBlog = async newBlog => {
    const returnedBlog = await blogService.create(newBlog)
    setBlogs(blogs.concat(returnedBlog))
    setSuccessMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const userResponse = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(userResponse)
      )
      setUser(userResponse)
      setSuccessMessage(`Logged in successfully as ${userResponse.name}`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  if (user === null) {
    return (
      <div>
        {errorMessage && <Notification message={errorMessage} className='error' />}
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  return (
    <div>
      { errorMessage && <Notification message={errorMessage} className='error' /> }
      { successMessage && <Notification message={successMessage} className='success' />}

      <h2>blogs</h2>
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <BlogForm callback={addBlog} />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
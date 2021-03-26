import React, { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setSortedBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const setBlogs = (newBlogs) => {
    newBlogs.sort((a,b) => b.likes - a.likes)
    setSortedBlogs(newBlogs)
  }

  useEffect(() => {
    (async () => {
      const returnedBlogs = await blogService.getAll()
      setBlogs(returnedBlogs)
    })()
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

  const handleLogin = async (username, password) => {
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
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  const handleDelete = async blog => {
    try {
      if (!window.confirm(`Are you sure you want to delete ${blog.title} by ${blog.author}?`)) {
        return
      }
      await blogService.deleteBlog(blog.id)
      setBlogs(blogs.filter(b => b !== blog))
      setSuccessMessage('Blog deleted')
      setTimeout(() => {
        setSuccessMessage('')
      }, 5000)
    } catch (err) {
      console.error(err)
      setErrorMessage(err)
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    }
  }

  const handleLike = async blog => {
    const updatedBlog = { ...blog }
    updatedBlog.likes++
    const returnedBlog = await blogService.updateBlog(updatedBlog)
    const updatedBlogs = [...blogs]
    updatedBlogs[blogs.indexOf(blog)] = returnedBlog
    setBlogs(updatedBlogs)
  }

  return (
    <div>
      { errorMessage && <Notification message={errorMessage} className='error' />}
      { successMessage && <Notification message={successMessage} className='success' />}
      { user === null
        ? <LoginForm handleLogin={handleLogin} />
        : (<div>
          <h2>blogs</h2>
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
          <Togglable buttonLabel="new blog">
            <BlogForm createBlog={addBlog} />
          </Togglable>
          <BlogList blogs={blogs} deleteHandler={handleDelete} likeHandler={handleLike} user={user} />
        </div>
        )
      }
    </div>
  )
}

export default App
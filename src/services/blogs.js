import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token }
  }
  try {
    const response = await axios.post(baseUrl, newBlog, config)
    return response.data
  } catch (exception) {
    console.log(exception);
  }
}

const setToken = newToken => {
  token = `bearer ${newToken}`
}

export default { getAll, setToken, create }
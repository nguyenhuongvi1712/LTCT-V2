import axios from 'axios'
const axiosInstance = axios.create({
  baseURL: 'https://module-user-ltct.herokuapp.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export async function login(username, password) {
  try {
    const res = await axiosInstance.post('/login', { username, password })
    return res.data
  } catch (error) {
    return error
  }
}

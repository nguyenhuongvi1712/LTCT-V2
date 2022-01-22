import axios from 'axios'
const axiosInstance = axios.create({
  baseURL: 'https://module-user-ltct.herokuapp.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export async function login_14(username, password) {
  try {
    const res = await axiosInstance.post('/login', { username, password })
    return res.data
  } catch (error) {
    return error
  }
}

export async function getListUsers_14() {
  try {
    const token = localStorage.getItem('item')
    const res = await axiosInstance.get('user/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return res.data
  } catch (error) {
    return error
  }
}

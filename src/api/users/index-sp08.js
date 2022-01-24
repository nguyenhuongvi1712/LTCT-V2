import axios from 'axios'
const axiosInstance = axios.create({
  baseURL: 'https://ltct-api.herokuapp.com/api/ltct',
  headers: {
    'Content-Type': 'application/json',
  },
})

export async function login_08(username, password) {
  try {
    const res = await axiosInstance.post('/login', { username, password })
    return res.data
  } catch (error) {
    return error
  }
}

export async function getListUsers_08() {
  try {
    const res = await axiosInstance.get('admin/all')
    return res.data
  } catch (error) {
    return error
  }
}

export async function deleteUser_14(id) {
  try {
    const res = await axiosInstance.delete('user/' + id)
    return res.data
  } catch (error) {
    return error
  }
}

export async function getAccountById_14(id) {
  try {
    const res = await axiosInstance.get('user/' + id)
    return res.data
  } catch (error) {
    return error
  }
}

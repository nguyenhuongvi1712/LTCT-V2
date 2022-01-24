import axios from 'axios'
const axiosInstance = axios.create({
  baseURL: 'https://ltct-api.herokuapp.com/api/ltct',
  headers: {
    'Content-Type': 'application/json',
  },
})

export async function login_08(username, password) {
  try {
    const res = await axiosInstance.post('user/login', { username, password })
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

export async function deleteUser_08(id) {
  try {
    const res = await axiosInstance.delete('user/deleteuser', { data: { id } })
    return res.data
  } catch (error) {
    return error
  }
}

export async function getAccountById_08(id) {
  try {
    const res = await axiosInstance.get('admin/userbyid?id=' + id)
    return res.data
  } catch (error) {
    return error
  }
}

export async function updateAccount_08(id, data) {
  try {
    const res = await axiosInstance.put('user/updateuserinfo/', {
      ...data,
      userId: id,
      telephone: data.phone,
    })
    return {
      success: true,
      ...res.data,
    }
  } catch (error) {
    return {
      success: false,
      error,
    }
  }
}

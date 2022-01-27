import axios from 'axios'
const axiosInstance = axios.create({
  baseURL: 'https://ltct-customer.herokuapp.com/api',
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
    const res = await axiosInstance.get('/user')
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

export async function updateAccount_14(id, data) {
  try {
    const res = await axiosInstance.put('/user/' + id, data)
    return {
      success: true,
      ...res.data,
    }
  } catch (error) {
    return {
      success: false,
      ...error,
    }
  }
}

export async function blockUser_14(id) {
  try {
    const res = await axiosInstance.get(`user/${id}/block`)
    return {
      success: true,
      ...res.data,
    }
  } catch (error) {
    return {
      success: false,
      ...error,
    }
  }
}

export async function activeUser_14(id) {
  try {
    const res = await axiosInstance.get(`user/${id}/active`)
    return {
      success: true,
      ...res.data,
    }
  } catch (error) {
    return {
      success: false,
      ...error,
    }
  }
}

export async function createNewAccount_14(account) {
  try {
    const res = await axiosInstance.post('/register', {
      username: account.username,
      password: account.password,
      password_confirmation: account.password_confirmation,
      email: account.email,
      phone: account.phone,
      role: account.role,
    })
    return {
      success: true,
      ...res.data,
    }
  } catch (error) {
    return {
      success: false,
      ...error,
    }
  }
}

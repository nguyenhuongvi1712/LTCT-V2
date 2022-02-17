import axios from 'axios'
const axiosInstance = axios.create({
  baseURL: 'http://server.myedu.me/api/user/v1/',
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use((config) => {
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  return config
})

export async function login(email, password) {
  try {
    console.log(email, password)
    // const params = new URLSearchParams()
    // params.append('email', email)
    // params.append('password', password)
    // const res = await axiosInstance.post('account/login_session/', params)
    const res = {
      data: {
        success: true,
        redirect_url: null,
      },
    }
    return res.data
  } catch (error) {
    return error
  }
}

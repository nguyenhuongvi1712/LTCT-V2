import axios from 'axios'
const axiosInstance = axios.create({
  baseURL: 'https://ltct-laravel.herokuapp.com/public/api/',
  headers: {
    'Content-Type': 'application/json',
  },
})

export async function getListFeedbacks_06() {
  try {
    return (await axiosInstance.get('/feedbacks')).data
  } catch (error) {
    return error
  }
}

import axios from 'axios'
const axiosInstance = axios.create({
  baseURL: 'http://it4492sp21.herokuapp.com',
  headers: {
    'Content-Type': 'application/json',
  },
})

export async function getListFeedbacks_21() {
  try {
    return (await axiosInstance.get('/feedbacks')).data
  } catch (error) {
    return error
  }
}

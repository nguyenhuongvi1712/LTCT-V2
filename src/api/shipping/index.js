import axios from 'axios'
const axiosInstance = axios.create({
  baseURL: 'https://ltct-sp-07.herokuapp.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export async function getAvailableDelivery() {
  const res = await axiosInstance.post('getAvailableDelivery')
  return res.data
}

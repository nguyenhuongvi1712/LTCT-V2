import axios from 'axios'
const axiosInstance = axios.create({
  baseURL: 'https://ltct-api.2soft.top',
  headers: {
    'Content-Type': 'application/json',
  },
})

export async function getAdvertisment() {
  const res = await axiosInstance.get('/admin/advertisements')
  return res.data
}

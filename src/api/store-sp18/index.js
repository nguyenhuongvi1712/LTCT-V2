import axios from 'axios'
const axiosInstance = axios.create({
  baseURL: 'https://rocky-anchorage-40000.herokuapp.com/api/',
  headers: {
    'Content-Type': 'application/json',
  },
})

export async function getBill() {
  const res = await axiosInstance.get('/get_impbills')
  return res.data
}

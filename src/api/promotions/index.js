import axios from 'axios'
import promotions from '@/mock/promotion'
const axiosInstance = axios.create({
  baseURL: 'https://ltct-sp19-api.herokuapp.com/api/sale/',
  headers: {
    'Content-Type': 'application/json',
  },
})

export async function getPromotion() {
  //   const res = await axiosInstance.get('/admin/advertisements')
  const res = promotions
  return res
}

export async function getListPromotions() {
  try {
    const res = await axiosInstance.get('/code')
    return res.data
  } catch (error) {
    return error
  }
}

import axios from 'axios'
import promotions from '@/mock/promotion'
const axiosInstance = axios.create({
  baseURL: 'https://ltct-sp19-api.herokuapp.com/api',
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

export async function getListPromotion() {
  try {
    const res = await axiosInstance.get('/sale/promotion/admin/')
    return res.data
  } catch (error) {
    return error
  }
}

export async function deletePromotion(id) {
  try {
    const data = { promotionIds: [id] }
    const res = await axiosInstance.delete('sale/promotion/admin/destroy', {
      data: data,
    })
    return {
      ...res.data,
      success: true,
    }
  } catch (error) {
    return {
      ...error,
      success: false,
    }
  }
}

import axios from 'axios'
const axiosInstance = axios.create({
  baseURL: 'https://binhnguyen-tech.stackstaging.com/OrderModule/',
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use((config) => {
  return config
})

export async function getOrders_SP1() {
  try {
    const orders = await axiosInstance.get('/order')
    return {
      ...orders,
      success: true,
    }
  } catch (error) {
    return {
      ...error,
      success: false,
    }
  }
}

export async function getOrdersById_SP01(id) {
  try {
    const orders = await axiosInstance.get(`order/${id}`)
    return {
      ...orders.data,
      success: true,
    }
  } catch (error) {
    return {
      ...error,
      success: false,
    }
  }
}

export async function updateStatus_SP01(id, status) {
  try {
    const orders = await axiosInstance.patch(`order/${id}`, status)
    return {
      ...orders.data,
      success: true,
    }
  } catch (error) {
    return {
      ...error,
      success: false,
    }
  }
}

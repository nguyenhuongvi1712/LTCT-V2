import axios from 'axios'
const axiosInstance = axios.create({
  baseURL: 'https://binhnguyen-tech.stackstaging.com/OrderModule/order',
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use((config) => {
  const accessToken = 'test'
  config.headers['x-api-key'] = `Bearer ${accessToken}`
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

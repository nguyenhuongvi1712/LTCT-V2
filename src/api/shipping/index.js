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

export async function takeDelivery(shipperId, deliveryId) {
  try {
    const res = await axiosInstance.post(
      `takeDelivery?shipperId=${shipperId}&deliveryId=${deliveryId}`,
    )
    return {
      success: true,
      ...res.data,
    }
  } catch (error) {
    return {
      success: false,
      ...error,
    }
  }
}

export async function getDeliveryByShipperId(id) {
  try {
    const res = await axiosInstance.post(`getDeliveryByShipper?shipperId=${id}`)
    return {
      success: true,
      ...res.data,
    }
  } catch (error) {
    return {
      success: false,
      ...error,
    }
  }
}

export async function updateStatus(id) {
  try {
    const res = await axiosInstance.post(`/updateStatus?deliveryId=${id}`)
    return {
      success: true,
      ...res.data,
    }
  } catch (error) {
    return {
      success: false,
      ...error,
    }
  }
}

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

export async function getListTypeOfAdvertisment() {
  const res = await axiosInstance.get('/admin/advertisements/list-type')
  return res.data
}

export async function createNewAd(ad) {
  try {
    const res = await axiosInstance.post('/admin/advertisements', ad)
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

export async function deleteAd(id) {
  try {
    const res = await axiosInstance.delete(`/admin/advertisements/${id}`)
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

export async function getAdvertismentById(id) {
  try {
    const res = await axiosInstance.get(`/admin/advertisements/${id}`)
    return res.data
  } catch (error) {
    return error
  }
}

export async function editAdvertisement(id, ad) {
  try {
    const res = await axiosInstance.patch(`/admin/advertisements/${id}`, ad)
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

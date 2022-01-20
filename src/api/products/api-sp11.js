import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://team-product-api.herokuapp.com/api/',
  headers: {
    'Content-Type': 'application/json',
  },
})

export async function createNewProduct_11(product) {
  try {
    const res = await axiosInstance.post('/products', product)
    return res.data
  } catch (error) {
    return error
  }
}
export async function getListCategory_11() {
  const res = await axiosInstance.get('/categories')
  return res.data
}

export async function getListProducts_11() {
  const res = await axiosInstance.get('/products')
  return res.data
}

export async function deleteProduct_11(id) {
  const res = await axiosInstance.delete(`/products/${id}`)
  return res
}

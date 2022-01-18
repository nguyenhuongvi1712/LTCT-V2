import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://limitless-shelf-91096.herokuapp.com/api/',
  headers: {
    'Content-Type': 'application/json',
  },
})

export async function createNewProduct(product) {
  const res = await axiosInstance.post('/products', product)
  console.log('res', res)
  return res.data
}
export async function getListCategory() {
  const res = await axiosInstance.get('/categories')
  return res.data
}

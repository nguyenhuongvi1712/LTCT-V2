import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://laptrinhcautrucapi.herokuapp.com/',
  headers: {
    'Content-Type': 'application/json',
  },
})

export async function createNewProduct_17(product) {
  const res = await axiosInstance.put('/product/add_product', product)
  console.log('res', res)
  return res.data
}
export async function getListCategory_17() {
  const res = await axiosInstance.get('/category/show')
  return res.data
}

export async function getProducts() {
  const res = await axiosInstance.get('/product/show')
  return res.data
}

export async function getProductById(id) {
  const res = await axiosInstance.get(`product/id?id=${id}`)
  return res.data
}

export async function getListProducts_17() {
  const res = await axiosInstance.get('/product/show')
  return res.data
}

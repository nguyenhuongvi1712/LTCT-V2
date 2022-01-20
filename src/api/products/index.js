// import axios from 'axios'
import {
  createNewProduct_11,
  getListCategory_11,
  getListProducts_11,
  deleteProduct_11,
} from './api-sp11'
import {
  createNewProduct_17,
  getListCategory_17,
  getListProducts_17,
} from './api-sp17'

// const axiosInstance = axios.create({
//   baseURL: 'https://team-product-api.herokuapp.com/api/',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// })

async function getModule() {
  return 11
}

export async function createNewProduct(product) {
  const res = await getModule()
  if (res === 11) {
    return await createNewProduct_11(product)
  } else {
    return await createNewProduct_17(product)
  }
}
export async function getListCategory() {
  const res = await getModule()
  if (res === 11) {
    return (await getListCategory_11()).data
  } else {
    return await getListCategory_17()
  }
}
export async function getListProducts() {
  const res = await getModule()
  if (res === 11) {
    return (await getListProducts_11()).data
  } else {
    return await getListProducts_17()
  }
}
export async function deleteProduct(id) {
  const res = await getModule()
  if (res === 11) {
    return await deleteProduct_11(id)
  } else {
    return
  }
}
export function filtersCategory(categories, id) {
  const category = categories.filter((e) => {
    return e.id === id
  })
  return category[0]
}

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
    return {
      ...res.data,
      success_code: true,
    }
  } catch (error) {
    return {
      ...error,
      success_code: false,
    }
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

export async function getProductById_11(id) {
  try {
    const res = await axiosInstance.get(`/products/${id}`)
    return {
      ...res.data,
      success_code: true,
    }
  } catch (error) {
    return {
      ...error,
      success_code: false,
    }
  }
}

export async function editProduct_11(id, product) {
  try {
    const res = await axiosInstance.post('/products/' + id, product)
    return {
      ...res.data,
      success_code: true,
    }
  } catch (error) {
    return {
      ...error,
      success_code: false,
    }
  }
}

export async function editCategory_11(id, category) {
  try {
    const res = await axiosInstance.post(`/categories/${id}`, category)
    return {
      ...res.data,
      success_code: true,
    }
  } catch (error) {
    return {
      ...error,
      success_code: false,
    }
  }
}

export async function createNewCategory_11(category) {
  try {
    const res = await axiosInstance.post('/categories', category)
    return {
      ...res.data,
      success_code: true,
    }
  } catch (error) {
    return {
      ...error,
      success_code: false,
    }
  }
}

export async function deleteCategory_11(id) {
  const res = await axiosInstance.delete(`/categories/${id}`)
  return res
}

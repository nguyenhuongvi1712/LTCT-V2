import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://laptrinhcautrucapi.herokuapp.com/',
  headers: {
    'Content-Type': 'application/json',
  },
})

export async function createNewProduct_17(product) {
  try {
    const res = await axiosInstance.put('/productV2/add_product', product)
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
export async function getListCategory_17() {
  const res = await axiosInstance.get('/category/show')
  return res.data
}

export async function getProducts() {
  const res = await axiosInstance.get('/product/show')
  return res.data
}

export async function getProductById_17(id) {
  try {
    const res = await axiosInstance.get(`product/id?id=${id}`)
    return {
      ...res.data[0],
      success_code: true,
    }
  } catch (error) {
    return {
      ...error,
      success_code: true,
    }
  }
}

export async function getListProducts_17() {
  const res = await axiosInstance.get('/product/show')
  return res.data
}

export async function deleteProduct_17(id) {
  const res = await axiosInstance.delete('/productV2/delete_product', {
    data: { id },
  })
  return res
}

export async function editProduct_17(product) {
  try {
    const res = await axiosInstance.post('/productV2/edit_product', product)
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

export async function editCategory_17(category) {
  try {
    const res = await axiosInstance.post('/category/edit_category', category)
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

export async function createNewCategory_17(category) {
  try {
    const res = await axiosInstance.put('/category/add_category', category)
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

export async function deleteCategory_17(id) {
  const res = await axiosInstance.delete('/category/delete_category', {
    data: { id },
  })
  return res
}

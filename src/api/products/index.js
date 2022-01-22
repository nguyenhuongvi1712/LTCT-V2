// import axios from 'axios'
import {
  createNewProduct_11,
  getListCategory_11,
  getListProducts_11,
  deleteProduct_11,
  getProductById_11,
  editProduct_11,
  editCategory_11,
  createNewCategory_11,
  deleteCategory_11,
} from './api-sp11'
import {
  createNewProduct_17,
  getListCategory_17,
  getListProducts_17,
  deleteProduct_17,
  getProductById_17,
  editProduct_17,
  editCategory_17,
  createNewCategory_17,
  deleteCategory_17,
} from './api-sp17'

async function getModule() {
  return 11
}

export function filtersCategory(categories, id) {
  const category = categories.filter((e) => {
    return e.id === id
  })
  return category[0]
}

export function getCountProductOfCategory(products, id) {
  const productList = products.filter((e) => {
    return e.category_id === id
  })
  return productList
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
    return await deleteProduct_17(id)
  }
}

export async function getProductById(id) {
  const res = await getModule()
  if (res === 11) {
    const res = await getProductById_11(id)
    return {
      ...res.data,
      success_code: res.success_code,
    }
  } else {
    return await getProductById_17(id)
  }
}

export async function editProduct(id, product) {
  const res = await getModule()
  if (res === 11) {
    return await editProduct_11(id, product)
  } else {
    const req = {
      id,
      ...product,
    }
    return await editProduct_17(req)
  }
}

export async function editCategory(id, name) {
  const res = await getModule()
  if (res === 11) {
    return await editCategory_11(id, { name })
  } else {
    const req = {
      id,
      name,
    }
    return await editCategory_17(req)
  }
}

export async function createNewCategory(category) {
  const res = await getModule()
  if (res === 11) {
    return await createNewCategory_11(category)
  } else {
    return await createNewCategory_17(category)
  }
}

export async function deleteCategory(id) {
  const res = await getModule()
  if (res === 11) {
    return await deleteCategory_11(id)
  } else {
    return await deleteCategory_17(id)
  }
}

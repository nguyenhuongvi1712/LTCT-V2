import {
  login_14,
  getListUsers_14,
  deleteUser_14,
  getAccountById_14,
  updateAccount_14,
} from './index-sp14'

import { login_08 } from './index-sp08'

async function getModule() {
  return 14
}

export async function login(username, password) {
  const res = await getModule()
  if (res === 14) {
    const user = await login_14(username, password)
    return user
  } else {
    return await login_08(username, password)
  }
}

export async function getListUsers() {
  const res = await getModule()
  if (res === 14) {
    return await getListUsers_14()
  }
}

export async function deleteUser(id) {
  const res = await getModule()
  if (res === 14) {
    return await deleteUser_14(id)
  }
}

export async function getAccountInfo(id) {
  const res = await getModule()
  if (res === 14) {
    return (await getAccountById_14(id)).data
  }
}

export async function updateUser(id, data) {
  const res = await getModule()
  if (res === 14) {
    return await updateAccount_14(id, data)
  }
}

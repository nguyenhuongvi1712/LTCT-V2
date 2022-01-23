import { login_14, getListUsers_14, deleteUser_14 } from './index-sp14'

async function getModule() {
  return 14
}

export async function login(username, password) {
  const res = await getModule()
  if (res === 14) {
    const user = await login_14(username, password)
    return user
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

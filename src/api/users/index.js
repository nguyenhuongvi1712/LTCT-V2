import {
  login_14,
  getListUsers_14,
  deleteUser_14,
  getAccountById_14,
  updateAccount_14,
  blockUser_14,
  activeUser_14,
  createNewAccount_14,
} from './index-sp14'

import {
  login_08,
  getListUsers_08,
  deleteUser_08,
  getAccountById_08,
  updateAccount_08,
  blockUser_08,
  activeUser_08,
  createNewAccount_08,
} from './index-sp08'

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
  } else {
    const users = await getListUsers_08()
    users.data = users.data.map((e) => {
      return {
        ...e,
        id: e._id,
        phone: e.telephone,
      }
    })
    return users
  }
}

export async function deleteUser(id) {
  const res = await getModule()
  if (res === 14) {
    return await deleteUser_14(id)
  } else {
    return await deleteUser_08(id)
  }
}

export async function getAccountInfo(id) {
  const res = await getModule()
  if (res === 14) {
    return (await getAccountById_14(id)).data
  } else {
    const user = (await getAccountById_08(id)).data
    return {
      ...user,
      id: user._id,
      phone: user.telephone,
    }
  }
}

export async function updateUser(id, data) {
  const res = await getModule()
  if (res === 14) {
    return await updateAccount_14(id, data)
  } else {
    return await updateAccount_08(id, data)
  }
}

export async function blockUser(id) {
  const res = await getModule()
  if (res === 14) {
    return await blockUser_14(id)
  } else {
    return await blockUser_08(id)
  }
}

export async function activeUser(id) {
  const res = await getModule()
  if (res === 14) {
    return await activeUser_14(id)
  } else {
    return await activeUser_08(id)
  }
}

export async function createNewAccount(account) {
  const res = await getModule()
  if (res === 14) {
    return await createNewAccount_14(account)
  } else {
    return await createNewAccount_08(account)
  }
}

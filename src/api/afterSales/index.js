import { getListFeedbacks_21 } from './index-sp21'
import { getListFeedbacks_06 } from './index-sp06'
async function getModule() {
  return 21
}

export async function getListFeedbacks() {
  const res = await getModule()
  if (res === 21) {
    return await getListFeedbacks_21()
  } else {
    return await getListFeedbacks_06()
  }
}

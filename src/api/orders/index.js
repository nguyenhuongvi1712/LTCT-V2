// import axios from 'axios'
// import orders from '../../mock/orders'
// const axiosInstance = axios.create({
//   baseURL: 'https://binhnguyen-tech.stackstaging.com/OrderModule/order',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// })

// axiosInstance.interceptors.request.use((config) => {
//   const accessToken = 'test'
//   config.headers['x-api-key'] = `Bearer ${accessToken}`
//   return config
// })

// export async function getOrders(year_par) {
//   if (year_par) {
//     return orders.filter((item) => {
//       let order_timestamp = new Date(item.order_timestamp)
//       return order_timestamp.getFullYear() == year_par
//     })
//   } else return orders
// }
// export async function getOrdersByFilter(start_par, end_par) {
//   if (start_par && end_par) {
//     const start = new Date(start_par)
//     const end = new Date(end_par)
//     return orders.filter((item) => {
//       let order_timestamp = new Date(item.order_timestamp)
//       return order_timestamp <= end && order_timestamp >= start
//     })
//   } else return orders
// }
import { getOrders_SP1 } from './orders-sp1'

async function getModule() {
  return 1
}

export async function getOrders() {
  const res = await getModule()
  if (res === 1) {
    return await getOrders_SP1()
  }
}

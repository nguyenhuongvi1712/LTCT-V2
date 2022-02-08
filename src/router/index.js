import { h, resolveComponent } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: DefaultLayout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard.vue'),
      },
      {
        path: '/report',
        name: 'Report',
        redirect: '/report/advertisment',
      },
      {
        path: '/report/advertisment',
        name: 'Advertisment',
        component: () =>
          import('@/views/reports/advertisment/Advertisment.vue'),
      },
      {
        path: '/report/promotion',
        name: 'Promotion',
        component: () => import('@/views/reports/promotion/Promotion.vue'),
      },
      {
        path: '/report/revenue',
        name: 'Revenue',
        component: () => import('@/views/reports/revenue/Revenue.vue'),
      },
      {
        path: '/report/store',
        name: 'Store',
        component: () => import('@/views/reports/store/ListBill.vue'),
      },
      {
        path: '/products',
        name: 'Products',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/products/list',
        children: [
          {
            path: '/products/list',
            name: 'List Product',
            component: () =>
              import('@/views/management/products/ProductList.vue'),
          },
          {
            path: '/products/create',
            name: 'Create new product',
            component: () =>
              import('@/views/management/products/CreateProduct.vue'),
          },
          {
            path: '/products/:id',
            name: 'Edit Product',
            component: () =>
              import('@/views/management/products/EditProduct.vue'),
          },
          {
            path: '/products/categories',
            name: 'Manage Categories',
            component: () =>
              import('@/views/management/products/Categories.vue'),
          },
        ],
      },
      {
        path: '/users',
        name: 'Users',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/users/customers',
        children: [
          {
            path: '/users/customers',
            name: 'List Customers',
            component: () => import('@/views/management/users/UsersList.vue'),
          },
          {
            path: '/users/accounts',
            name: 'List Accounts',
            component: () =>
              import('@/views/management/users/AccountsList.vue'),
          },
          {
            path: '/users/create',
            name: 'Create new account',
            component: () =>
              import('@/views/management/users/CreateNewAccount.vue'),
          },
          {
            path: '/users/:id',
            name: 'Customer information',
            component: () => import('@/views/management/users/Customer.vue'),
          },
          {
            path: '/products/:id',
            name: 'Edit Product',
            component: () =>
              import('@/views/management/products/EditProduct.vue'),
          },
          {
            path: '/products/categories',
            name: 'Manage Categories',
            component: () =>
              import('@/views/management/products/Categories.vue'),
          },
        ],
      },
      {
        path: '/promotions',
        name: 'Promotions',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/promotions/list',
        children: [
          {
            path: '/promotions/list',
            name: 'List Promotions',
            component: () =>
              import('@/views/management/promotions/PromotionsList.vue'),
          },
        ],
      },
      {
        path: '/advertisements',
        name: 'Advertisements',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/advertisements/list',
        children: [
          {
            path: '/advertisements/list',
            name: 'List Advertisements',
            component: () =>
              import(
                '@/views/management/advertisements/AdvertisementsList.vue'
              ),
          },
          {
            path: '/advertisements/create',
            name: 'Create Advertisement',
            component: () =>
              import('@/views/management/advertisements/CreateAd.vue'),
          },
          {
            path: '/advertisements/:id',
            name: 'Advertisement information',
            component: () =>
              import('@/views/management/advertisements/EditAd.vue'),
          },
        ],
      },
      {
        path: '/orders',
        name: 'Orders',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/orders/list',
        children: [
          {
            path: '/orders/list',
            name: 'List Orders',
            component: () =>
              import('@/views/notification/orders/ListOrders.vue'),
          },
          {
            path: '/orders/new',
            name: 'New Orders',
            component: () =>
              import('@/views/notification/orders/ListAvailableOrders.vue'),
          },
          {
            path: '/orders/list-order',
            name: 'My Orders',
            component: () =>
              import('@/views/notification/orders/ListOrdersOfShipper.vue'),
          },
          {
            path: '/orders/:id',
            name: 'Order detail',
            component: () =>
              import('@/views/notification/orders/OrderDetail.vue'),
          },
        ],
      },
      {
        path: '/after-sales',
        name: 'After-sales service',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/after-sales/feedbacks/list',
        children: [
          {
            path: '/after-sales/feedbacks/list',
            name: 'List Feedbacks',
            component: () =>
              import('@/views/management/afterSales/ListFeedbacks.vue'),
          },
        ],
      },
      {
        path: '/widgets',
        name: 'Widgets',
        component: () => import('@/views/widgets/Widgets.vue'),
      },
    ],
  },
  {
    path: '/pages',
    redirect: '/pages/404',
    name: 'Pages',
    component: {
      render() {
        return h(resolveComponent('router-view'))
      },
    },
    children: [
      {
        path: '404',
        name: 'Page404',
        component: () => import('@/views/pages/Page404'),
      },
      {
        path: '500',
        name: 'Page500',
        component: () => import('@/views/pages/Page500'),
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/pages/Login'),
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/pages/Register'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
})

router.beforeEach((to, from, next) => {
  // chuyển đến trang login nếu chưa được login
  // const publicPages = ['pages/login', 'pages/register']
  // const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('isAuthenticated')
  if (to.name !== 'Login' && to.name !== 'Register' && !loggedIn) {
    return next({ name: 'Login' })
  } else next()
})

export default router

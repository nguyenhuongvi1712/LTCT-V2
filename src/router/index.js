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
        path: '/base',
        name: 'Base',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/base/breadcrumbs',
        children: [
          {
            path: '/base/accordion',
            name: 'Accordion',
            component: () => import('@/views/base/Accordion.vue'),
          },
          {
            path: '/base/breadcrumbs',
            name: 'Breadcrumbs',
            component: () => import('@/views/base/Breadcrumbs.vue'),
          },
          {
            path: '/base/cards',
            name: 'Cards',
            component: () => import('@/views/base/Cards.vue'),
          },
          {
            path: '/base/carousels',
            name: 'Carousels',
            component: () => import('@/views/base/Carousels.vue'),
          },
          {
            path: '/base/collapses',
            name: 'Collapses',
            component: () => import('@/views/base/Collapses.vue'),
          },
          {
            path: '/base/list-groups',
            name: 'List Groups',
            component: () => import('@/views/base/ListGroups.vue'),
          },
          {
            path: '/base/navs',
            name: 'Navs',
            component: () => import('@/views/base/Navs.vue'),
          },
          {
            path: '/base/paginations',
            name: 'Paginations',
            component: () => import('@/views/base/Paginations.vue'),
          },
          {
            path: '/base/placeholders',
            name: 'Placeholders',
            component: () => import('@/views/base/Placeholders.vue'),
          },
          {
            path: '/base/popovers',
            name: 'Popovers',
            component: () => import('@/views/base/Popovers.vue'),
          },
          {
            path: '/base/progress',
            name: 'Progress',
            component: () => import('@/views/base/Progress.vue'),
          },
          {
            path: '/base/spinners',
            name: 'Spinners',
            component: () => import('@/views/base/Spinners.vue'),
          },
          {
            path: '/base/tables',
            name: 'Tables',
            component: () => import('@/views/base/Tables.vue'),
          },
          {
            path: '/base/tooltips',
            name: 'Tooltips',
            component: () => import('@/views/base/Tooltips.vue'),
          },
        ],
      },
      {
        path: '/buttons',
        name: 'Buttons',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/buttons/standard-buttons',
        children: [
          {
            path: '/buttons/standard-buttons',
            name: 'Buttons',
            component: () => import('@/views/buttons/Buttons.vue'),
          },
          {
            path: '/buttons/dropdowns',
            name: 'Dropdowns',
            component: () => import('@/views/buttons/Dropdowns.vue'),
          },
          {
            path: '/buttons/button-groups',
            name: 'Button Groups',
            component: () => import('@/views/buttons/ButtonGroups.vue'),
          },
        ],
      },
      {
        path: '/forms',
        name: 'Forms',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/forms/form-control',
        children: [
          {
            path: '/forms/form-control',
            name: 'Form Control',
            component: () => import('@/views/forms/FormControl.vue'),
          },
          {
            path: '/forms/select',
            name: 'Select',
            component: () => import('@/views/forms/Select.vue'),
          },
          {
            path: '/forms/checks-radios',
            name: 'Checks & Radios',
            component: () => import('@/views/forms/ChecksRadios.vue'),
          },
          {
            path: '/forms/range',
            name: 'Range',
            component: () => import('@/views/forms/Range.vue'),
          },
          {
            path: '/forms/input-group',
            name: 'Input Group',
            component: () => import('@/views/forms/InputGroup.vue'),
          },
          {
            path: '/forms/floating-labels',
            name: 'Floating Labels',
            component: () => import('@/views/forms/FloatingLabels.vue'),
          },
          {
            path: '/forms/layout',
            name: 'Layout',
            component: () => import('@/views/forms/Layout.vue'),
          },
          {
            path: '/forms/validation',
            name: 'Validation',
            component: () => import('@/views/forms/Validation.vue'),
          },
        ],
      },
      {
        path: '/charts',
        name: 'Charts',
        component: () => import('@/views/charts/Charts.vue'),
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
        ],
      },
      {
        path: '/notifications',
        name: 'Notifications',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/notifications/alerts',
        children: [
          {
            path: '/notifications/alerts',
            name: 'Alerts',
            component: () => import('@/views/notifications/Alerts.vue'),
          },
          {
            path: '/notifications/badges',
            name: 'Badges',
            component: () => import('@/views/notifications/Badges.vue'),
          },
          {
            path: '/notifications/modals',
            name: 'Modals',
            component: () => import('@/views/notifications/Modals.vue'),
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

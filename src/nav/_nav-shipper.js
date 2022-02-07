export default [
  {
    component: 'CNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: 'cil-speedometer',
    badge: {
      color: 'primary',
      text: 'NEW',
    },
  },
  {
    component: 'CNavTitle',
    name: 'Notification',
  },
  {
    component: 'CNavGroup',
    name: 'Orders',
    to: '/orders',
    icon: 'cil-bell',
    items: [
      {
        component: 'CNavItem',
        name: 'New Orders',
        to: '/orders/new',
      },
      {
        component: 'CNavItem',
        name: 'My Orders',
        to: '/orders/list-order',
      },
    ],
  },
  //   {
  //     component: 'CNavTitle',
  //     name: 'Report',
  //   },
  //   {
  //     component: 'CNavItem',
  //     name: 'Advertisment',
  //     to: '/report/advertisment',
  //     icon: 'cil-drop',
  //   },
  //   {
  //     component: 'CNavItem',
  //     name: 'Promotion',
  //     to: '/report/promotion',
  //     icon: 'cil-pencil',
  //   },
  //   {
  //     component: 'CNavItem',
  //     name: 'Revenue',
  //     to: '/report/revenue',
  //     icon: 'cil-notes',
  //   },
  //   {
  //     component: 'CNavItem',
  //     name: 'Store',
  //     to: '/report/store',
  //     icon: 'cil-cursor',
  //   },
]

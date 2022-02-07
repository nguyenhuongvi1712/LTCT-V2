import nav_admin from '../nav/_nav.js'
import nav_shipper from '../nav/_nav-shipper.js'
const user = JSON.parse(localStorage.getItem('user'))
export default user?.role === 'admin' ? nav_admin : nav_shipper

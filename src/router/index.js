import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from '@/views/GoodsList'
import Cart from '@/views/Cart'
import Address from '@/views/Address'
import OrderComfirm from '@/views/OrderComfirm'
import OrderSuccess from '@/views/OrderSuccess'
import Login from '@/views/Login'
import AddAddress from '@/views/AddAddress'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'GoodsList',
      component: GoodsList
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/address',
      name: 'Address',
      component: Address
    },
    {
      path: '/addAddress',
      name: 'AddAddress',
      component: AddAddress
    },
    {
      path: '/ordercomfirm',
      name: 'OrderComfirm',
      component: OrderComfirm
    },
    {
      path: '/ordersuc',
      name: 'OrderSuccess',
      component: OrderSuccess
    }
  ]
})

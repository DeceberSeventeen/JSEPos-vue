import Vue from 'vue'
import Router from 'vue-router'


import HelloWorld from '@/components/HelloWorld'
import IndexPanel from '@/components/Panel'
import Order from '../components/management/Order'
import Cashier from '../components/cashierdesk/Cashier'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'IndexPanel',
      component: IndexPanel,
      redirect: '/cashierdesk/cashier',
      children: [
        {
          path: '/cashierdesk/cashier',
          component: Cashier,
        },
        {
          path: '/managementcenter/order',
          component: Order,
        },
      ]
    },
  ]
})

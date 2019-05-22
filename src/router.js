import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/layout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/dashboard',
      children: [
        {
          path: 'dashboard',
          component: () => import('@/views/dashboard/index'),
          name: 'dashboard',
          meta: {
            title: '首页',
            icon: 'dashboard',
            affix: true
          }
        },
        {
          path: 'userManage',
          name: 'userManage',
          component: () => import('@/views/permission/users'),
          meta: {
            keys: 'userManage',
            title: '用户管理'
          }
        },
        {
          path: 'roleManage',
          name: 'roleManage',
          component: () => import('@/views/permission/role'),
          meta: {
            keys: 'roleManage',
            title: '角色管理'
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index')
    }
  ]
})

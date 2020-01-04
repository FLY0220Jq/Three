import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'


//基本路由constantRoutes不能动
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },



  {
    path: '/customer',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'CustomerList',
        component: () => import('@/pages/customer/List'),
        meta: { title: '顾客管理', icon: 'user' }
      }
    ]
  },
  {
    path: '/employee',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'EmployeeList',
        component: () => import('@/pages/employee/List'),
        meta: { title: '员工管理', icon: 'user' }
      }
    ]
  },
  // {
  //   path: '/lan',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'LanList',
  //       component: () => import('@/pages/lan/List'),
  //       meta: { title: '栏目管理', icon: 'user' }
  //     }
  //   ]
  // },
  {
    path: '/production',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'ProductionList',
        component: () => import('@/pages/production/List'),
        meta: { title: '产品管理', icon: 'user' }
      }
    ]
  },{
    path: '/order',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'OrderList',
        component: () => import('@/pages/order/List'),
        meta: { title: '订单管理', icon: 'user' }
      }
    ]
  },{
    path: '/address',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'AddressList',
        component: () => import('@/pages/address/List'),
        meta: { title: '地址管理', icon: 'user' }
      }
    ]
  },{
    path: '/category',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'CategoryList',
        component: () => import('@/pages/category/List'),
        meta: { title: '栏目管理', icon: 'user' }
      }
    ]
  },{
    path: '/comment',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'CommentList',
        component: () => import('@/pages/comment/List'),
        meta: { title: '评论管理', icon: 'user' }
      }
    ]
  },



  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
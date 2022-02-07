import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
// import Category from '../views/Category.vue' 配置完懒加载 这个就不需要了
// import Cart from '../views/Cart.vue'
// import Profile from '../views/Profile.vue'
// import Search from '../views/Search.vue'
// import Detail from '../views/Detail.vue'
// import CategoryDetail from '../views/CategoryDetail.vue'
// import Login from '../views/Login.vue'
// import Regist from '../views/Regist.vue'
// import Order from '../views/Order.vue'
// import MyOrder from '../views/MyOrder.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '首页'
    }
  },
  {
    path: '/category',
    name: 'Category',
    // component: Category, 默认加载方法

    // //懒加载 按需加载 promise 配置方法  如果不懒加载 会一次性加载所有js文件 会特别慢
    // component: resolve => require(['../views/Category.vue'], resolve),

    // //动态import 的方式来懒加载 推荐用法
    // component: () => import('../views/Category.vue'),

    //按组分块
    component: () => import(/* webpackChunkName: "group-category"*/'../views/Category.vue'),
    meta: {//设置keep-alive 组件缓存
      keepAlive: true,
      title: '分类'
    }
  },
  {
    path: '/cart',
    name: 'Cart',
    // component: Cart
    // component: resolve => require(['../views/Cart.vue'], resolve)
    // component: () => import('../views/Cart.vue'),
    component: () => import(/* webpackChunkName: "group-Cart"*/'../views/Cart.vue'),
    meta: {
      title: '购物车'
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    // component: Profile,
    // component: resolve => require(['../views/Profile.vue'], resolve),
    // component: () => import('../views/Profile.vue'),
    component: () => import(/* webpackChunkName: "group-Profile"*/'../views/Profile.vue'),
    meta: {
      title: '个人'
    },
    children: [
      {
        path: 'login',
        name: 'Login',
        // component: Login
        // component: resolve => require(['../views/Login.vue'], resolve)
        // component: () => import('../views/Login.vue'),
        component: () => import(/* webpackChunkName: "group-Profile"*/'../views/Login.vue'),
        meta: {
          title: '个人'
        }
      },
      {
        path: 'regist',
        name: 'Regist',
        // component: Regist
        // component: resolve => require(['../views/Regist.vue'], resolve)
        // component: () => import('../views/Regist.vue'),
        component: () => import(/* webpackChunkName: "group-Profile"*/'../views/Regist.vue'),
        meta: {
          title: '个人'
        }
      }
    ]
  },
  {
    path: '/search',
    name: 'Search',
    // component: Search
    // component: resolve => require(['../views/Search.vue'], resolve)
    // component: () => import('../views/Search.vue'),
    component: () => import(/* webpackChunkName: "group-Search"*/'../views/Search.vue'),
    meta: {
      title: '搜索'
    }
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    // component: Detail
    // component: resolve => require(['../views/Detail.vue'], resolve)
    // component: () => import('../views/Detail.vue'),
    component: () => import(/* webpackChunkName: "group-Detail"*/'../views/Detail.vue'),
    meta: {
      title: '详情'
    }
  },
  {
    path: '/cateDetail/:cateId/:subId',
    name: 'CategoryDetail',
    // component: CategoryDetail
    // component: resolve => require(['../views/CategoryDetail.vue'], resolve)
    // component: () => import('../views/CategoryDetail.vue'),
    component: () => import(/* webpackChunkName: "group-CategoryDetail"*/'../views/CategoryDetail.vue'),
    meta: {
      title: '分类详情'
    }
  },
  {
    path: '/order/:orderNo',
    name: 'Order',
    // component: Order
    // component: resolve => require(['../views/Order.vue'], resolve)
    // component: () => import('../views/Order.vue'),
    component: () => import(/* webpackChunkName: "group-Order"*/'../views/Order.vue'),
    meta: {
      title: '订单'
    }
  },
  {
    path: '/myOrder',
    name: 'MyOrder',
    // component: MyOrder
    // component: resolve => require(['../views/MyOrder.vue'], resolve)
    // component: () => import('../views/MyOrder.vue'),
    component: () => import(/* webpackChunkName: "group-MyOrder"*/'../views/MyOrder.vue'),
    meta: {
      title: '我的订单'
    }

  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// to 点击路由之后去哪  from 路由从哪来 next 一定要写 不写不会跳转
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router

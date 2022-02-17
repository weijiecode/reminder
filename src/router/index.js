import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/home'
import Login from '../pages/login'
import Backlog from '../pages/backlog'
import Mycenter from '../pages/mycenter'


Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/backlog',
        component: Backlog
      }, {
        path: '/mycenter',
        component: Mycenter
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from代表哪个路径跳转过来的
  // next是一个函数表示放行
  // next（）放行 next（'/logn'）强制跳转
  if (to.path === '/login') return next();
  const tokenStr = localStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})


export default router

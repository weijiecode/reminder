import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home'
import Backlog from '../pages/Backlog'
import Login from '../pages/Login'
import Mycenter from '../pages/Mycenter'
import View from '../pages/View'
import Dailyclock from '../pages/Dailyclock'
import Statistics from '../pages/Statistics'
//导入进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'


Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [{
      path: '/backlog',
      component: Backlog
    },{
      path: '/mycenter',
      component: Mycenter
    },{
      path: '/view',
      component: View
    },{
      path: '/dailyclock',
      component: Dailyclock
    },{
      path: '/statistics',
      component: Statistics
    }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    redirect: '/login'
  }
]

const router = new VueRouter({
  routes
})

// 防止重复点击相同路由导致报错
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}


// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from代表哪个路径跳转过来的
  // next是一个函数表示放行
  // next（）放行 next（'/logn'）强制跳转
  if (to.path === '/login') return next();
  const tokenStr = localStorage.getItem('token')
  if (!tokenStr) return next('/login')
  // 进度条
  NProgress.start()
  next()
})
router.afterEach(() => {
  NProgress.done()
})


export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home'
import Backlog from '../pages/Backlog'
import Login from '../pages/Login'
import Mycenter from '../pages/Mycenter'
import View from '../pages/View'
import Dailyclock from '../pages/Dailyclock'
import Statistics from '../pages/Statistics'
import Agreement from '../pages/Agreement'
import Private from '../pages/Private'
//导入进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'


Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta:{
      title: '首页'
  }
  },
  {
    path: '/backlog',
    name: 'Backlog',
    component: Backlog,
    meta:{
      title: '我的任务'
  }
  },
  {
    path: '/mycenter',
    name: 'Mycenter',
    component: Mycenter,
    meta:{
      title: '个人中心'
  }
  },
  {
    path: '/view',
    name: 'View',
    component: View,
    meta:{
      title: '日历视图'
  }
  },
  {
    path: '/dailyclock',
    name: 'Dailyclock',
    component: Dailyclock,
    meta:{
      title: '每日打卡'
  }
  },
  {
    path: '/statistics',
    name: 'Statistics',
    component: Statistics,
    meta:{
      title: '统计分析'
  }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta:{
      title: '登录'
  }
  },
  {
    path: '/',
    redirect: '/login',
    meta:{
      title: '登录'
  }
  },
  {
    path: '/agreement',
    name: 'Agreement',
    component: Agreement,
    meta:{
      title: '用户协议'
  }
  },
  {
    path: '/private',
    name: 'Private',
    component: Private,
    meta:{
      title: '隐私政策'
  }
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

  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (to.path === '/login') return next();
  if (to.path === '/agreement') return next();
  if (to.path === '/private') return next();
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

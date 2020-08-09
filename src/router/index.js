import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'

Vue.use(VueRouter)

const routes = [
  // 重定向到login
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/home', component: Home }

]

const router = new VueRouter({
  routes
})

// 挂在路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转过来
  // next() 放行 next('/login') 强制跳转
  if (to.path === '/login') {
    return next()
  }
  // 获取token
  const tokeStr = window.sessionStorage.getItem('token')
  if (!tokeStr) {
    return next('login')
  } else {
    return next()
  }
})

export default router

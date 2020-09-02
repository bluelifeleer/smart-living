import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Home from '../views/Home.vue'
import Notes from '../views/Notes.vue'
import Location from '../views/Location.vue'
import Login from '../views/Login.vue'
import AreaCode from '../views/Areacode.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Index',
    component: Index,
    children: [{
      path: '',
      name: 'Home',
      component: Home,
      meta: {
        title: '打卡'
      }
    }, {
      path: 'home',
      name: 'Home',
      component: Home,
      meta: {
        title: '打卡'
      }
    }, {
      path: 'notes',
      name: 'Notes',
      component: Notes,
      meta: {
        title: '打卡统计'
      }
    }, {
      path: 'location',
      name: 'Location',
      component: Location,
      props: (route) => ({
        type: route.query.type,
        id: route.query.id
      }),
      meta: {
        title: '打卡详情'
      }
    }]
  }, {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '登录'
    }
  }, {
    path: '/areacode',
    name: 'AreaCode',
    component: AreaCode,
    meta: {
      title: '选择区号'
    }
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
});

export default router

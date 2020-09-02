import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Home from '../views/Home.vue'
import Notes from '../views/Notes.vue'
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
    }, {
      path: 'home',
      name: 'Home',
      component: Home,
    }, {
      path: 'notes',
      name: 'Notes',
      component: Notes,
    }]
  }, {
    path: '/login',
    name: 'Login',
    component: Login
  }, {
    path: '/areacode',
    name: 'AreaCode',
    component: AreaCode
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

export default router

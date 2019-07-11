import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/',component: Home},
    {path: '/signup',component: SignUp},
    {path: '/user/:id',component: UserProfile},
    {path: '/parks',component: Parks},
  ]
})

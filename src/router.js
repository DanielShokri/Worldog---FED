import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import SignUp from './views/SignUp.vue'
import UsersFeed from './views/UsersFeed.vue'
import UserProfile from './views/UserProfile.vue'
import Parks from './views/Parks.vue'
import ParkDetails from './views/ParkDetails.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/',component: Home},
    {path: '/signup',component: SignUp},
    {path: '/user',component: UsersFeed},
    {path: '/user/:id',component: UserProfile},
    {path: '/park',component: Parks},
    {path: '/park/:id',component: ParkDetails},
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import SignUp from './views/Signup.vue'
import UsersFeed from './views/UsersFeed.vue'
import UserProfile from './views/UserProfile.vue'
import ParkDetails from './views/ParkDetails.vue'
import usersMap from './components/UsersListMap.cmp.vue'

Vue.use(Router)

export default new Router({
    routes: [
        { path: '/', component: Home },
        { path: '/signup', component: SignUp },
        { path: '/user', component: UsersFeed },
        { path: '/user/:id', component: UserProfile },
        { path: '/park/:id', component: ParkDetails },
        { path: '/map', component: usersMap },
    ]
})
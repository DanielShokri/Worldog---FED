import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './filters'

import './registerServiceWorker'
import * as VueGoogleMaps from 'vue2-google-maps';

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
Vue.use(Buefy)


import Vuetify from 'vuetify'
Vue.use(Vuetify)
import 'vuetify/dist/vuetify.min.css' 
import '@mdi/font/css/materialdesignicons.css'


Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyCrVxVPta_TOsFatlYL7vOx_stAJNlV8ws',
        libraries: 'places'
    }
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
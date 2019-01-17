import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAnalytics from 'vue-analytics'

Vue.use(VueAnalytics, {
    id:'UA-6098550-23',
    router
})

new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App)
})

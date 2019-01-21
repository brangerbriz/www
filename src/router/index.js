import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'
import HomePage from '../components/views/HomePage.vue'
import ListPage from '../components/views/ListPage.vue'
import SubPage from '../components/views/SubPage.vue'

Vue.use(Router)
Vue.use(Meta)

export default new Router({
    mode: 'history',
    routes: [
        { path:'/', component:HomePage },
        { path:'/search', component:ListPage },
        { path:'/portfolio', component:ListPage },
        { path:'/blog', component:ListPage },
        { path:'/search/:filter', component:ListPage },
        { path:'/portfolio/:slug', component:SubPage, props:true  },
        { path:'/blog/:slug', component:SubPage, props:true  }
    ],
    scrollBehavior() {
        return { x: 0, y: 0 }
    }
})

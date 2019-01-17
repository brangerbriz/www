import Vue from 'vue'
import Vuex from 'vuex'
import bbapi from './bbapi.js'
import organizeCMSdata from './organizeCMSdata.js'
import createSearch from './search.js'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: true,
    state: {
        loadingStatus:'not-ready',
        // all:[], // both blog + work posts
        blog:[], // all blog posts
        work:[], // all portfolio posts
        filtered:[], // list of filtered posts for list-page
        post:null, // current post for sub-page (blog/work item)
        featuredWork:[], // featured work for home-page
        featuredTags:[], // featured tags for home-page
        tagDescriptions:{}, // tags that also have special descriptions
        search:{} // search dictionary for quick lookup
    },
    getters: {
        allPosts(state){
            let all = [...state.blog,...state.work]
            return all.sort(function(a,b){return b.year - a.year})
        },
        currentPost(state){
            return (type, slug) => {
                // return state.all.find(p=>p.slug==slug) // TODO try this
                let found = null
                for (let idx in state[type]) {
                    if(state[type][idx].slug == slug){
                        found = state[type][idx]
                        break
                    }
                }
                return found
            }
        }
    },
    mutations: {
        setLoadingStatus(state, payload){
            state.loadingStatus = payload
        },
        updatePosts(state, cmsData){
            state.work = cmsData.work
            state.blog = cmsData.blog
        },
        updateFeaturedWork(state, cmsData){
            cmsData.work.forEach(work=>{
                if(work.featured) state.featuredWork.push(work)
            })
        },
        updateFeaturedTags(state, cmsData){
            state.featuredTags = Object.keys(cmsData.featuredTags)
            for( let tag in cmsData.featuredTags ){
                if( cmsData.featuredTags[tag] ){
                    state.tagDescriptions[tag] = cmsData.featuredTags[tag]
                }
            }
        },
        updateSearch(state){
            state.search = createSearch( state.work, state.blog )
        }
    },
    actions: {
        hydrateState({commit}, data){
            let cms = organizeCMSdata(data)
            commit('updatePosts',cms)
            commit('updateFeaturedWork',cms)
            commit('updateFeaturedTags',cms)
            commit('updateSearch')
        },
        fetchData({commit, dispatch}){
            commit('setLoadingStatus','loading')

            fetch( bbapi.endpoints[2] )
            .then( res => res.json() )
            .then( data => {
                dispatch('hydrateState',data)
                commit('setLoadingStatus','ready')
            })
            .catch( err => { console.error(err) })
        }
    }
})

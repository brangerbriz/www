import bbapi from './bbapi.js'
import organizeCMSdata from './organizeCMSdata.js'

export default {
  hydrateState ({ commit }, data) {
    let cms = organizeCMSdata(data)
    commit('updatePosts', cms)
    commit('updateFeaturedWork', cms)
    commit('updateFeaturedTags', cms)
    commit('updateSearch')
  },
  fetchData ({ commit, dispatch }) {
    commit('setLoadingStatus', 'loading')

    window.fetch(bbapi.endpoints[2])
      .then(res => res.json())
      .then(data => {
        dispatch('hydrateState', data)
        commit('setLoadingStatus', 'ready')
      })
      .catch(err => console.error(err))
  }
}

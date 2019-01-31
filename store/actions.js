import axios from 'axios'
import bbapi from './bbapi.js'
import organizeCMSdata from './organizeCMSdata.js'

export default {
  nuxtServerInit ({ commit }, { req }) {
    return axios.get(bbapi.endpoints[2])
      .then(function (res) {
        // there seems to be a space character at the start of the res.data
        // either our API is returning JSON with a space at the start
        // or axios is adding a space to it's data payload.
        // in either case, we need to remove that space so that it parses
        let str = res.data.substr(1) // BUG FIX; ISSUE ABOVE
        let data = JSON.parse(str)
        let cms = organizeCMSdata(data)
        commit('updatePosts', cms)
        commit('updateFeaturedWork', cms)
        commit('updateFeaturedTags', cms)
        commit('updateSearch')
        commit('setLoadingStatus', 'ready')
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}

import createSearch from './search.js'

export default {
  setLoadingStatus (state, payload) {
    state.loadingStatus = payload
  },
  updateFiltered (state, payload) {
    state.filtered = payload
  },
  updatePosts (state, cmsData) {
    state.work = cmsData.work
    state.blog = cmsData.blog
  },
  updateFeaturedWork (state, cmsData) {
    cmsData.work.forEach(work => {
      if (work.featured) state.featuredWork.push(work)
    })
  },
  updateFeaturedTags (state, cmsData) {
    state.featuredTags = Object.keys(cmsData.featuredTags)
    for (let tag in cmsData.featuredTags) {
      if (cmsData.featuredTags[tag]) {
        state.tagDescriptions[tag] = cmsData.featuredTags[tag]
      }
    }
  },
  updateSearch (state) {
    state.search = createSearch(state.work, state.blog)
  }
}

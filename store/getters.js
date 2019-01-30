export default {
  isLoading (state) {
    return state.loadingStatus !== 'ready'
  },
  allPosts (state) {
    let all = [...state.blog, ...state.work]
    return all.sort(function (a, b) {
      return b.year - a.year
    })
  },
  currentPost (state) {
    return (slug) => {
      return [...state.blog, ...state.work].find(p => p.slug === slug)
    }
  }
}

export default {
  isLoading (state) {
    return state.loadingStatus !== 'ready'
  },
  allPosts (state) {
    let orderedWork = [...state.work].sort((a, b) => b.year - a.year)
    let orderedBlog = [...state.blog].sort((a, b) => b.year - a.year)
    return [...orderedWork, ...orderedBlog]
  },
  currentPost (state) {
    return (slug) => {
      return [...state.blog, ...state.work].find(p => p.slug === slug)
    }
  }
}

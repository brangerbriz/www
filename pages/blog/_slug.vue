<template>
  <section>
    <section id="logo" href="false" data-mark-only="mobile"
      @click="$router.push('/')" style="cursor:pointer"></section>

    <h1>{{ getPost().title }}</h1>

    <h3 @click="authClick" class="b-author">{{ getPost().author }}</h3>

    <div class="date">{{ formatedDate() }}</div>

    <section class="content_sec" v-html="getPost().content"></section>

    <p><i>Have some thoughts to share? Join the public conversation about this post on <a :href="getPost().tweet" target="_blank">Twitter</a>, or send us@brangerbriz.com an email, we'd love to hear what you think!</i></p>

    <span class="tags">
      <a v-for="t in getPost().tags"  :key="t"
        @click="$router.push(`/search?tags=${t.toLowerCase()}`)">{{t}}</a>
    </span>
  </section>
</template>

<script>
import BBElements from 'BBElements'

export default {
  head () {
    let t = this.getPost().title
    let s = this.getPost().summary
    let i = 'https:'+this.getPost().socialImg
    let u = 'https://brangerbriz.com/portfolio/' + this.getPost().slug
    return {
      title: t,
      meta: [
        { hid: 'description', name: 'description', content: s },
        { hid: 'og:title', property: 'og:title', content: t },
        { hid: 'og:description', property: 'og:description', content: s },
        { hid: 'og:image', property: 'og:image', content: i },
        { hid: 'og:url', property: 'og:url', content: u }
      ]
    }
  },
  mounted () {
    document.body.style.background = '#fff'
    BBElements()
  },
  computed: {
    slug () { return this.$route.params.slug }
  },
  methods: {
    getPost () {
      return this.$store.getters.currentPost(this.slug)
    },
    formatedDate () {
      let d = new Date(this.getPost().date)
      let m = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ]
      return m[d.getMonth()] + ' ' +
        d.getDate() + ', ' +
        d.getFullYear()
    },
    authClick () {
      let str = this.getPost().author.toLowerCase().replace('by', '')
      let arr = str.split(' ')
      if (arr[0] === '') arr.shift()
      this.$router.push(`/search?filter=${arr[0]}`)
    }
  }
}
</script>

<style scoped>
.b-author { cursor: pointer; }

@keyframes post-info-in {
  0% { opacity:0; transform:translateY(30px); }
  25% { opacity:0; transform:translateY(30px); }
  70% { transform:translateY(0px); }
  100% { opacity:1; }
}
</style>

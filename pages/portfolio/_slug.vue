<template>
  <section class="case-study" :style="{backgroundImage:getBGImg()}">
    <section v-if="getPost().headerImg!==''" data-text-color="#ffffff"
        @click="$router.push('/')" id="logo"
        href="false" data-mark-only="mobile"></section>
    <section v-else @click="$router.push('/')" id="logo"
        href="false" data-mark-only="mobile"></section>

    <section class="work-post" :style="{marginTop:caseStudyMargin}">
      <h1 style="margin-top:50px">{{ getPost().title }}</h1>
      <span class="post_subtitle">{{ getPost().subTitle }}</span>

      <section class="post_stats">
        <span class="post_stats_row" v-for="(s,i) in stats()"
          :style="{borderBottom:border(i,stats.length)}">
          <span>{{ s.name }}</span>
          <span>
            <a v-if="s.name=='url'" :href="s.data" target="_blank">
              {{ s.data }}</a>
            <span v-else>{{ s.data }}</span>
        </span>
        </span>
      </section>

      <section class="content_sec" v-html="getPost().content"></section>

      <span class="tags">
        <a v-for="t in getPost().tags" :key="t"
          @click="$router.push(`/portfolio?tags=${t.toLowerCase()}`)">{{t}}</a>
      </span>
    </section>
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
  data () {
    return {
      caseStudyMargin: 0 // top margin to reveal case-study header images
    }
  },
  computed: {
    slug () { return this.$route.params.slug }
  },
  mounted () {
    document.body.style.background = '#fff'
    BBElements()
    this.getMargin()
  },
  methods: {
    getPost () {
      return this.$store.getters.currentPost(this.slug)
    },
    border (i, length) {
      return (i === length - 1) ? 'none' : '1px solid #000'
    },
    stats () {
      let stats = []
      let categories = [
        'year', 'url', 'services', 'recognition', 'results', 'clients'
      ]
      categories.forEach(cat => {
        if (this.getPost()[cat] !== '') {
          stats.push({
            name: cat,
            data: this.getPost()[cat]
          })
        }
      })
      return stats
    },
    getBGImg () {
      if (this.getPost().headerImg !== '') {
        return `url(https:${this.getPost().headerImg})`
      }
    },
    calcBGImgHeight (callback) {
      let img = new window.Image()
      img.onload = function () {
        let scaledHeight = img.height * (window.innerWidth / img.width)
        callback(scaledHeight)
      }
      img.src = `https:${this.getPost().headerImg}`
    },
    getMargin () {
      let post = this.$store.getters.currentPost(this.slug)
      if (post && post.headerImg !== '') {
        if (window.innerWidth < 767) {
          this.calcBGImgHeight(h => {
            let l = 85 // logo
            let d = window.innerHeight - 200
            this.caseStudyMargin = (h > d) ? d - l + 'px' : h - l + 'px'
          })
        } else this.caseStudyMargin = `${window.innerHeight - 275}px`
      } else this.caseStudyMargin = 'none'
    }
  }
}
</script>

<style scoped>
.case-study {
  /* background-img is dynamic */
  background-attachment:fixed;
  background-size:cover;
  background-position:center;
  background-repeat:no-repeat;
}
@media (max-width: 767px) {
  .case-study { background-position-y:0px; background-size:100%; }
}

.work-post {
  background-color: #fff;
  padding-top:1px;
  transition: margin-top 0.75s ease-out;
}

.post_subtitle {
  font-family:"BB_thin"; color:#000;
  font-size: 25px; line-height: 30px;
  display:block; width:100%; max-width:700px;
  margin: -48px auto 0px auto;
  padding-bottom:30px; padding-left:120px;
  animation: post-info-in 2s;
}
@media (max-width: 1280px) { .post_subtitle { max-width:710px; } }
@media (max-width: 1023px) { .post_subtitle { max-width:530px; padding-left:0px; } }
@media (max-width: 767px) { .post_subtitle { max-width:90%; } }

.post_stats {
  width:100%; max-width:710px;
  margin:0px auto 14px auto;
}
@media (max-width: 1023px) { .post_stats { max-width:530px; } }
@media (max-width: 767px) { .post_stats { max-width:90%; } }

.post_stats_row {
  display:grid;
  grid-template-columns: 1fr 3fr;
  grid-column-gap: 20px;
  /*border-bottom:1px solid #000;*/
  font-family: "BB_copy", sans-serif;
  font-size:16px; color:#000;
  line-height:24px; letter-spacing:1px;
  margin-bottom:14px; padding-bottom:9px;
}
@media (max-width: 767px) {
  .post_stats_row {
    font-size:12px; line-height:19px;
    margin-bottom:12px; padding-bottom:8px;
  }
}
</style>

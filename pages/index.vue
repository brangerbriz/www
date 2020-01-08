<template>
  <section>
    <section id="slogan" ref="slogan">
      <img src="~/assets/logo_white.svg" alt="branger_briz">
      <span ref="scopy">
          we make your digital <br>
          ideas <span class="pink" ref="phrase">worth sharing</span>
      </span>
      <svg ref="arrow" class="arrow" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve" fill="#fff"><path d="M23.092,44.335l26.586,12.69c0.012,0.006,0.025,0.004,0.037,0.01c0.051,0.021,0.102,0.027,0.152,0.037  c0.045,0.008,0.088,0.02,0.131,0.02c0.047,0,0.092-0.012,0.141-0.02c0.049-0.01,0.1-0.02,0.146-0.037  c0.012-0.006,0.025-0.004,0.039-0.01l26.584-12.69c0.374-0.18,0.532-0.626,0.354-1c-0.129-0.27-0.397-0.428-0.678-0.428  c-0.107,0-0.218,0.023-0.322,0.074L50,55.518L23.738,42.982c-0.105-0.049-0.215-0.072-0.322-0.072c-0.279,0-0.549,0.156-0.678,0.427  C22.561,43.709,22.717,44.156,23.092,44.335z"></path></svg>
    </section>

    <section id="splash" ref="splash">
      <video autoplay muted loop poster="/reel.png">
        <source src="~/assets/video-reel/reel.mp4" type="video/mp4">
        <source src="~/assets/video-reel/reel.ogv" type="video/ogg">
      </video>
    </section>

    <section id="statement">
      <section class="copy">
        <span class="hide"></span>

        <span>we're a digital agency + lab made up of developers, strategists, designers, artists and educators. we create software products and experiences for brands, startups, agencies, and cultural institutions around the world</span>
        <span></span>
        <span class="hide"></span>
        <span></span>
        <span>we turn insights into strategy,
        strategy into design and design into innovative
        multi-platform experiences.</span>

      </section>
    </section>

    <section id="services">
      <section>
        <h2>services</h2>
        <span>
          <h4 @click="goToService($event)">startup gestation</h4>
          guidance & consulting<br>
          research<br>
          prototyping<br>
          spec development<br>
        </span>
        <span>
          <h4 @click="goToService($event)">platform development</h4>
          wire-framing<br>
          ux/ui design<br>
          system integrations<br>
          architecture<br>
          desktop & mobile dev<br>
          support & management<br>
        </span>
        <span>
          <h4 @click="goToService($event)">experiential interactive </h4>
          research & development<br>
          creative ideation<br>
          emerging technologies (AI, VR, AR, etc)<br>
          prototyping<br>
          digital installations<br>
          integration & deployment<br>
        </span>
      </section>
    </section>

    <section id="lab">
      <section>
        <span></span>
        <h2>digital<br>r+d<br>lab</h2>
        <span class="lab-copy">
          our dedicated research &amp; development lab is a major part of our process - helping to ensure we produce work for clients that is cutting-edge + contributes to the broader digital landscape. the lab also creates experimental work that provides context + perspective on the misunderstood aspects of the digital ecosystem. if you're interested in diving a little deeper, <a href="http://labs.brangerbriz.com/">check out our r&amp;d lab page</a>.
        </span>
        <span></span>
      </section>
    </section>

    <section id="work">
      <section>
        <h2>work</h2>
        <section v-for="(o,i) in $store.state.featuredTags">
            <router-link  :key="i" class="tag-link" :to="filterURL(o)">
            {{o}}</router-link>
        </section>
      </section>
      <section v-for="(p,i) in $store.state.featuredWork">
        <WorkSummary
            :short="false"
            :meta="p"
            :key="p.slug"
            :animIndex="i"
            @titleClick="goToPost"/>
      </section>
    </section>

    <section>
      <span class="more-projects" @click="goToPost()">more projects</span>
    </section>

    <section id="clients">
      <span>a few of the clients we are proud to have worked with</span>
      <section>
        <img src="~/assets/clients/goya.svg" alt="goya">
        <img src="~/assets/clients/tampico.svg" alt="tampico">
        <img src="~/assets/clients/espn.svg" alt="espn">
        <img src="~/assets/clients/baptist_health_south_florida.svg" alt="baptist health">
        <img src="~/assets/clients/patagonia.svg" alt="patagonia">

        <img src="~/assets/clients/mozilla.svg" alt="mozilla">
        <img src="~/assets/clients/burger_king.svg" alt="burger king">
        <img src="~/assets/clients/verizon.svg" alt="verizon">
        <img src="~/assets/clients/weather_channel.svg" alt="the weather channel">
        <img src="~/assets/clients/medtronic.svg" alt="medtronic">

        <img src="~/assets/clients/warner.svg" alt="warner music group">
        <img src="~/assets/clients/cartier.svg" alt="cartier">
        <img src="~/assets/clients/mca-chicago.svg" alt="museum of contemporary art chicago">
        <img src="~/assets/clients/mcm.svg" alt="miami children's museum">
        <img src="~/assets/clients/pamm.svg" alt="perez art museum miami">
      </section>
    </section>
  </section>
</template>

<script>
import WorkSummary from '~/components/WorkSummary.vue'

export default {
  components: { WorkSummary },
  data () {
    return {
      idx: 1,
      nxt: 0,
      wrd: ['better', 'accessible', 'beautiful', 'smarter',
        'valuable', 'informed', 'worth sharing', 'real',
        'better', 'accessible', 'beautiful', 'smarter',
        'valuable', 'informed', 'worth sharing', 'real'
      ]
    }
  },
  mounted () {
    this.calcSplashHeight()
    this.calcSloganSizes()
    this.updateSlogan()
    this.calcPageBG()
    this.calcArrow()

    document.addEventListener('scroll', (e) => {
      if (this.$route.path === '/') {
        this.calcPageBG()
        this.calcVidOpacity()
        this.calcSloganSizes()
        this.calcArrow()
      }
    })

    window.addEventListener('resize', (e) => {
      if (this.$route.path === '/') {
        this.calcSplashHeight()
        this.calcSloganSizes()
        this.calcPageBG()
        this.calcArrow()
      }
    })
  },
  methods: {
    calcVidOpacity () {
      if (this.$route.path === '/' && this.$refs.splash) {
        let video = this.$refs.splash.querySelector('video')
        let offY = window.innerHeight - window.scrollY
        video.style.opacity = offY / (window.innerHeight * 2)
      }
    },
    calcPageBG () {
      let splashHeight = parseInt(this.$refs.splash.style.height)
      if (window.scrollY > splashHeight) document.body.style.background = '#fff'
      else document.body.style.background = '#000'
    },
    calcSplashHeight () {
      let height = window.innerWidth / (960 / 540)
      if (window.innerHeight > height) {
        this.$refs.splash.style.height = height + 'px'
      } else {
        this.$refs.splash.style.height = window.innerHeight + 'px'
      }
    },
    sloganTransition () {
      if (this.$route.path === '/' && this.$refs.phrase) {
        this.$refs.phrase.textContent = this.wrd[this.idx]
        this.idx++
        if (this.idx >= this.wrd.length) this.idx = 0
        if (this.idx === this.nxt) {
          this.$refs.phrase.textContent = this.wrd[this.nxt]
          this.nxt++
          if (this.nxt >= this.wrd.length) this.nxt = 0
          this.idx = this.nxt + 1
        } else {
          setTimeout(this.sloganTransition, 1000 / 18)
        }
      }
    },
    updateSlogan () {
      if (this.$route.path === '/') {
        setTimeout(this.updateSlogan, Math.random() * 2500 + 2000)
      }
      this.sloganTransition()
    },
    calcArrow () {
      if (this.$refs.arrow) {
        let l = window.innerWidth / 2 - window.innerWidth * 0.3 / 2
        let t = window.innerHeight / 2.36
        this.$refs.arrow.style.top = t + 'px'
        this.$refs.arrow.style.left = l + 'px'
        if (window.innerHeight / window.scrollY < 3.8) {
          this.$refs.arrow.style.display = 'none'
        }
      }
    },
    calcSloganSizes () {
      if (this.$refs.slogan && this.$refs.phrase && this.$refs.scopy) {
        let fs, mid
        let height = window.innerWidth / (960 / 540)
        if (window.innerHeight > height) fs = window.innerWidth * 0.06
        else fs = window.innerWidth * 0.042
        this.$refs.slogan.style.fontSize = fs + 'px'
        this.$refs.slogan.style.lineHeight = fs / 0.79 + 'px'
        this.$refs.phrase.style.padding = `${fs / 5.04}px ${fs / 6.2}px 0 ${fs / 6.2}px`
        this.$refs.scopy.style.marginTop = `${fs / -2.52}px`
        if (window.innerHeight > height) {
          mid = height / 2 - this.$refs.slogan.offsetHeight / 2
        } else {
          mid = window.innerHeight / 2 - this.$refs.slogan.offsetHeight / 2
        }
        this.$refs.slogan.style.top = mid + window.scrollY / 2 + 'px'
      }
    },
    // ---------------------------------------------------------------------
    // -------------------------------------------------- link/tag methods
    goToPost (post) {
      if (post) this.$router.push('/portfolio/' + post.slug)
      else this.$router.push('/portfolio')
    },
    goToService (e) {
      /*
          // NOTE disabled until we address the following issue:
          // https://github.com/brangerbriz/www/issues/18
          let text = e.target.textContent
          this.$router.push('/search?tags='+e.target.textContent)
      */
    },
    filterURL (tag) {
      return `/portfolio?tags=${tag.toLowerCase()}`
    }
  }
}
</script>

<style scoped>

#slogan {
  font-family: "BB_title", sans-serif; color:#fff; line-height:102px;
  position:absolute; z-index:2; left:5%;
}
#slogan > span { display:block; margin:-32px 0px 0px 55px; }
#slogan .pink {
  color:#fff; background-color:#e40477; padding: 16px 13px 0px 13px;
}

@keyframes arrow-up{
  0% { opacity:0; transform:translateY(-30px); }
  25% { opacity:0; transform:translateY(-30px); }
  70% { transform:translateY(0px); }
  100% { opacity:1; }
}
.arrow { position:absolute; bottom:20px; width:30%; animation:arrow-up 2s; }
@media (max-width: 767px) { .arrow { display:none; } }


#splash {}
#splash video {
  position:fixed; top:0; left:0; z-index:-1;
  width:100%; opacity:0.5;
}


#statement {
  font-family:"BB_copy"; font-size:20px; line-height:30px; color:#5f5f5f;
  background-color: #fff;
  position: relative; z-index: 3;
}
#statement .copy {
  width:100%; max-width:1280px; margin:0 auto; padding:110px 0px;
  display:grid; grid-template-columns:2fr 3fr 4fr; grid-row-gap:30px;
}

@media (max-width: 1280px) {
  #statement .copy > .hide { display:none; }
  #statement .copy { grid-template-columns:3fr 4fr; width:90%; }
}

@media (max-width: 767px) {
  #statement { font-size:18px; line-height:31px; }
  #statement .copy { display:block; }
}


/* .~'~._.~'~._.~'~._.~'~._.~'~._.~'~._.~'~._.~'~._.~'~._.~'~._.~'~._.~'~ */
/* .~'~._.~'~._.~'~._.~'~._. home-page-services ~._.~'~._.~'~._.~'~._.~'~ */
/* .~'~._.~'~._.~'~._.~'~._.~'~._.~'~._.~'~._.~'~._.~'~._.~'~._.~'~._.~'~ */

#services {
  background-color: #f0f1f1;
  font-family: "BB_copy", sans-serif;
  color:#5f5f5f; font-size:16px; line-height:26px;
}

#services > section {
  width:100%; max-width:1280px; margin:0 auto; padding:80px 0px 10px 0px;
  display:grid; grid-template-columns:2fr 2fr 2fr 2fr 1fr; grid-row-gap:80px;
}

#services h2 {
  margin:-7px 0 0 0; color:#e40477; font-size:45px;  letter-spacing:-3px;
  grid-area: 1 / 1 / 4 / 1;
}

#services h4 {
  font-family:"BB_copy", sans-serif; font-size:24px;
  color:#5f5f5f; font-weight: normal;
  margin:0px 0px 12px 0px;
}

/* NOTE hover disabled until we address the following issue: */
/* https://github.com/brangerbriz/www/issues/18 */
/* #services h4:hover { color:#e40477; cursor:pointer; } */

@media (max-width: 1280px) {
  #services > section {
    padding:80px 20px 10px 20px;
    box-sizing:border-box; grid-column-gap:20px;
  }
}
@media (max-width: 1023px) {
  #services > section {
    padding:80px 20px 80px 20px;
    grid-template-columns: 2fr 2fr 2fr;
  }
  #services .break { display:none; }
}
@media (max-width: 767px) {
  #services > section {
    padding:80px 20px 80px 20px;
    display:block; width:90%; margin:0 auto;
  }
  #services > section > * { display:block; margin-bottom:30px; }
}


/* .~'~._.~'~._.~'~._.~'~._.~'~._.~'~._.~'~._.~'~._.~'~._.~'~._.~'~._.~'~ */
/* .~'~._.~'~._.~'~._.~'~._. home-page-lab ._.~'~._.~'~._.~'~._.~'~._.~'~ */
/* .~'~._.~'~._.~'~._.~'~._.~'~._.~'~._.~'~._.~'~._.~'~._.~'~._.~'~._.~'~ */

#lab {
  background-image: url(~assets/table.jpg);
  background-attachment:fixed;
  background-size:cover;
  background-position:center;
  background-repeat:no-repeat;
}

#lab h2 { align-self:start; margin:0px; }

.lab-copy {
  font-family: "BB_copy", sans-serif;
  font-size:20px; line-height:30px; color:#5f5f5f;
  max-width:510px; padding-left:40px;
}

#lab > section {
  width:100%; max-width:1280px; margin:0 auto; padding:250px 0px;
  display:grid; grid-template-columns:2fr 1fr 4fr 2fr;
}

@media (max-width: 767px) {
  #lab > section { display:block; width:90%; margin:0 auto; }
  .lab-copy { display:block; padding-left:113px; }
}

@media (max-width: 320px) {
  #lab > section { display:block; width:90%; margin:0 auto; }
  .lab-copy { display:block; padding-left:0px; }
}

/* .~'~._.~'~._.~'~._.~'~._.~'~._.~'~._.~'~._.~'~._.~'~._.~'~._.~'~._.~'~ */
/* .~'~._.~'~._.~'~._.~'~._. home-page-work _.~'~._.~'~._.~'~._.~'~._.~'~ */
/* .~'~._.~'~._.~'~._.~'~._.~'~._.~'~._.~'~._.~'~._.~'~._.~'~._.~'~._.~'~ */

#work {
  width:100%; max-width:1280px; margin:80px auto 10px auto;
  display:grid; grid-template-columns: 2fr 7fr;
}

#work h2 {
  margin:0px 0px 45px 0px;
  color:#e40477; font-size:45px; letter-spacing:-3px;
}

#work > section:nth-child(1) { grid-area: 1 / 1 / 9 / 1; }

#work > section:nth-child(2) { margin-top:86px; }

.more-projects {
  width:250px; display:block; margin:0 auto 80px auto; padding:15px;
  font-family:'BB_copy', sans-serif; font-weight:bold; color:#5f5f5f;
  background-color:#ebfcff; text-align:center; cursor:pointer;
}
.more-projects:hover { color:#fff; background-color:#e40477; }

@media (max-width: 1280px) {
  #work { padding-left:10px; box-sizing: border-box; }
}
@media (max-width: 767px) {
  #work { display:block; padding-left:0px; }
  #work > section:nth-child(1) { width:90%; margin:0 auto; }
  #work > section:nth-child(1) > section { display:none; }
}

/* .~'~._.~'~._.~'~._.~'~._.~'~._.~'~._.~'~._.~'~._.~'~._.~'~._.~'~._.~'~ */
/* .~'~._.~'~._.~'~._.~'~._ home-page-clients ~'~._.~'~._.~'~._.~'~._.~'~ */
/* .~'~._.~'~._.~'~._.~'~._.~'~._.~'~._.~'~._.~'~._.~'~._.~'~._.~'~._.~'~ */

#clients {
  font-family:"BB_copy"; font-size:20px; line-height:30px; color:#000;
  background: linear-gradient(to bottom, #f0f1f1, #ffffff);
}

#clients span {
  text-align:center; display:block; width:100%; padding:50px 0px;
}

#clients section {
  width:100%; max-width:1280px; margin:20px auto 130px auto;
  display:grid; grid-column-gap:50px; grid-row-gap:80px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  justify-content:center; align-items:center;
}

#clients section img {
  display:inline-block; margin:0 auto;
  width:160px; max-width:100%; height:120px; max-height:100%;
}

@media (max-width: 1280px) {
  #clients section { padding:0px 50px; box-sizing:border-box; }
}

@media (max-width: 767px) {
  #clients section {
    grid-template-columns:1fr 1fr 1fr; grid-row-gap:50px;
  }
  #clients span { padding:50px 30px; }
  #clients section img { max-height:120px; height:auto;}
}

@media (max-width: 320px) {
  #clients section { grid-template-columns:1fr 1fr; }
  #clients span { padding:50px 30px; }
  #clients section img { max-height:120px; height:auto;}
}
</style>

<template>
  <section class="bbmenu">

    <section ref="menuburger" @click="mbClick">
      <span :style="{background:color}"></span>
      <span :style="{background:color}"></span>
      <span :style="{background:color}"></span>
      <span :style="{background:color}"></span>
    </section>

    <transition name="menu-toggle"
      @after-enter="postOpen=true" @after-leave="postOpen=false">
      <section v-if="open">
        <transition-group name="item-toggle" ref="mainmenu" :css="false"
          @before-enter="beforeItemEnter" @enter="enterItem">
          <span v-for="(o,i) in links"
            v-if="postOpen"
            class="link"
            :key="'mi'+i"
            :data-index="i"
            @click="itemClick(o)">{{o.text}}</span>
        </transition-group>
      </section>
    </transition>

  </section>
</template>

<script>
import Vue from 'vue'

export default {
  data () {
    return {
      open: false,
      postOpen: false,
      color: '#000',
      links: [
        { text: 'Home', path: '/', sec: 'section#splash' },
        // { text: 'Services', path: '/', sec: ' sect ion#services' },
        { text: 'Work', path: '/portfolio' },
        // { text: 'About', path: '/', sec: ' sect ion#statement' },
        { text: 'Blog', path: '/blog' },
        { text: 'R+D', path: 'http://labs.brangerbriz.com/', sec: ' sect ion#lab' },
        { text: 'Contact', path: '/', sec: 'section#contact' }
      ],
      slugArr: null
    }
  },
  mounted () {
    // create an array of all portfolio items w/header image
    let slugs = this.$store.state.work
      .filter(w => w.headerImg !== '')
      .map(w => '/portfolio/' + w.slug)

    if (slugs.includes(this.$route.path) || this.$route.path === '/') {
      this.color = '#fff'
    }

    // if we're on a portfolio item that's in the array
    // adjust menu color when over/past the header image
    document.addEventListener('scroll', (e) => {
      let pageY = document.documentElement.scrollTop
      if (this.$route.path === '/') {
        let vh = this.$parent.$el.querySelector('video').offsetHeight
        let ph = window.innerHeight
        let h = (vh < ph) ? vh : ph
        if (pageY > h) this.color = '#000'
        else this.color = '#fff'
      } else if (slugs.includes(this.$route.path)) {
        if (pageY > window.innerHeight - 250) this.color = '#000'
        else this.color = '#fff'
      }
    })
  },
  methods: {
    resizeToFit (el) {
      // when mainmenu appears, make sure all items fit on the screen
      // at the same time, without having to scroll
      let f = parseInt(el.style.fontSize) || 60
      let m = parseInt(el.style.marginTop) || 20
      let rows = this.links.length
      let rowHeight = m + el.offsetHeight + m
      let totalHeight = rows * rowHeight
      let availSpace = window.innerHeight - 100 // account for top padding
      if (totalHeight >= availSpace) {
        let scalar = (f / rowHeight)
        let newSize = Math.floor((availSpace / rows) * scalar) + 'px'
        let newMar = Math.floor(parseInt(newSize) / 3) + 'px'
        el.style.fontSize = newSize
        el.style.marginTop = newMar
        el.style.marginBottom = newMar
      }
    },
    beforeItemEnter (el) {
      el.style.opacity = '0'
      el.style.transform = 'translateX(30px)'
    },
    enterItem (el, done) {
      this.resizeToFit(el)
      setTimeout(function () {
        el.style.opacity = '1'
        el.style.transform = 'translateX(0px)'
        done()
      }, el.dataset.index * 50)
    },
    mbClick () {
      let mb = this.$refs.menuburger
      if (this.open) {
        mb.classList.remove('open')
        this.open = false
        this.color = '#000'
      } else {
        mb.classList.add('open')
        this.open = true
        this.color = '#fff'
      }
    },
    itemClick (o) {
      if(o.path.includes('http')){
        window.location = o.path
      } else {
        this.$router.push(o.path)
      }
      Vue.nextTick(() => {
        if (document.querySelector('section.open')) {
          this.mbClick()
        }
        if (o.sec) {
          window.scrollTo(0, document.querySelector(o.sec).offsetTop)
        }
      })
    }
  }
}
</script>

<style scoped>
/* ~ ~ ~ menuburger ~ ~ ~ */
.bbmenu > section:nth-child(1) {
  position:fixed;
  top:13px; right:50px;
  z-index:200;
  width:40px; height:45px;
  transform:rotate(0deg);
  transition:.5s ease-in-out;
  cursor:pointer;
}

.bbmenu > section:nth-child(1) span {
  display:block; opacity:1;
  position:absolute; left:0;
  height:4px; width:100%;
  background:#000000;
  border-radius:9px;
  transform:rotate(0deg);
  transition: all .25s ease-in-out;
}
.bbmenu > section:nth-child(1) span:nth-child(1) { top:0px; }
.bbmenu > section:nth-child(1) span:nth-child(2),
.bbmenu > section:nth-child(1) span:nth-child(3) { top:10px; }
.bbmenu > section:nth-child(1) span:nth-child(4) { top:20px; }

.bbmenu > section:nth-child(1).open span:nth-child(1) {
  top:18px; left:50%; width:0%;
}
.bbmenu > section:nth-child(1).open span:nth-child(2) {
  transform:rotate(45deg);
}
.bbmenu > section:nth-child(1).open span:nth-child(3) {
  transform:rotate(-45deg);
}
.bbmenu > section:nth-child(1).open span:nth-child(4) {
  top:18px; left:50%; width:0%;
}

/* ~ ~ ~ mainmenu ~ ~ ~ */

.menu-toggle-leave-active, .menu-toggle-enter-active {
  transition: all 0.3s;
}
.menu-toggle-enter {
  opacity:0.5; transform:translateY(-50%) skewY(5deg);
}
.menu-toggle-leave-to {
  opacity:0.5; transform:translateY(-100%) skewY(-5deg);
}

.bbmenu > section:nth-child(2) {
  background-color:#e40477;
  position:fixed;
  top:0; left:0; z-index:100;
  width:100%; height:100%;
  padding-top:100px;
}

.link {
  font-family:"BB_title";
  color:#ffffff;
  font-size:60px;
  width:300px;
  display:block;
  margin:20px auto;
  cursor:pointer;
  text-decoration: none;
  text-transform: lowercase;
  transition: opacity 250ms, transform 250ms;
}
.link:hover { border:none; }

@media (max-width: 767px) {
  .bbmenu > section:nth-child(1) { right:15px; }
  .link { width:100%; margin-left:20px; }
  .bbmenu > section:nth-child(2) { padding-top:50px; }
}
</style>

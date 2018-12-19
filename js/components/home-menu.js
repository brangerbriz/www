window.BBComps = window.BBComps ||  {}

window.BBComps.homeMenu = Vue.component('home-menu', {
    data:function(){ return {
        state:store.state,
        open:false,
        color:'#000',
        links:[
            {text:'Home',path:'/',sec:'section#splash'},
            {text:'Services',path:'/',sec:'section#services'},
            {text:'Work',path:'/portfolio'},
            {text:'About',path:'/',sec:'section#statement'},
            {text:'Blog',path:'/blog'},
            {text:'R+D',path:'/',sec:'section#lab'},
            {text:'Contact',path:'/',sec:'section#contact'},
        ],
        slugArr:null,
    }},
    mounted:function(){
        // create an array of all portfolio items w/header image
        let slugs = this.state.work
                      .filter(w=>w.headerImg!=="")
                      .map(w=>'/portfolio/'+w.slug)

        if( slugs.includes(this.$route.path) || this.$route.path=="/" )
            this.color = '#fff'

        // if we're on a portfolio item that's in the array
        // adjust menu color when over/past the header image
        document.addEventListener('scroll',(e)=>{
            let pageY = document.documentElement.scrollTop
            if(this.$route.path=="/"){
                if(pageY > innerHeight) this.color = '#000'
                else this.color = '#fff'
            } else if( slugs.includes(this.$route.path) ){
                if(pageY > innerHeight-250) this.color = '#000'
                else this.color = '#fff'
            }
        })
    },
    updated:function(){
        if(this.$refs.mainmenu){
            // when mainmenu appears, make sure all items fit on the screen
            // at the same time, without having to scroll
            let row = this.$refs.mainmenu.children[0]
            let f = parseInt(row.style.fontSize) || 60
            let m = parseInt(row.style.marginTop) || 20
            let rowHeight = m + row.offsetHeight + m
            let totalHeight = this.$refs.mainmenu.children.length * rowHeight
            let availSpace = innerHeight-100 // account for top padding
            if(totalHeight >= availSpace){
                let rows = this.$refs.mainmenu.children.length
                let scalar = (f/rowHeight)
                let newSize = Math.floor((availSpace/rows) * scalar)+"px"
                let newMar = Math.floor(parseInt(newSize)/3)+"px"
                for (let i = 0; i < rows; i++) {
                    this.$refs.mainmenu.children[i].style.fontSize = newSize
                    this.$refs.mainmenu.children[i].style.marginTop = newMar
                    this.$refs.mainmenu.children[i].style.marginBottom = newMar
                }
            }
        }
    },
    methods:{
        linkAnim:function(i){
            let val = 500+(i*100)
            return `bbmenu-link-in ${val}ms`
        },
        mbClick:function(){
            let mb = this.$refs.menuburger
            let menuopen = Number(mb.dataset.open)
            if(menuopen){
                mb.dataset.open = 0
                mb.classList.remove('open')
                this.open = false
                this.color = '#000'
            } else {
                mb.dataset.open = 1
                mb.classList.add('open')
                this.open = true
                this.color = '#fff'
            }
        },
        itemClick:function(o){
            this.$router.push(o.path)
            Vue.nextTick(()=>{
                if(document.querySelector('section.open')){
                    this.mbClick()
                }
                if(o.sec){
                    scrollTo(0,document.querySelector(o.sec).offsetTop)
                }
            })
        }
    },
    template: `<section class="bbmenu">

        <section ref="menuburger" data-open="0" @click="mbClick">
            <span :style="{background:color}"></span>
            <span :style="{background:color}"></span>
            <span :style="{background:color}"></span>
            <span :style="{background:color}"></span>
        </section>

        <transition name="menu-toggle">
        <section ref="mainmenu" v-if="open">
            <span v-for="(o,i) in links"
                         class="link"
                         :style="{animation:linkAnim(i)}"
                         :key="i"
                         @click="itemClick(o)">{{o.text}}</span>
        </section>
        </transition>

    </section>`
})

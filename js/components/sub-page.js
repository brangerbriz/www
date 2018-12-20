window.BBComps = window.BBComps ||  {}

window.BBComps.subPage = Vue.component('sub-page', {
    props:['slug'], // prop received via router (via path)
    data:function(){ return {
        state:store.state,
        caseStudyMargin:0 // top margin to reveal case-study header images
    }},
    mounted:function(){ this.updateDataProps() },
    updated:function(){ this.createDescriptionDOM(); this.getMargin() },
    computed:{
        stats:function(){
            let stats = []
            let categories = [
                "year", "url", "services", "recognition", "results", "clients"
            ]
            categories.forEach( cat => {
                if(this.state.post[cat]!==""){
                    stats.push({
                        name:cat,
                        data:this.state.post[cat]
                    })
                }
            })
            return stats
        }
    },
    methods:{
        isBlogPost:function(){
            return this.$route.path.includes("/blog")
        },
        updateDataProps:function(){
            document.body.style.background = "#fff"
            let type = (this.$route.path.includes("/blog")) ? 'blog' : 'work'
            if(this.slug){
                for (let idx in this.state[type]) {
                    if(this.state[type][idx].slug == this.slug){
                        store.currentPost(this.state[type][idx])
                        break
                    }
                }
            }
        },
        createDescriptionDOM:function(){
            if(typeof this.$el.querySelector=="function"){
                // let sec = this.$el.refs.content
                let sec = this.$el.querySelector('.content_sec')
                // remove all prior nodes inside section#content
                while (sec.firstChild) { sec.removeChild(sec.firstChild) }
                sec.innerHTML = this.state.post.content
                // create all special BBElements (logo, marginal notes, etc)
                BBElements()
            } else {
                console.warn('tried to createDescriptionDOM before el is ready')
            }
        },
        goHome:function(){
            if(this.$router) this.$router.push('/')
            else window.location = 'https://brangerbriz.com'
        },
        tagURL:function(path,t){
            // return 'https://brangerbriz.com/portfolio/filter?tags='+t
            this.$router.push(`/${path}?tags=${t.toLowerCase()}`)
        },
        border:function(i,length){
            return (i==length-1) ? 'none' : '1px solid #000'
        },
        formatedDate:function(){
            let d = new Date(this.state.post.date)
            let m = [
                "Jan","Feb","Mar","Apr","May","Jun",
                "Jul","Aug","Sep","Oct","Nov","Dec"
            ]
            return m[d.getMonth()]+' '+
                   d.getDate()+', '+
                   d.getFullYear()
        },
        getStats:function(){
            let stats = []
            let categories = [
                "year", "url", "services", "recognition", "results", "clients"
            ]
            categories.forEach( cat => {
                stats.push({
                    name:cat,
                    data:this.state.post[cat]
                })
            })
            return stats
        },
        getBGImg:function(){
            if(this.state.post.headerImg!=="")
                return `url(http:${this.state.post.headerImg})`
        },
        calcBGImgHeight:function(callback){
            let img = new Image()
            img.onload = function(){
                let scaledHeight = img.height * (innerWidth/img.width)
                callback(scaledHeight)
            }
            img.src = `http:${this.state.post.headerImg}`
        },
        getMargin:function(){
            if(this.state.post){
                if(this.state.post.headerImg!==""){
                    if(innerWidth < 767){
                        this.calcBGImgHeight(h=>{
                            let l = 85 // logo
                            let d = innerHeight-200
                            this.caseStudyMargin = (h>d) ? d-l+'px' : h-l+"px"
                        })
                    } else this.caseStudyMargin = `${innerHeight-275}px`
                } else this.caseStudyMargin =  'none'
            }
        },
        authClick:function(){
            let str = this.state.post.author.toLowerCase().replace('by','')
            let arr = str.split(' ')
            if(arr[0]=="") arr.shift()
            this.$router.push(`/search?filter=${arr[0]}`)
        }
    },
    template:`<section v-if="state.post">

        <home-menu></home-menu>

        <!-- ------------------- BLOG POST --------------------------------- -->
        <section v-if="isBlogPost()">
            <section id="logo" href="false" data-mark-only="mobile"
                @click="goHome" style="cursor:pointer"></section>

            <h1>{{ state.post.title }}</h1>

            <h3 @click="authClick" class="b-author">{{ state.post.author }}</h3>

            <div class="date">{{ formatedDate() }}</div>

            <section class="content_sec"></section>

            <p><i>Have some thoughts to share? Join the public conversation about this post on <a :href="state.post.tweet" target="_blank">Twitter</a>, or send us@brangerbriz.com an email, we'd love to hear what you think!</i></p>

            <span class="tags">
                <a v-for="t in state.post.tags"
                    @click="tagURL('search',t)" :key="t">{{t}}</a>
            </span>

            <bb-footer></bb-footer>
        </section>

        <!-- ------------------- PORTFOLIO POST ---------------------------- -->
        <section v-else class="case-study" :style="{backgroundImage:getBGImg()}">
            <section v-if="state.post.headerImg!==''" data-text-color="#ffffff"
                @click="goHome" id="logo"
                href="false" data-mark-only="mobile"></section>
            <section v-else @click="goHome" id="logo"
                href="false" data-mark-only="mobile"></section>

            <section class="work-post" :style="{marginTop:caseStudyMargin}">
                <h1 style="margin-top:50px">{{ state.post.title }}</h1>
                <span class="post_subtitle">{{ state.post.subTitle }}</span>

                <section class="post_stats">
                    <span class="post_stats_row" v-for="(s,i) in stats"
                          :style="{borderBottom:border(i,stats.length)}">
                        <span>{{ s.name }}</span>
                        <span>
                            <a v-if="s.name=='url'" :href="s.data" target="_blank">
                                {{ s.data }}</a>
                            <span v-else>{{ s.data }}</span>
                        </span>
                    </span>
                </section>

                <section class="content_sec"></section>

                <span class="tags">
                    <a v-for="t in state.post.tags"
                        @click="tagURL('portfolio',t)" :key="t">{{t}}</a>
                </span>

                <bb-footer></bb-footer>
            </section>
        </section>



    </section>`
})

<template>
<section>
    <section v-if="$store.state.loadingStatus=='ready'">

        <home-menu></home-menu>

        <!--  BLOG POST  -->
        <section v-if="isBlogPost()">
            <section id="logo" href="false" data-mark-only="mobile"
                @click="goHome" style="cursor:pointer"></section>

            <h1>{{ getPost().title }}</h1>

            <h3 @click="authClick" class="b-author">{{ getPost().author }}</h3>

            <div class="date">{{ formatedDate() }}</div>

            <section class="content_sec" v-html="getPost().content"></section>

            <p><i>Have some thoughts to share? Join the public conversation about this post on <a :href="getPost().tweet" target="_blank">Twitter</a>, or send us@brangerbriz.com an email, we'd love to hear what you think!</i></p>

            <span class="tags">
                <a v-for="t in getPost().tags"
                    @click="tagURL('search',t)" :key="t">{{t}}</a>
            </span>

            <bb-footer></bb-footer>
        </section>

        <!--  PORTFOLIO POST  -->
        <section v-else class="case-study" :style="{backgroundImage:getBGImg()}">
            <section v-if="getPost().headerImg!==''" data-text-color="#ffffff"
                @click="goHome" id="logo"
                href="false" data-mark-only="mobile"></section>
            <section v-else @click="goHome" id="logo"
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
                    <a v-for="t in getPost().tags"
                        @click="tagURL('portfolio',t)" :key="t">{{t}}</a>
                </span>

                <bb-footer></bb-footer>
            </section>
        </section>



    </section>
    <section v-else>
        <home-menu></home-menu>
        <p>Give us a second, we're {{ $store.state.loadingStatus }}</p>
    </section>
</section>
</template>

<script>
import HomeMenu from '../elements/HomeMenu.vue'
import BbFooter from '../elements/BbFooter.vue'
import BBElements from 'BBElements'
import { mapGetters } from 'vuex'

export default {
    name: 'SubPage',
    components: { HomeMenu, BbFooter },
    props:['slug'], // prop received via router (via path)
    data(){ return {
        caseStudyMargin:0 // top margin to reveal case-study header images
    }},
    computed: mapGetters([
      'isLoading',
      'currentPost'
    ]),
    metaInfo(){ return {
        title: this.isLoading ? 'loading...' : this.currentPost(this.slug).title,
        meta:[
            {
                name:'description',
                content:this.isLoading ? 'loading...' :
                this.currentPost(this.slug).summary
            }
        ]
    }},
    mounted(){
        document.body.style.background = "#fff"
        BBElements()
        this.getMargin()
    },
    methods:{
        getMeta(type){
            if(type=='title'){
                return this.$store.getters.currentPost(this.slug).title
            } else if(type=='summary'){
                return this.$store.getters.currentPost(this.slug).summary
            }
        },
        getPost(){
            return this.$store.getters.currentPost(this.slug)
        },
        isBlogPost(){
            return this.$route.path.includes("/blog")
        },
        goHome(){
            if(this.$router) this.$router.push('/')
            else window.location = 'https://brangerbriz.com'
        },
        tagURL(path,t){
            // return 'https://brangerbriz.com/portfolio/filter?tags='+t
            this.$router.push(`/${path}?tags=${t.toLowerCase()}`)
        },
        border(i,length){
            return (i==length-1) ? 'none' : '1px solid #000'
        },
        formatedDate(){
            let d = new Date(this.getPost().date)
            let m = [
                "Jan","Feb","Mar","Apr","May","Jun",
                "Jul","Aug","Sep","Oct","Nov","Dec"
            ]
            return m[d.getMonth()]+' '+
                   d.getDate()+', '+
                   d.getFullYear()
        },
        stats(){
            let stats = []
            let categories = [
                "year", "url", "services", "recognition", "results", "clients"
            ]
            categories.forEach( cat => {
                if(this.getPost()[cat]!==""){
                    stats.push({
                        name:cat,
                        data:this.getPost()[cat]
                    })
                }
            })
            return stats
        },
        // getStats(){
        //     let stats = []
        //     let categories = [
        //         "year", "url", "services", "recognition", "results", "clients"
        //     ]
        //     categories.forEach( cat => {
        //         stats.push({
        //             name:cat,
        //             data:this.getPost()[cat]
        //         })
        //     })
        //     return stats
        // },
        getBGImg(){
            if(this.getPost().headerImg!=="")
                return `url(http:${this.getPost().headerImg})`
        },
        calcBGImgHeight(callback){
            let img = new Image()
            img.onload = function(){
                let scaledHeight = img.height * (innerWidth/img.width)
                callback(scaledHeight)
            }
            img.src = `http:${this.getPost().headerImg}`
        },
        getMargin(){
            let post = this.$store.getters.currentPost(this.slug)
            if(post && post.headerImg!==""){
                if(innerWidth < 767){
                    this.calcBGImgHeight(h=>{
                        let l = 85 // logo
                        let d = innerHeight-200
                        this.caseStudyMargin = (h>d) ? d-l+'px' : h-l+"px"
                    })
                } else this.caseStudyMargin = `${innerHeight-275}px`
            } else this.caseStudyMargin =  'none'
        },
        authClick(){
            let str = this.getPost().author.toLowerCase().replace('by','')
            let arr = str.split(' ')
            if(arr[0]=="") arr.shift()
            this.$router.push(`/search?filter=${arr[0]}`)
        }
    }
}
</script>

<style scoped>

    .b-author { cursor: pointer; }

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

    @keyframes post-info-in {
        0% { opacity:0; transform:translateY(30px); }
        25% { opacity:0; transform:translateY(30px); }
        70% { transform:translateY(0px); }
        100% { opacity:1; }
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

    .tags > a:hover { border-bottom: none; }

</style>

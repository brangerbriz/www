<template>
    <section>

        <home-menu></home-menu>

        <section class="header">
            <span>
                <img src="../../assets/logo.svg" alt="branger_briz" @click="goHome()">
                <br>
                <h3>{{ title }}</h3>
            </span>
            <span>
                <search-box></search-box>
            </span>
        </section>

        <section class="description"></section>

        <section class="results" :style="{gridTemplateColumns:calcGrid()}">
            <section class="list-tags" v-if="displayTags()">
                <section v-for="(o,i) in $store.state.featuredTags">
                    <span :key="i" @click="addTag($event)"
                        :class="{'tag-link':true, 'selected':isSelected(o)}">
                        {{o}}
                    </span>
                </section>
            </section>
            <section v-if="$store.state.filtered.length>0">
                <section v-for="(p,i) in $store.state.filtered">
                    <!-- NOTE:
                    right now short="false" which means they will stretch to
                    their full width, which will be "normal" when on portfolio
                    (due to the inclusion of tags on the left) and larger in
                    search results.

                    alternatively, we can set :short="!portfolio", so that when
                    not it the portfolio (ie. no tags on left) it will be short
                    and thus appear at all consistent widt regardless of whether
                    the tags are on the left or not. -->
                    <work-summary v-if="isWork(p)"
                        :short="false"
                        :meta="p"
                        :key="p.slug"
                        :animIndex="i"
                        @titleClick="goToPost('portfolio',p.slug)">
                    </work-summary>
                    <blog-summary v-else
                        :meta="p"
                        :key="p.slug"
                        :animIndex="i"
                        :border="i==$store.state.filtered.length-1 ? false : true"
                        @titleClick="goToPost('blog',p.slug)">
                    </blog-summary>
                </section>
            </section>
            <section v-else class="not-found">
                {{ noResultsMessage() }}
            </section>
        </section>


        <bb-footer></bb-footer>

    </section>
</template>

<script>

import HomeMenu from '../elements/HomeMenu.vue'
import SearchBox from '../elements/SearchBox.vue'
import BlogSummary from '../elements/BlogSummary.vue'
import WorkSummary from '../elements/WorkSummary.vue'
import BbFooter from '../elements/BbFooter.vue'
import metaTags from '../metaTags.js'

export default {
    name: 'ListPage',
    components: { HomeMenu, SearchBox, BlogSummary, WorkSummary, BbFooter },
    metaInfo: {
        title:'Branger_Briz',
        titleTemplate:null,
        meta: metaTags.home
    },
    data(){ return {
        title:null, // page sub-title
        portfolio:false, // used to decide whether or not to show tags
        selectedTags:[], // list of tags currently filtering by
    }},
    beforeMount(){ this.initFilter() },
    mounted(){ this.init() },
    methods:{
        init(){
            document.body.style.background = "#fff"
            this.initDescription()
        },
        initFilter(){
            if( this.$route.path.includes("/blog") ){
                this.filterList('blog')
                this.title = "blog"
                this.portfolio = false
            } else if( this.$route.path.includes("/portfolio") ){
                this.filterList('work')
                this.title = "work"
                this.portfolio = true
            } else if( this.$route.path.includes("/search") ){
                this.filterList('all')
                this.title = "search"
                this.portfolio = false
            }
        },
        initDescription(){
            // if currently filtered to a tag that requires a description
            if( Object.keys(this.$store.state.tagDescriptions).length > 0 &&
                typeof this.$el.querySelector=="function"){
                let t = this.$route.query.tags
                if(this.$store.state.tagDescriptions.hasOwnProperty(t) ){
                    let des = this.$el.querySelector('.description')
                    des.innerHTML = this.$store.state.tagDescriptions[t]
                    des.style.display = "block"
                }
            } else setTimeout(this.initDescription,200)
        },
        posts(type){
            let list = (type=='work') ? this.$store.state.work :
                       (type=='blog') ? this.$store.state.blog :
                       this.$store.getters.allPosts
            return list
        },
        calcGrid(){
            return (this.portfolio) ? '2fr 7fr' : '1fr'
        },
        isWork(post){
            return (post.type=="Case Study"||post.type=="Standard")
        },
        isSelected(w){
            let wrd = w.toLowerCase().replace(/^\s+|\s+$/g, '')
            return this.selectedTags.includes(wrd)
        },
        displayTags(){
            return this.portfolio && innerWidth > 767
        },
        goHome(){
            this.$router.push('/')
        },
        goToPost(path,slug){
            this.$router.push(`${path}/${slug}`)
        },
        noResultsMessage(){
            if(this.$store.state.loadingStatus!=='ready'){
                let status = this.$store.state.loadingStatus
                return `give us a second, we're ${status}`
            }
            let s = `sorry, we couldn't find what you where looking for.`
            if( this.$route.query.tags ){
                if(!this.$route.query.tags.includes(',')){
                    let l = this.$route.query.tags.replace(/\./g,', ')
                    s = `Sorry.\nYou are looking for work that includes all of the `
                    s += `following tags: ${l}, but no single work contains `
                    s += `all of those. Try removing some of the tags.`
                }
            } else if( this.$route.query.filter ){
                s = `We don't have any posts that match the search `
                s += `"${this.$route.query.filter}", try searching `
                s += `for something a bit more descriptive.`
            }
            return s
        },
        addTag(e){
            let tag = e.target.textContent
                       .toLowerCase().replace(/^\s+|\s+$/g,'')

            if(e.target.classList.contains('selected')){
                let idx = this.selectedTags.indexOf(tag)
                this.selectedTags.splice(idx, 1)
            } else {
                this.selectedTags.push(tag)
            }

            if(this.selectedTags.length > 0)
                this.$router.push('/portfolio?tags='+this.selectedTags.join('.'))
            else this.$router.push('/portfolio')
        },
        matchAllTags(type){
            // filter out posts that don't include all selectedTags
            this.selectedTags = this.$route.query.tags.toLowerCase().split('.')
            let filt = this.posts(type).filter(p=>{
                let ltags = p.tags.map(t=>t.toLowerCase())
                return this.selectedTags.every(t=>ltags.includes(t))
            })
            return filt
        },
        matchAnyTags(type){
            // filter in any posts that include any of the selectedTags
            this.selectedTags = this.$route.query.tags.toLowerCase().split(',')
            let filt = this.posts(type).filter(p=>{
                let pass = false
                let ltags = p.tags.map(t=>t.toLowerCase())
                for (let i = 0; i < ltags.length; i++) {
                    if(this.selectedTags.includes(ltags[i])){
                        pass = true; break
                    }
                }
                return pass
            })
            return filt
        },
        matchSearchTerm(){
            // if query contains filter text
            let filt = []
            let arr = this.$route.query.filter.split(' ')
            for (var i = 0; i < arr.length; i++) {
                if( this.$store.state.search.hasOwnProperty(arr[i]) ){
                    this.$store.state.search[arr[i]].forEach(idx=>{
                        if(!filt.includes(this.$store.getters.allPosts[idx])){
                            filt.push(this.$store.getters.allPosts[idx])
                        }
                    })
                }
            }
            return filt
        },
        filterList(type){
            let list = this.posts(type)
            let filt = [] // filtered array of posts
            if( Object.keys(this.$route.query).length == 0){
                // if no query, then filter to appropriate type (blog|work|all)
                if(list.length>0) filt = list
                else setTimeout(()=>{this.filterList(type)},200)
            } else if( this.$route.query.tags ){ // if query contains tags
                if(list.length > 0){
                    // if tags are joined by '.'
                    if(!this.$route.query.tags.includes(',')){
                        filt = this.matchAllTags(type)
                    } else { // if tags are joined by ','
                        filt = this.matchAnyTags(type)
                    }
                } else setTimeout(()=>{this.filterList(type)},200)
            } else if( this.$route.query.filter ){
                if(Object.keys(this.$store.state.search).length>0)
                    filt = this.matchSearchTerm()
                else setTimeout(this.filterList,200)
            }

            this.$store.commit('updateFiltered',filt)
        }
    }
}
</script>

<style scoped>

    .header {
        width:100%; max-width:1280px; margin:48px auto; display:grid;
        grid-template-columns: 2fr 7fr;
    }
    .header img { cursor:pointer; }
    .header h3 {
        margin-top:-5px; padding-left:56px; text-transform:none;
    }
    .header > span:nth-child(2) { justify-self: end; }

    .description {
        font-family:"BB_copy"; font-size:20px; line-height:30px; color:#5f5f5f;
        width:100%; max-width:1280px; margin:80px auto;
        display: none;
    }

    .results {
        width:100%; max-width:1280px; margin:0 auto; display:grid;
        /* grid-template-columns : specified in list-page component */
    }

    .results .selected {
        color:#000; background-color:#e40477; border:none; font-weight:bold;
    }

    .results .not-found {
        font-family:"BB_copy"; font-size:20px; line-height:30px; color:#5f5f5f;
        width:100%; margin:0px auto 200px auto; max-width:600px;
    }

    @media (max-width: 1280px) {
        .header {
            padding-left: 10px; grid-column-gap: 20px; box-sizing: border-box;
        }
        .header > span:nth-child(2) { justify-self: start; }
        .results { padding-left: 10px; box-sizing: border-box; }
    }

    @media (max-width: 767px) {
        .header { display:block; }
        .header h3 { margin-top: 0px; margin-left:0px; }
        .header > span:nth-child(2){ padding-top:18px; display:block; }
        .results { display:block; padding:0; }
        .results .list-tags { display:none; }
        .results .not-found {width:90%; margin:0 auto 20px auto;}
        .description { margin:0 auto 73px auto; width:90%; }
    }

</style>

window.BBComps = window.BBComps ||  {}

window.BBComps.listPage = Vue.component('list-page', {
    data:function(){ return {
        state:store.state,
        title:null, // page sub-title
        portfolio:false, // used to decide whether or not to show tags
        selectedTags:[] // list of tags currently filtering by
    }},
    mounted:function(){ this.init() },
    updated:function(){ this.selectTagList() },
    methods:{
        init:function(){
            document.body.style.background = "#fff"
            this.initFilter()
            BBElements()
            this.initDescription()
        },
        initFilter:function(){
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
        initDescription:function(){
            // if currently filtered to a tag that requires a description
            if( Object.keys(this.state.tagDescriptions).length > 0 &&
                typeof this.$el.querySelector=="function"){
                let t = this.$route.query.tags
                if(this.state.tagDescriptions.hasOwnProperty(t) ){
                    let des = this.$el.querySelector('.description')
                    des.innerHTML = this.state.tagDescriptions[t]
                    des.style.display = "block"
                }
            } else setTimeout(this.initDescription,200)
        },
        calcGrid:function(){
            return (this.portfolio) ? '2fr 7fr' : '1fr'
        },
        isWork:function(post){
            return (post.type=="Case Study"||post.type=="Standard")
        },
        displayTags:function(){
            return this.portfolio && innerWidth > 767
        },
        goHome:function(){
            this.$router.push('/')
        },
        goToPost:function(path,slug){
            this.$router.push(`${path}/${slug}`)
        },
        noResultsMessage:function(){
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
        newSearch:function(val){
            this.$router.push(`/search?${val.type}=${val.value}`)
        },
        addTag:function(e){
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
        selectTagList:function(){
            if(this.$route.query.tags){
                // display selected tag styles
                let tl = document.querySelectorAll('.tag-link')
                // only if additive tags, ie. separated by '.'
                if(!this.$route.query.tags.includes(',')){
                    for (var i = 0; i < tl.length; i++) {
                        let tlc = tl[i].textContent
                                       .toLowerCase()
                                       .replace(/^\s+|\s+$/g, '')
                        if(this.selectedTags.includes(tlc))
                            tl[i].classList.add('selected')
                    }
                }
            }
        },
        matchAllTags:function(type){
            // filter out posts that don't include all selectedTags
            this.selectedTags = this.$route.query.tags.split('.')
            let filt = this.state[type].filter(p=>{
                let ltags = p.tags.map(t=>t.toLowerCase())
                return this.selectedTags.every(t=>ltags.includes(t))
            })
            return filt
        },
        matchAnyTags:function(type){
            // filter in any posts that include any of the selectedTags
            this.selectedTags = this.$route.query.tags.split(',')
            let filt = this.state[type].filter(p=>{
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
        matchSearchTerm:function(){
            // if query contains filter text
            let filt = []
            let arr = this.$route.query.filter.split(' ')
            for (var i = 0; i < arr.length; i++) {
                if( this.state.search.hasOwnProperty(arr[i]) ){
                    this.state.search[arr[i]].forEach(idx=>{
                        filt.push(this.state.all[idx])
                    })
                }
            }
            return filt
        },
        filterList:function(type){
            let filt = []// filtered array of posts
            if( Object.keys(this.$route.query).length == 0){
                // if no query, then filter to appropriate type (blog|work|all)
                if(this.state[type].length>0)
                    filt = this.state[type]
                else setTimeout(()=>{this.filterList(type)},200)
            } else if( this.$route.query.tags ){ // if query contains tags
                // if tags are joined by '.'
                if(this.state[type].length > 0){
                    if(!this.$route.query.tags.includes(',')){
                        filt = this.matchAllTags(type)
                    } else { // if tags are joined by ','
                        filt = this.matchAnyTags(type)
                    }
                } else setTimeout(()=>{this.filterList(type)},200)
            } else if( this.$route.query.filter ){
                if(Object.keys(this.state.search).length>0)
                    filt = this.matchSearchTerm()
                else setTimeout(this.filterList,200)
            }
            store.update('filtered',filt)
        }
    },
    template: `<section class="list-page">

        <home-menu></home-menu>

        <section class="header">
            <span>
                <img src="images/logo.svg" alt="branger_briz" @click="goHome()">
                <br>
                <h3>{{ title }}</h3>
            </span>
            <span>
                <search-box @submit="newSearch"></search-box>
            </span>
        </section>

        <section class="description"></section>

        <section class="results" :style="{gridTemplateColumns:calcGrid()}">
            <section class="list-tags" v-if="displayTags()">
                <section v-for="(o,i) in state.featuredTags">
                    <span :key="i" class="tag-link" @click="addTag($event)">
                        {{o}}
                    </span>
                </section>
            </section>
            <section v-if="state.filtered.length>0">
                <section v-for="(p,i) in state.filtered">
                    <work-summary v-if="isWork(p)"
                        :short="portfolio"
                        :meta="p"
                        :key="p.slug"
                        :animIndex="i"
                        @titleClick="goToPost('portfolio',p.slug)">
                    </work-summary>
                    <blog-summary v-else
                        :meta="p"
                        :key="p.slug"
                        :animIndex="i"
                        :border="i==state.filtered.length-1 ? false : true"
                        @titleClick="goToPost('blog',p.slug)">
                    </blog-summary>
                </section>
            </section>
            <section v-else class="not-found">
                {{ noResultsMessage() }}
            </section>
        </section>


        <bb-footer></bb-footer>

    </section>`
})

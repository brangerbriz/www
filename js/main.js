
const router = new VueRouter({
    // mode: 'history', // NOTE: this is commented out for local dev'ing
    routes: [
        { path:'/', component:BBComps.homePage },
        { path:'/search', component:BBComps.listPage },
        { path:'/portfolio', component:BBComps.listPage },
        { path:'/blog', component:BBComps.listPage },
        { path:'/search/:filter', component:BBComps.listPage },
        { path:'/portfolio/:slug', component:BBComps.subPage, props:true  },
        { path:'/blog/:slug', component:BBComps.subPage, props:true  }
    ],
    scrollBehavior() {
        return { x: 0, y: 0 }
    }
})

const store = {
    debug:false,
    stopwords:[], // words not to include in search dictionary
    state: {
        all:[], // both blog + work posts
        blog:[], // all blog posts
        work:[], // all portfolio posts
        filtered:[], // list of filtered posts for list-page
        post:null, // current post for sub-page (blog/work item)
        featuredTags:[], // featured tags for home-page
        featuredWork:[], // featured work for home-page
        tagDescriptions:{}, // tags that also have special descriptions
        search:{} // search ditionary for quick lookup
    },
    update:function(prop,val){
        if(val instanceof Array){
            this.state[prop] = val
            if(this.debug)
                console.log(`updated .${prop} with Array[${val.length}]`)
        } else {
            this.state[prop].push(val)
            if(this.debug)
                console.log(`updated .${prop} by pushing a new Object`)
        }
    },
    currentPost:function(post){
        if(this.debug) console.log(`updated current post to ${post.slug}`)
        this.state.post = post
    },
    updateSearch(key,index){
        if( this.stopwords.includes(key) ) return
        key = key.replace(/\n|\s|\'|\"|“|”|\.|\?|\,|\:/g,'').toLowerCase()
        if(key[key.length-1]=='.' || key[key.length-1]==':')
            key = key.substring(0,key.length-2)
        if(key.length>1){
            if(this.debug) console.log(`${index} was added to ${key} in search`)
            if( this.state.search.hasOwnProperty(key) ){
                if(!this.state.search[key].includes(index))
                    this.state.search[key].push(index)
            } else {
                this.state.search[key] = [index]
            }
        }
    }
}

const app = new Vue({
    el: '#bb',
    router:router,
    data: {
        state:store.state,
        ready:false
    },
    mounted:function(){
        // NOTE: this is for local dev'ing, should point to CMS instead
        fetch('local_db.json')
        .then( res => res.json() )
        .then( data => { this.init(data) })
        .catch( err => { console.error(err) })
        // make sure everything's loaded (avoid FOUC)
        let readyYet = setInterval(()=>{
            if(document.readyState === 'complete') {
                clearInterval(readyYet)
                this.ready = true
            }
        }, 100)
    },
    methods:{
        createSearchDict:function(stop){
            store.stopwords = stop.words
            this.state.all.forEach((p,i)=>{
                p.summary.split(' ').forEach(w=>store.updateSearch(w,i))
                p.title.split(' ').forEach(w=>store.updateSearch(w,i))
                if(p.author){ // if blog
                    p.author.split(' ').forEach(w=>store.updateSearch(w,i))
                } else { // if work
                    p.subTitle.split(' ').forEach(w=>store.updateSearch(w,i))
                }
            })
        },
        init:function(data){
            let cms = organizeCMSdata(data)
            // set up store w/initial organized CMS data
            store.update('all',cms.all)
            store.update('work',cms.work)
            store.update('blog',cms.blog)
            store.update('featuredTags',cms.featuredTags)
            // create featured work list for home page
            cms.work.forEach(work=>{
                if(work.featured) store.update('featuredWork',work)
            })
            // if currently on sub-page get current post data
            let type = (this.$route.path.includes("/blog")) ? 'blog' : 'work'
            let slug = app.$route.params.slug
            if(slug){
                for (let idx in this.state[type]) {
                    if(this.state[type][idx].slug == slug){
                        store.currentPost(this.state[type][idx])
                        break
                    }
                }
            }
            // create search dictionary
            fetch('js/utils/stop-words.json')
            .then( res => res.json() )
            .then( data => { this.createSearchDict(data) })
            .catch( err => { console.error(err) })
            // create select tag description dictionary
            fetch('local-tag-descriptions.json')
            .then( res => res.json() )
            .then( data => {
                for(tag in data) store.state.tagDescriptions[tag] = data[tag]
            })
            .catch( err => { console.error(err) })
        }
    }
})

console.log(`
              +++++++++++++
            +++++++++++++++++
          +++++++++++++++++++++
         +++++++ ---------- ++++       ____                                         ____       _
        ++++++++|  ______  |+++++     |  _ \\                                       |  _ \\     (_)
        ++++++__| |______| |+++++     | |_) |_ __ __ _ _ __   __ _  ___ _ __       | |_) |_ __ _ ____
        +++++|  _________  |+++++     |  _ <| '__/ _' | '_ \\ / _' |/ _ \\ '__|      |  _ <| '__| |_  /
        +++++| |_________| |+++++     | |_) | | | (_| | | | | (_| |  __/ |         | |_) | |  | |/ /
         ++++|_____________|++++      |____/|_|  \\__,_|_| |_|\\__, |\\___|_| _______ |____/|_|  |_/___|
          +++++++++++++++++++++                              __ | |       |_______|
            +++++++++++++++++                                \\___/
              +++++++++++++
`)

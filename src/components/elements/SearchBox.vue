<template>
    <section class="bb-search">
        <span ref="form">
            <section>
                <input ref="search" type="text" placeholder="search"
                       @input="searchIt($event)" @keydown="keyDown($event)">
                <section ref="list" class="auto-list">
                    <span v-for="(word,i) in list"
                        @click="clickListItem($event)"
                        :class="{ active: (i==focus) }"
                        v-html="highlightMatch(word)"></span>
                </section>
            </section>
        </span>
    </section>
</template>

<script>
export default {
    name: 'SearchBox',
    data(){ return {
        completes:[ // list to autocomplete from
            // NOTE services tags disabled until we address the following issue:
            // https://github.com/brangerbriz/www/issues/18
            // 'online advertising','platform development','social',
            // 'experiental interactive','emerging technologies'
        ],
        list:[],
        focus:-1, // which item in the list is focused

    }},
    mounted(){
        this.updateAutoCompleteList()
    },
    methods:{
        addTag(t){
            if( !this.completes.includes(t) && t!=="" ) this.completes.push(t)
        },
        updateAutoCompleteList(){
            // add all work/blog tags to completes array
            if(this.completes.length==0){
            // if(this.completes.length==5){ // NOTE see above; issue 18
                this.$store.getters.allPosts.forEach(p => {
                    p.tags.forEach(t=>this.addTag(t))
                })
            }
        },
        fuzzyMatch(tag,val){
            let idx = []
            let l, i = 0, n = -1
            for (; l = val[i++] ;){
                if (!~(n = tag.indexOf(l,n+1)))
                    return {indexes:idx, match:false}
                else idx.push(n)
            }
            return {indexes:idx, match:true}
        },
        enterActive(){
            if(this.focus > -1){
                let val = this.list[this.focus]
                this.$refs.search.value = val
                this.$router.push(`/search?tags=${val}`)
                this.list = []
            } else {
                this.$router.push(`/search?filter=${this.$refs.search.value}`)
            }
        },
        // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
        isInList(tag){
            return this.completes.map(t=>t.toLowerCase()).includes(tag)
        },
        searchIt(e){
            let s, val = e.target.value.toLowerCase()
            this.list = []
            this.updateAutoCompleteList()
            if(!val || val=="") return false
            this.focus = -1
            for (let i = 0; i < this.completes.length; i++) {
                let tag = this.completes[i]
                if( this.isInList(val) ) break
                let fuzzy = this.fuzzyMatch(tag.toLowerCase(),val)
                if( fuzzy.match ) this.list.push(tag)
            }
        },
        keyDown(e){
            if(e.keyCode == 40) { // down
                this.focus++
            } else if (e.keyCode == 38) { // up
                this.focus--
            } else if (e.keyCode == 13) { // enter
                this.enterActive()
            }
            if (this.focus >= this.list.length) this.focus = 0
            if (this.focus < 0) this.focus = this.list.length-1
        },
        clickListItem(e){
            for (let i = 0; i < e.target.parentNode.children.length; i++) {
                if( e.target.parentNode.children[i] == e.target ){
                    this.focus = i
                    this.enterActive()
                    break
                }
            }
        },
        highlightMatch(word){
            let val = this.$refs.search.value.toLowerCase()
            let tag = word.toLowerCase()
            let html = tag.split('')
            let fuzzy = this.fuzzyMatch(tag,val)
            fuzzy.indexes.forEach(i=>{
                html[i]=`<b style="border-bottom:2px solid #000">${html[i]}</b>`
            })
            html = html.join('')
            return html
        }
    }
}
</script>

<style scoped>

    .bb-search > span {
        font-family:"BB_copy"; color:#000; font-weight:bold;
        line-height:24px; letter-spacing:1px;
    }

        .bb-search input { color:#5f5f5f; border:none; }

        .bb-search input[type="text"]{
            height:35px; width:190px;
            background-color:#e7e7e7; display:block;
            padding:2px 19px;
        }

        /* search results */

        .auto-list {
            position:absolute; z-index:9; display:inline-block;
        }

        .auto-list span {
            background-color:#ebfcff;
            padding:8px 13px; border-top:1px solid #e7e7e7;
            display:block; width:202px; cursor:pointer;
        }

        .auto-list span:hover, .active {
            background-color:#e40477 !important;
        }

    @media (max-width: 1500px) {

    }

    @media (max-width: 767px) {

    }

</style>

Vue.component('search-box', {
    data:function(){ return {
        state:store.state,
        loadedCSS:false,
        css:`
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

                .bb-search section span {
                    background-color:#ebfcff;
                    margin-bottom:3px; padding:3px 13px;
                    display:block; cursor:pointer;
                }
                .bb-search b { color:#e40477; }
                .bb-search section span:hover b,
                .bb-search .autocomplete-active b { color:#fff; }
                .bb-search section span:hover,
                .bb-search .autocomplete-active {
                    background-color:#e40477 !important;
                }

            @media (max-width: 1500px) {

            }

            @media (max-width: 767px) {

            }
        `,
        completes:[ // list to autocomplete from
            'online advertising','platform development','social',
            'experiental interactive','emerging technologies'],
        focus:-1
    }},
    mounted:function(){
        this.applyScopedCSS()
        this.updateAutoCompleteList()
    },
    methods:{
        applyScopedCSS:function(){
            let name = 'search-box-css'
            let styles = document.querySelectorAll('style')
            for (let i = 0; i < styles.length; i++) {
                if( styles[i].id == name ){
                    this.loadedCSS = true
                    break
                }
            }
            if( !this.loadedCSS ){
                let style = document.createElement('style')
                style.type = 'text/css'
                style.id = name
                style.innerHTML = this.css
                document.querySelector('head').appendChild(style)
            }
        },
        // ----------------------------------------- search functionality ------
        updateAutoCompleteList:function(){
            // add all work/blog tags to completes array
            if(this.completes.length==5){
                this.state.all.forEach(p => {
                    for (let i = 0; i < p.tags.length; i++) {
                        let t = p.tags[i]
                        if( !this.completes.includes(t) && t!=="" )
                            this.completes.push(t)
                    }
                })
            }
        },
        isInList:function(tag){
            return this.completes.map(t=>t.toLowerCase()).includes(tag)
        },
        fuzzyMatch:function(tag,val){
            let idx = []
            let l, i = 0, n = -1
            for (; l = val[i++] ;){
                if (!~(n = tag.indexOf(l,n+1)))
                    return {indexes:idx, match:false}
                else idx.push(n)
            }
            return {indexes:idx, match:true}
        },
        searchIt:function(e){
            let s, val = e.target.value.toLowerCase()
            this.clearDropList()
            this.updateAutoCompleteList()
            if(!val || val=="") return false
            this.focus = -1
            for (let i = 0; i < this.completes.length; i++) {
                let tag = this.completes[i]
                if( this.isInList(val) ) break
                let fuzzy = this.fuzzyMatch(tag.toLowerCase(),val)
                if( fuzzy.match ){
                    s = document.createElement("span")
                    let html = tag.split('')
                    fuzzy.indexes.forEach(idx=>{
                        html[idx] = "<b>"+html[idx]+"</b>"
                    })
                    s.innerHTML = html.join('')
                    s.onclick = this.clickListItem
                    this.$refs.list.appendChild(s)
                }
            }
        },
        keyDown:function(e){
            let l = this.$refs.list.children
            if(e.keyCode == 40) { // down
                this.focus++
                this.addActive()
            } else if (e.keyCode == 38) { // up
                this.focus--
                this.addActive()
            } else if (e.keyCode == 13) { // enter
                this.enterActive()
            }
        },
        clickListItem:function(e){
            for (let i = 0; i < e.target.parentNode.children.length; i++) {
                if( e.target.parentNode.children[i] == e.target ){
                    this.focus = i
                    this.enterActive()
                    break
                }
            }
        },
        enterActive:function(){
            if(this.focus > -1){
                let val = this.$refs.list.children[this.focus].textContent
                this.$refs.search.value = val
                this.$emit('submit',{type:'tags',value:val})
                this.clearDropList()
            } else {
                this.$emit('submit',{
                    type:'filter',
                    value:this.$refs.search.value
                })
            }
        },
        addActive:function(){
            this.removeActives()
            let l = this.$refs.list.children
            if (this.focus >= l.length) this.focus = 0
            if (this.focus < 0) this.focus = (l.length-1)
            l[this.focus].classList.add("autocomplete-active")
        },
        removeActives:function(x){
            let l = this.$refs.list.children
            for (let i = 0; i < l.length; i++) {
              l[i].classList.remove("autocomplete-active")
            }
        },
        clearDropList:function(){
            while (this.$refs.list.firstChild)
                this.$refs.list.removeChild(this.$refs.list.firstChild)
        }
    },
    template:`<section class="bb-search">
        <span ref="form">
            <section>
                <input ref="search" type="text" placeholder="search"
                       @input="searchIt($event)" @keydown="keyDown($event)">
                <section ref="list" class="auto-list"></section>
            </section>
        </span>
    </section>`
})

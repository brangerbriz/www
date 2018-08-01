Vue.component('blog-summary', {
    props:['border','meta','animIndex'],
    data: function(){ return {
        // see Kevin's design docs for human readable rules for these
        x:null, // title column start position
        w:null,	// title column end position
        s:null, // summary column
        d:null, // date column
        loadedCSS:false,
        css:`
            .bbbs {
                max-width: 1280px;
                margin: 0px auto;
            }

            .bbbs span::-moz-selection { background:#e40477; color:#fff; }
            .bbbs span::selection { background:#e40477; color:#fff; }
            .bbbs span {
                display: block;
                font-family:"BB_copy";
                font-size: 16px;
                line-height: 24px;
                color: #000;
            }

            .bbbs .full-sum-row {
                display:block;
                padding-bottom: 20px;
                width: 100%;
                margin-top:50px;
            }

            .bbbs .split-sum-row {
                display: flex;
                flex-direction: row;
                width: 100%;
                margin-bottom:50px;
            }

                .bbbs .bs-title {
                    font-family:"BB_title";
                    color:#000;
                    font-size: 38px;
                    line-height: 44px;
                    letter-spacing: 0.3px;
                    cursor:pointer;
                }
                .bbbs .bs-title:hover { color:#e40477; }

                .bbbs .bs-summary-1,
                .bbbs .bs-summary-2 {
                    width:90%;
                }

            .bbbs .bs-border {
                display:block;
                border-top: 1px solid #c4c4c4;
                margin: 0 auto;
                width: 50%;
            }

            .bbbs .bs-mobile { display:none; }
            .bbbs .bs-mobile > span:nth-child(1){
                margin-top:50px;
                margin-bottom: 15px;
                margin-left: 15px;
            }
            .bbbs .bs-mobile > span:nth-child(2){
                font-family:"BB_title";
                color:#000;
                letter-spacing: 0.3px;
                font-size: 32px;
                line-height: 36px;
                margin-bottom: 25px;
                cursor:pointer;
            }
            .bbbs .bs-mobile > span:nth-child(2):hover { color:#e40477; }
            .bbbs .bs-mobile > span:nth-child(3){
                width: 90%;
                margin-bottom:50px;
            }

            @media (max-width: 767px) {
                .bbbs { margin:0px 5%; }
                .bbbs .bs-mobile { display:block; }
                .bbbs .full-sum-row { display:none; }
                .bbbs .split-sum-row { display:none; }
                .bbbs .bs-border{ width: 100%; }
                .bbbs .bs-title { font-size:28px; }
            }

            @keyframes bbbs-title-in {
                0% { opacity:0; transform:translateX(20px) }
                25% { opacity:0; transform:translateX(20px) }
                100% { opacity:1; transform:translateX(0px) }
            }

            @keyframes bbbs-copy-in {
                0% { opacity:0; transform:translateX(-20px) }
                25% { opacity:0; transform:translateX(-20px) }
                100% { opacity:1; transform:translateX(0px) }
            }

            @keyframes bbbs-date-in {
                0% { opacity:0;  }
                100% { opacity:1; }
            }
        `
    }},
    computed:{
        atitle:function(){ return this.calcAnim('bbbs-title-in') },
        acopy:function(){ return this.calcAnim('bbbs-copy-in') },
        adate:function(){ return this.calcAnim('bbbs-date-in') }
    },
    mounted:function(){
        // apply scoped CSS
        let name = 'blog-summary-css'
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

        // title placement ( blog layout only )
        let x = Math.floor(Math.random()*2)+1
            x += (Math.random()>0.75) ? Math.floor(Math.random()*2)+1 : 0
        let y = (x-4<0) ? 0 : x-4
        let w = Math.floor( Math.random()*((4-y)-1) )+2
            w += (w==2 && x!==6 && Math.random()<0.75) ? 1 : 0
        this.x = x
        this.w = w
        // summary && date placement ( blog layout only )
        let s = (Math.random()<0.5) ? 2 : 4
        let dArr
        if( s==2 ) dArr = [1,4,5,6]
        else dArr = [1,2,3,6]
        let d = Math.floor( Math.random()*dArr.length )
        this.s = s
        this.d = dArr[d]

        // use data above to create the randomized layout
        this.layout()
    },
    methods:{
        calcAnim:function(type){
            if(typeof this.animIndex=="number"){
                let val = 500+(this.animIndex*200)
                return `${type} ${val}ms`
            } else {
                return 'none'
            }
        },
        formatedDate:function(){
            let d = new Date(this.meta.date)
            let month = (d.getMonth()+1).toString()
                month = (month.length==1) ? '0'+month : month
            let day = d.getDate().toString()
                day = (day.length==1) ? '0'+day : day
            return d.getFullYear()+'.'+month+'.'+day
        },
        layout:function(){
            let title1 = this.$el.querySelector('.bs-title')
            let s1 = this.$el.querySelector('.split-sum-row > span:nth-child(1)')
            let s2 = this.$el.querySelector('.split-sum-row > span:nth-child(2)')
            let title2 = this.$el.querySelector('.bs-title-2')
            let date1 = this.$el.querySelector('.bs-date-1')
            let date2 = this.$el.querySelector('.bs-date-2')
            let sum1 = this.$el.querySelector('.bs-summary-1')
            let sum2 = this.$el.querySelector('.bs-summary-2')
            let border = this.$el.querySelector('.bs-border')

            // position title
            title1.style.width = (this.w/8)*100+"%"
            title1.style.paddingLeft = (this.x/8)*100+"%"

            if( this.d < this.s ){
                sum1.style.display = "none"
                date2.style.display = "none"

                let lwidth
                if(this.s==2) lwidth = (1/8)*100
                else {
                    if( this.d==1 ) 	lwidth = (3/8)*100
                    else if(this.d==2) 	lwidth = (2/8)*100
                    else if(this.d==3) 	lwidth = (1/8)*100
                    else console.log("SOMETHING WENT WRONG!")
                }

                s1.style.paddingLeft = (this.d/8)*100+"%"
                s1.style.width = lwidth+"%"
                s2.style.width = ((3/8)*100)+"%"

            } else {
                sum2.style.display = "none"
                date1.style.display = "none"

                let rleft
                if(this.s==2){
                    if( this.d==4 ) 	rleft = 0
                    else if(this.d==5) 	rleft = (1/8)*100
                    else if(this.d==6) 	rleft = (2/8)*100
                    else console.log("SOMETHING WENT WRONG!")
                } else {
                    rleft = 0
                }

                s1.style.width = (3/8)*100+"%"
                s1.style.paddingLeft = (this.s/8)*100+"%"
                s2.style.paddingLeft = rleft+"%"
            }

            if(this.border) border.style.display = "block"
            else border.style.display = "none"
        }
    },
    template: `<section class="bbbs">

        <span class="full-sum-row">
            <span class="bs-title"
                 @click="$emit('titleClick',meta)"
                 :style="{animation:atitle}">
                {{ meta.title }}
            </span>
        </span>

        <span class="split-sum-row">
            <span title="s1">
                <span class="bs-summary-1" :style="{animation:acopy}">{{ meta.summary }}</span>
                <span class="bs-date-1" :style="{animation:adate}">{{ formatedDate() }}</span>
            </span>
            <span title="s2">
                <span class="bs-date-2" :style="{animation:adate}">{{ formatedDate() }}</span>
                <span class="bs-summary-2" :style="{animation:acopy}">{{ meta.summary }}</span>
            </span>
        </span>

        <span class="bs-mobile">
            <span :style="{animation:adate}">{{ formatedDate() }}</span>
            <span @click="$emit('titleClick',meta)"
                  :style="{animation:atitle}">{{ meta.title }}</span>
            <span :style="{animation:acopy}">{{ meta.summary }}</span>
        </span>

        <span class="bs-border"></span>

    </section>`
})

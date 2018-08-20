Vue.component('work-summary', {
    props:['meta','animIndex','short'],
    data: function(){ return {
        loadedCSS:false,
        css:`
            .bbws {
                width:100%;
                max-width: 1280px;
                margin: 5px auto;
                display:grid;
                grid-template-columns: ${this.short ?
                    '0fr 3fr 4fr' : '2fr 3fr 4fr'};
                grid-column-gap: 20px;
                padding-bottom:10px;
            }

            .bbws > section:nth-child(2){
                border-bottom: 1px solid #c4c4c4;
            }

            .bbws span::-moz-selection { background:#e40477; color:#fff; }
            .bbws span::selection { background:#e40477; color:#fff; }
            .bbws span {
                display: block;
                font-family:"BB_copy";
                font-size: 16px;
                line-height: 24px;
                color: #5f5f5f;
                letter-spacing: 1px;
            }

            .bbws .ws-title {
                font-family:"BB_title";
                color:#000;
                font-size: 42px;
                line-height: 44px;
                letter-spacing: 0.3px;
                cursor:pointer;
            }
            .bbws .ws-title:hover { color:#e40477; }

            .bbws .ws-sub-title {
                font-family:"BB_Thin";
                color:#5f5f5f;
                font-size: 25px;
                line-height: 30px;
                padding-bottom:30px;
                letter-spacing: 0px;
            }

            .bbws .ws-summary {
                padding: 0px 20px 30px 0px;
            }

            .bbws img {
                width:100%; cursor:pointer;
                transition:transform 0.5s, opacity 0.5s;
                transform:scale(0.9); opacity:0;
            }
            .bbws img.show { transform:scale(1); opacity:1; }

            @keyframes bbws-title-in {
                0% { opacity:0; transform:translateX(20px) }
                25% { opacity:0; transform:translateX(20px) }
                100% { opacity:1; transform:translateX(0px) }
            }

            @keyframes bbws-copy-in {
                0% { opacity:0; transform:translateX(-20px) }
                25% { opacity:0; transform:translateX(-20px) }
                100% { opacity:1; transform:translateX(0px) }
            }

            @keyframes bbws-img-in {
                0% { transform:scale(0.9); opacity:0; }
                25% { transform:scale(0.9); opacity:0; }
                100% { transform:scale(1); opacity:1; }
            }

            @media (max-width: 1023px) {
                .bbws { grid-template-columns: 0fr 3fr 4fr; margin:none; }
            }
            @media (max-width: 767px) {
                .bbws { display:block; margin:0px auto 80px auto; }
                .bbws .ws-title { width:90%; margin:0 auto; font-size:32px; }
                .bbws .ws-sub-title { width:90%; margin:0 auto; font-size:20px;  }
                .bbws .ws-summary { width:90%; margin:0 auto; }
            }
        `
    }},
    computed:{
        atitle:function(){ return this.calcAnim('bbws-title-in') },
        acopy:function(){ return this.calcAnim('bbws-copy-in') },
        aimg:function(){ return this.calcAnim('bbws-img-in') },
    },
    mounted:function(){
        // apply scoped CSS
        let name = 'work-summary-css'
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
        //
        let img = this.$refs.img
        if(img.complete){
            img.classList.add('show')
        } else {
            img.addEventListener('load',function(){
                this.classList.add('show')
            })
        }
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
        getURL:function(tag){
            return `/portfolio/filter?tags=${tag}`
        }
    },
    template: `<section class="bbws">

        <section></section>
        <section>
            <span class="ws-title"
                 @click="$emit('titleClick',meta)"
                 :style="{animation:atitle}">
                {{ meta.title }}
            </span>

            <span class="ws-sub-title" :style="{animation:acopy}">
                {{ meta.subTitle }}
            </span>

            <span class="ws-summary" :style="{animation:acopy}">
                {{ meta.summary }}
            </span>
        </section>

        <section>
            <span @click="$emit('titleClick',meta)">
                <img ref="img"
                     :src="'https:'+meta.socialImg"
                     :style="{animation:aimg}"
                     :alt="meta.title">
            </span>
        </section>

    </section>`
})

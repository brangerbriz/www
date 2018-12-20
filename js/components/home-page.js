window.BBComps = window.BBComps ||  {}

window.BBComps.homePage = Vue.component('home-page', {
    data:function(){ return {
        state:store.state,
        ph:{
            idx:1,
            nxt:0,
            arr:['better','accessible','beautiful','smarter',
                 'valuable','informed','worth sharing','real',
                 'better','accessible','beautiful','smarter',
                 'valuable','informed','worth sharing','real']
        }
    }},
    mounted:function(){ this.init(); BBElements() },
    methods:{
        init(){
            this.calcSplashHeight()
            this.calcSloganSizes()
            this.updateSlogan()
            this.calcPageBG()
            this.calcArrow()
            document.addEventListener('scroll',(e)=>{
                if( this.$route.path == "/" ){
                    this.calcPageBG()
                    this.calcVidOpacity()
                    this.calcSloganSizes()
                    this.calcArrow()
                }
            })
            window.addEventListener('resize',(e)=>{
                if( this.$route.path == "/" ){
                    this.calcSplashHeight()
                    this.calcSloganSizes()
                    this.calcPageBG()
                    this.calcArrow()
                }
            })
        },
        calcVidOpacity:function(){
            if( this.$route.path == "/" && this.$refs.splash ){
                let video = this.$refs.splash.querySelector('video')
                video.style.opacity = (innerHeight-scrollY) / (innerHeight*2)
            }
        },
        calcPageBG:function(){
            if(scrollY > innerHeight ) document.body.style.background = "#fff"
            else document.body.style.background = "#000"
        },
        calcSplashHeight:function(){
            let height = innerWidth / (960/540)
            if( innerHeight > height )
                this.$refs.splash.style.height = height+"px"
            else
                this.$refs.splash.style.height = innerHeight+"px"
        },
        sloganTransition:function(){
            if( this.$route.path == "/" && this.$refs.phrase){
                this.$refs.phrase.textContent = this.ph.arr[this.ph.idx]
                this.ph.idx++
                if(this.ph.idx>=this.ph.arr.length) this.ph.idx = 0
                if(this.ph.idx==this.ph.nxt){
                    this.$refs.phrase.textContent = this.ph.arr[this.ph.nxt]
                    this.ph.nxt++
                    if(this.ph.nxt>=this.ph.arr.length) this.ph.nxt = 0
                    this.ph.idx = this.ph.nxt+1
                } else {
                    setTimeout(this.sloganTransition,1000/18)
                }
            }
        },
        updateSlogan:function(){
            if( this.$route.path == "/" )
                setTimeout(this.updateSlogan,Math.random()*2500+2000)
            this.sloganTransition()
        },
        calcArrow:function(){
            if( this.$refs.arrow ){
                l = innerWidth/2 - innerWidth*.3/2
                let t = innerHeight/2.36
                this.$refs.arrow.style.top = t+"px"
                this.$refs.arrow.style.left = l+"px"
                if( innerHeight/scrollY < 3.8 )
                    this.$refs.arrow.style.display = "none"
            }
        },
        calcSloganSizes:function(){
            if( this.$refs.slogan && this.$refs.phrase && this.$refs.scopy ){
                let fs, mid, height = innerWidth / (960/540)
                if( innerHeight > height ) fs = innerWidth*0.06
                else fs = innerWidth*0.042
                this.$refs.slogan.style.fontSize = fs+"px"
                this.$refs.slogan.style.lineHeight = fs/0.79+"px"
                this.$refs.phrase.style.padding = `${fs/5.04}px ${fs/6.2}px 0 ${fs/6.2}px`
                this.$refs.scopy.style.marginTop = `${fs/-2.52}px`
                if( innerHeight > height )
                    mid = height/2 - this.$refs.slogan.offsetHeight/2
                else
                    mid = innerHeight/2 - this.$refs.slogan.offsetHeight/2
                this.$refs.slogan.style.top = mid + scrollY/2 +"px"
            }
        },
        //----------------------------------------------------------------------
        //--------------------------------------------------- link/tag methods
        goToPost:function(post){
            if(post) this.$router.push('/portfolio/'+post.slug)
            else this.$router.push('/portfolio')
        },
        goToService:function(e){
            /*
                // NOTE disabled until we address the following issue:
                // https://github.com/brangerbriz/www/issues/18
                let text = e.target.textContent
                this.$router.push('/search?tags='+e.target.textContent)
            */
        },
        filterURL:function(tag){
            return `/portfolio?tags=${tag.toLowerCase()}`
        }
    },
    template: `<section>

        <home-menu></home-menu>

        <section id="slogan" ref="slogan">
            <img src="images/logo_white.svg" alt="branger_briz">
            <span ref="scopy">
                we make good digital <br>
                ideas <span class="pink" ref="phrase">worth sharing</span>
            </span>
            <svg ref="arrow" class="arrow" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve" fill="#fff"><path d="M23.092,44.335l26.586,12.69c0.012,0.006,0.025,0.004,0.037,0.01c0.051,0.021,0.102,0.027,0.152,0.037  c0.045,0.008,0.088,0.02,0.131,0.02c0.047,0,0.092-0.012,0.141-0.02c0.049-0.01,0.1-0.02,0.146-0.037  c0.012-0.006,0.025-0.004,0.039-0.01l26.584-12.69c0.374-0.18,0.532-0.626,0.354-1c-0.129-0.27-0.397-0.428-0.678-0.428  c-0.107,0-0.218,0.023-0.322,0.074L50,55.518L23.738,42.982c-0.105-0.049-0.215-0.072-0.322-0.072c-0.279,0-0.549,0.156-0.678,0.427  C22.561,43.709,22.717,44.156,23.092,44.335z"></path></svg>
        </section>

        <section id="splash" ref="splash">
            <video autoplay muted loop poster="video/reel.png">
                <source src="video/reel.ogv" type="video/ogv">
                <source src="video/reel.mp4" type="video/mp4">
            </video>
        </section>

        <section id="statement">
            <section class="copy">
                <span class="hide"></span>

                <span>we're a full-service digital agency + lab
                made up of artists, strategists, educators and programmers.
                we produce award winning work for brands, agencies, and
                cultural institutions around the world.</span>
                <span></span>
                <span class="hide"></span>
                <span></span>
                <span>we turn insights into strategy,
                strategy into design and design into innovative
                multi-platform experiences.</span>

            </section>
        </section>

        <section id="services">
            <section>
                <h2>services</h2>
                <span>
                    <h4 @click="goToService($event)">online advertising</h4>
                    positioning<br>
                    strategy<br>
                    campaigns<br>
                    paid media management<br>
                    analysis & optimization<br>
                </span>
                <span>
                    <h4 @click="goToService($event)">platform development</h4>
                    architecture<br>
                    development<br>
                    desktop & mobile<br>
                    VR + AR<br>
                </span>
                <span>
                    <h4 @click="goToService($event)">social</h4>
                    strategy<br>
                    campaigns<br>
                    paid media management<br>
                    analysis & optimization<br>
                </span>
                <span class="break"></span>
                <span>
                    <h4 @click="goToService($event)">experiental interactive </h4>
                    creative ideation<br>
                    design<br>
                    development<br>
                </span>
                <span>
                    <h4 @click="goToService($event)">emerging technologies</h4>
                    research & development<br>
                    prototyping<br>
                    creative ideation<br>
                    integration & deployment<br>
                </span>
            </section>
        </section>

        <section id="lab">
            <section>
                <span></span>
                <h2>digital<br>r+d<br>lab</h2>
                <span class="lab-copy">
                    our dedicated research &amp; development lab is a major part of our process - helping to ensure we produce work for clients that is cutting-edge + contributes to the broader digital landscape. the lab also creates experimental work that provides context + perspective on the misunderstood aspects of the digital ecosystem. if you're interested in diving a little deeper, <a href="http://labs.brangerbriz.com/">check out our r&amp;d lab page</a>.
                </span>
                <span></span>
            </section>

        </section>

        <section id="work">
            <section>
                <h2>work</h2>
                <section v-for="(o,i) in state.featuredTags">
                    <router-link  :key="i" class="tag-link" :to="filterURL(o)">
                    {{o}}</router-link>
                </section>
            </section>
            <section v-for="(p,i) in state.featuredWork">
                <work-summary
                    :short="true"
                    :meta="p"
                    :key="p.slug"
                    :animIndex="i"
                    @titleClick="goToPost">
                </work-summary>
            </section>
        </section>
        <section>
            <span class="more-projects" @click="goToPost()">more projects</span>
        </section>

        <section id="clients">
            <span>a few of the clients we are proud to have worked with</span>
            <section>
                <img src="images/clients/goya.svg" alt="goya">
                <img src="images/clients/tampico.svg" alt="tampico">
                <img src="images/clients/espn.svg" alt="espn">
                <img src="images/clients/baptist_health_south_florida.svg" alt="baptist health">
                <img src="images/clients/patagonia.svg" alt="patagonia">

                <img src="images/clients/benihana.svg" alt="benihana">
                <img src="images/clients/burger_king.svg" alt="burger king">
                <img src="images/clients/verizon.svg" alt="verizon">
                <img src="images/clients/weather_channel.svg" alt="the weather channel">
                <img src="images/clients/medtronic.svg" alt="medtronic">

                <img src="images/clients/warner.svg" alt="warner music group">
                <img src="images/clients/cartier.svg" alt="cartier">
                <img src="images/clients/mca-chicago.svg" alt="museum of contemporary art chicago">
                <img src="images/clients/mcm.svg" alt="miami children's museum">
                <img src="images/clients/pamm.svg" alt="perez art museum miami">
            </section>
        </section>

        <bb-footer id="contact"></bb-footer>

    </section>`
})

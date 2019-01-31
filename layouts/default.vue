<template>
  <section>
    <TheMenu/>
    <nuxt v-if="$store.state.loadingStatus=='ready'" />
    <section v-else>
        <p>Give us a second, we're {{ $store.state.loadingStatus }}</p>
    </section>
    <TheFooter id="contact" v-if="$store.state.loadingStatus=='ready'"/>
  </section>
</template>

<script>
import BBElements from 'BBElements'
import TheMenu from '~/components/TheMenu.vue'
import TheFooter from '~/components/TheFooter.vue'

export default {
  components: { TheMenu, TheFooter },
  mounted(){
    this.$store.dispatch('fetchData')
    BBElements()
  }
}
</script>

<style>
*::-moz-selection, *::selection { background:#e40477; color:#fff; }
@media (max-width: 767px) { * { box-sizing: border-box } }

a {
    color:#e40477; text-decoration:none;
    padding-bottom:2px; cursor:pointer;
}
a:hover, a:hover { color:#e40477; border-bottom:2px solid #e40477; }

#logo { display:inline-block; cursor:pointer; margin-bottom:30px; }
@media (max-width: 767px) { #logo {margin-top:10px;} }

.tag-link {
    font-family:'BB_copy', sans-serif; font-size:16px;
    color:#5f5f5f; background-color:#ebfcff; text-decoration:none;
    padding:9px 10px; margin:0px 6px 10px 0px; display:inline-block;
    cursor: pointer;
}

.tag-link:hover { color:#fff; background-color:#e40477; border:none; }

.tags > a:hover { border-bottom: none; }

/* override BBElements div styles on nuxt elements */
#__nuxt, #__layout { max-width: none; padding: 0; }
</style>

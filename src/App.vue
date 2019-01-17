<template>
    <section>
        <!-- <router-view></router-view> -->
        <!-- <router-view :key="$route.fullPath"></router-view> -->

        <section id="logo" data-mark-only="mobile-right"></section>

        <h1>This is the newly structured BB Site</h1>
        <h3>By Nick Briz</h3>
        <div class="date">Jan 16, 2019</div>

        <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat<span class="marginal-note"
    data-info='[Lorem ipsum](https://www.wikipedia.org/) dolor sit amet,
     [consectetur](https://www.wikipedia.org/) adipisicing elit. Nisi,
     corporis.'></span>. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>

        <section class="media" data-fullwidth="true">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Panorama_puy_de_dome_sud.jpg/1920px-Panorama_puy_de_dome_sud.jpg" alt="Panorama of the [Chaîne des Puys](https://en.wikipedia.org/wiki/Cha%C3%AEne_des_Puys) from [Puy de Dôme](https://en.wikipedia.org/wiki/Puy_de_D%C3%B4me) in winter. [Massif Central](https://en.wikipedia.org/wiki/Massif_Central), France. An example of how past volcanic activity shaped a landscape">
        </section>

        <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem excepturi, atque. Doloremque minima optio facilis nostrum at consectetur architecto commodi ea dolore quam necessitatibus eius minus unde dolorum assumenda, impedit aut fugit provident amet sunt recusandae! Doloremque ullam provident necessitatibus modi perspiciatis repudiandae nostrum dignissimos quasi iure distinctio tenetur officiis, dolorem, consequuntur optio officia ut dicta sunt ratione quibusdam ex repellat. Incidunt laboriosam consectetur cupiditate.
        </p>


<pre class="code">
<code class="js" data-wrap="true">
// here's a code example
let x = 100;
let y = 100;
</code>
</pre>

        <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem excepturi, atque. Doloremque minima optio facilis nostrum at consectetur architecto commodi ea dolore quam necessitatibus eius minus unde dolorum assumenda, impedit aut fugit provident amet sunt recusandae! Doloremque ullam provident necessitatibus modi perspiciatis repudiandae nostrum dignissimos quasi iure distinctio tenetur officiis, dolorem, consequuntur optio officia ut dicta sunt ratione quibusdam ex repellat. Incidunt laboriosam consectetur cupiditate.
        </p>

    </section>
</template>

<script>
    import BBElements from 'BBElements'

    export default {
        name:'App',
        mounted(){
            BBElements()
        }
    }
</script>

<style src="./utils/normalize.css"></style>
<style src="BBElements/css/bb-fonts.css"></style>
<style src="BBElements/css/bb-styles.css"></style>
<style src="BBElements/css/bb-responsive.css"></style>
<style src="BBElements/css/bb-code-colors.css"></style>
<style src="BBElements/css/bb-animations.css"></style>

# Branger_Briz

This branch was started from [this commit](https://github.com/brangerbriz/www/commit/dbf7ed5298d2c8e452fda78e548a66316319b850) for the purpose of refactoring the code base to use Vue's [Single File Components](https://vuejs.org/v2/guide/single-file-components.html) for the purpose of integrating [vue-meta](https://github.com/declandewet/vue-meta). However, after completing the refactoring and incorporating vue-meta we realized that in order for crawlers to see the meta tags being handled by vue-meta server side rendering was required. Rather than implementing [Vue's server side rendering](https://ssr.vuejs.org/) manually, we opted to use [Nuxt.js](https://nuxtjs.org/) instead.

That said, there were some additional changes made to the code base during the refactoring which had nothing to do with vue-meta and are worth noting here, these included:
- replacing our vanilla JS store with [vuex](https://vuex.vuejs.org/)
- during the refactoring I also made updates to [BBElements](https://github.com/brangerbriz/BBElements) so that they may be imported as a module
- as well as numerous smaller improvements and bug fixes which were caught during the refactoring

### dev notes

you must first install dependencies `npm install`

then create `src/store/bbapi.js`, which should look something like this:
```js
export default {
    endpoints:[
        'https://[bb-api-url]/[endpoint]/0',
        'https://[bb-api-url]/[endpoint]/1',
        'https://[bb-api-url]/[endpoint]/2',
        'https://[bb-api-url]/[endpoint]/3',
        '[etc.]'
    ]
}
```
then simply run
```sh
npm run dev # run development server
npm run build # build /dist directory
```

any/all issues/updates should be added as an [issue](https://github.com/brangerbriz/www/issues)

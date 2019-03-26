# Branger_Briz

This is our Branger_Briz homepage

### dev notes

This site is built with [Nuxt.js](https://nuxtjs.org/), see our Nuxt guide for general Nuxt development notes.

you must first install dependencies `npm install`

then create `store/bbapi.js`, which should look something like this:
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
then to run the development server:
```sh
npm run dev
```

to create a build run
```sh
npm run build
```

to run build sever
```sh
npm run start
````

any/all issues/updates should be added as an [issue](https://github.com/brangerbriz/www/issues)

...testing webhook...

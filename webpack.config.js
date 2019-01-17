const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
    module: {
        rules: [
            { test: /\.js$/, use: 'babel-loader' },
            { test: /\.vue$/, use: 'vue-loader' },
            { test: /\.css$/, use: ['vue-style-loader', 'css-loader']},
            { test: /\.(png|jpg|gif|svg)$/, use: 'file-loader' }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ],
    output: {
        publicPath: '/dist/'
    },
    devServer: {
        historyApiFallback:true
    }
}

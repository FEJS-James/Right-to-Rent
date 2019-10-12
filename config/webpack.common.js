const HtmlWebpackPlugin  = require('html-webpack-plugin');
const helper = require('./helpers');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports =  {
    entry: {
        app : "./src/js/index.js"
    },
    resolve: {
        extensions: [ '.js', '.vue' ],
        alias: {
            'vue$': 'vue/dist/vue.runtime.min.js',
            '@': helper.root('src')
          }
    },
    output: {
        path: helper.root('dist'),
        filename: "js/[name].[hash].js",
        chunkFilename: 'js/[name].[hash].js'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            hash: true,
            template: "./src/index.html",
            filename: "index.html",
            chunks: ['app']
        }),
        new CopyPlugin([
            { from: './src/assets/img', to: './assets/img/' }, 
        ]), 
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                include: [ helper.root('src') ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                include: [ 
                    helper.root('src/js')
                ], 
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                loader: 'file-loader'
           },
        ], 
    }
    
};
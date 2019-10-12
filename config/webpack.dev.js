const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = merge(common, {
    mode: 'development',
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    plugins: [ 
        new FriendlyErrorsWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    { 
                        loader: 'css-loader', 
                        options: { sourceMap: true } 
                    },
                ]
            }, 
            {
              test: /\.sass$/,
              use: [
                'vue-style-loader',
                { loader: 'css-loader', options: { sourceMap: true } },
                { loader: 'sass-loader', options: { sourceMap: true } }
              ]
            },
        ]
    }

});
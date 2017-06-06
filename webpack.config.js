//webpack client config

const {resolve} = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const config = require('./webpack.common.config')
const isDev = process.env.NODE_ENV == 'development'


//development
if (isDev) {
    config.devtool = 'cheap-module-eval-source-map'
    config.entry = [
        'webpack-hot-middleware/client?path=http://127.0.0.1:3001/__webpack_hmr',
        'react-hot-loader/patch',
        'babel-polyfill',
        './src/index.js'
    ]
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    )
    config.devServer = {
        hot: true,
        contentBase: resolve(__dirname, './public'),
        publicPath: '/'
    }
    config.module.rules.push({
        test: /\.(css|sass|scss)/,
        use: ['style-loader', 'css-loader', 'sass-loader']
    })
}


//production
if (!isDev) {
    config.entry = './src/index.js'
    config.plugins.push(
        new ExtractTextPlugin('style.css'),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }))
    config.module.rules.push({
        test: /\.(css|sass|scss)/,
        use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader!sass-loader'
            }
        )
    })
}

config.module.rules.push({
    test: /\.(js|jsx)$/,
    exclude: /(node_modules)/,
    enforce: 'pre',
    loader: 'eslint-loader',
})

module.exports = config
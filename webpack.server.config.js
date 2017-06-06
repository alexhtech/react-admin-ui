//webpack server config

const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const config = require('./webpack.common.config')

const isDev = process.env.NODE_ENV == 'development'

//set entry point
config.entry = './server/server.js'

//output
config.output.path = path.resolve(__dirname, 'build')
config.output.filename = 'server.js'

//set the node application
config.target = 'node'

//development
if (isDev) {
}


//production
if (!isDev) {

}


config.module.rules.push({
    test: /\.(css|sass|scss)/,
    use: ExtractTextPlugin.extract({
            use: 'css-loader!sass-loader'
        }
    )
})

config.plugins.push(new ExtractTextPlugin('style.css'))


//rewrite additional plugins to JS/JSX files
config.module.rules[0].use.options.env.development.plugins = []

//remove from server.js all common dependencies
config.externals = [
    (context, request, callback)=> {
        if (request.indexOf('.') != -1) {
            return callback()
        }
        return callback(null, 'commonjs ' + request)
    }

]


config.node = {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
}


module.exports = config

const path = require("path")
const fs = require("fs")
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')

const config = require('./webpack.config')


config.entry = "./server/server.js"

config.target = "node"
config.externals = fs.readdirSync("node_modules")
    .reduce(function (acc, mod) {
        if (mod === ".bin") {
            return acc
        }

        acc[mod] = "commonjs " + mod
        return acc
    }, {})


config.node = {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
}

config.output = {
    path: path.join(__dirname, "build"),
    filename: "server.js",
}

config.plugins = [
    new ExtractTextPlugin('style.css'),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }),
    new webpack.IgnorePlugin(/vertx/)
]


module.exports = config
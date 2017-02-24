const {resolve} = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')


const isDev = process.env.NODE_ENV == 'development'

// const entry = [
//     './src/index.js'
// ]
const plugins = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: isDev ? '"development"' : '"production"'
        },
        _development_: isDev
    }),
    new webpack.optimize.OccurrenceOrderPlugin()
]
if (isDev) {
    // entry.unshift('react-hot-loader/patch')
    // entry.unshift('webpack-hot-middleware/client')
    plugins.push(new webpack.HotModuleReplacementPlugin())
    plugins.push(new webpack.NamedModulesPlugin())
} else {
    plugins.push(new ExtractTextPlugin('style.css'))

    plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }))
}


module.exports = {
    entry: [
        'react-hot-loader/patch',
        'webpack-hot-middleware/client',
        './src/index.js'
    ],
    output: {
        filename: 'bundle.js',
        path: resolve(__dirname, './public'),
        publicPath: 'http://localhost:3000/public/'
    },

    devtool: isDev ? 'cheap-module-eval-source-map' : '',

    devServer: {
        hot: true,
        contentBase: resolve(__dirname, './public'),
        publicPath: '/'
    },

    resolve: {
        extensions: ['.jsx', '.js', '.json', '.scss', '.sass', '.css']
    },

    context: resolve(__dirname),


    module: {
        rules: [
            {
                test: /\.(js|jsx)/,
                exclude: /(node_modules)/,
                enforce: 'pre',
                use: [{loader: 'eslint-loader', options: {rules: {semi: 0}}}],
            },
            {
                test: /\.(js|jsx)/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    babelrc: false,
                    presets: [
                        "react",
                        ["es2015", {"modules": false}],
                        "stage-0"
                    ],
                    plugins: [
                        "transform-runtime",
                        "transform-decorators-legacy",
                        "react-hot-loader/babel"
                    ]
                }
            },
            {
                test: /\.jpg$/,
                use: 'url-loader?limit=10000&mimetype=image/jpg'
            },
            {
                test: /\.png$/,
                use: 'url-loader?limit=10000&mimetype=image/png'
            },
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                use: 'url-loader?limit=10000&mimetype=application/font-woff',
            },
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                use: 'url-loader?limit=10000&mimetype=application/font-woff2',
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                use: 'url-loader?limit=10000&mimetype=application/octet-stream',
            },
            {
                test: /\.otf(\?v=\d+\.\d+\.\d+)?$/,
                use: 'url-loader?limit=10000&mimetype=application/font-otf',
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                use: 'file-loader',
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: 'url-loader?limit=10000&mimetype=image/svg+xml',
            },

            {
                test: /\.(css|sass|scss)/,
                use: isDev ? ['style-loader', 'css-loader', 'sass-loader'] : ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: 'css-loader!sass-loader'
                    }
                )
            },
        ]
    },

    plugins
}
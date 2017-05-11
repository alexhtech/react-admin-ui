const {resolve} = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')


const isDev = process.env.NODE_ENV == 'development'

const config = {
    entry: [],
    output: {
        filename: 'bundle.js',
        path: resolve(__dirname, './public'),
        publicPath: isDev ? 'http://localhost:3000/public/' : '/public/'
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
                use: {
                    loader: 'babel-loader',
                    options: {
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
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev ? '"development"' : '"production"'
            },
            _development_: isDev
        }),
        new webpack.optimize.OccurrenceOrderPlugin()
    ]
}


if (isDev) {
    config.entry = [
        'react-hot-loader/patch',
        'webpack-hot-middleware/client'
    ]
    config.plugins.push(new webpack.HotModuleReplacementPlugin())
    config.plugins.push(new webpack.NamedModulesPlugin())
    config.module.rules.unshift(
        {
            test: /\.(js|jsx)/,
            exclude: /(node_modules)/,
            enforce: 'pre',
            use: [{loader: 'eslint-loader', options: {rules: {semi: 0}}}],
        }
    )
} else {
    config.plugins.push(new ExtractTextPlugin('style.css'))
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }))
}

config.entry.push(
    './src/index.js'
)


module.exports = config

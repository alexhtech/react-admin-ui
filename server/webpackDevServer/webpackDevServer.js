import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())

const webpackConfig = require('../../webpack.config')
    const compiler = require('webpack')(webpackConfig)
    app.use(require('webpack-dev-middleware')(compiler, {
        publicPath: webpackConfig.output.publicPath,
        hot: true,
        stats: {
            colors: true
        },
        noInfo: true
    }))
    app.use(require('webpack-hot-middleware')(compiler))

app.listen(3001, ()=> {
    console.log('Webpack dev server is listening on port 3001!')
})
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Helmet from 'react-helmet'
import {match, RouterContext} from 'react-router'
import {Provider} from 'react-redux'
import {resolve} from 'path'
import express from 'express'
import cookieParser from 'cookie-parser'
import {plugToRequest} from 'react-cookie'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../webpack.config'
import page from './page'
import configureStore from './configureStore'
import {routes} from '../src/Routes'
import {loadOnServer} from 'react-isomorphic-tools'
const app = express();

import config from '../config'

const {baseUrl} = config()

if (process.env.NODE_ENV == 'development') {
    const compiler = webpack(webpackConfig)

    app.use(webpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
        hot: true,
        stats: {

            colors: true
        },
        noInfo: true
    }))

    app.use(webpackHotMiddleware(compiler))
}
app.use(cookieParser())
app.use('/public', express.static(resolve(__dirname, '../public')))
app.get('/favicon:ext', (req, res)=> {
    res.sendFile(resolve(__dirname, `../assets/favicon${req.params.ext}`))
})

app.use((req, res)=> {
    const store = configureStore()
    match({routes, location: req.url}, (err, redirect, renderProps)=> {
        if (err) {
            res.status(500).send('Internal error :(')
        } else if (redirect) {
            res.redirect(302, redirect.pathname + redirect.search)
        } else if (renderProps) {
            const unplug = plugToRequest(req, res)
            loadOnServer({store, renderProps, redirect, baseUrl}).then(
                ()=> {
                    // const html = ReactDOMServer.renderToString(
                    //     <Provider store={store}>
                    //         <RouterContext {...renderProps}/>
                    //     </Provider>)
                    let html = ''
                    const head = Helmet.rewind()
                    res.status(200).send(page({store, head, html}))
                    unplug()
                }
            )
        } else {
            res.status(404).send('Not found')
        }
    })
})

app.listen(3000, ()=> {
    console.log('Listening on port 3000!')
})
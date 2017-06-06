import React from 'react'
import {renderToString} from 'react-dom/server'
import {Helmet} from 'react-helmet'
import {match, RouterContext} from 'react-router'
import {IntlProvider, addLocaleData} from 'react-intl'
import {Provider} from 'react-redux'
import {resolve} from 'path'
import express from 'express'
import cookieParser from 'cookie-parser'
import {plugToRequest} from 'react-cookie'
import page from 'react-isomorphic-tools/server/page'
import configureStore from './configureStore'
import {routes} from '../src/Routes'
import {loadOnServer, setLocale, setUserAgent} from 'react-isomorphic-tools'
const app = express()
import proxy from 'express-http-proxy'
import {ServerStyleSheet} from 'styled-components'
import areIntlLocalesSupported from 'intl-locales-supported'
import config from '../config'

const {origin, defaultLocale, nodeLocales} = config()


if (global.Intl) {
    if (!areIntlLocalesSupported(nodeLocales)) {
        require('intl')
        Intl.NumberFormat = IntlPolyfill.NumberFormat;
        Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
    }
} else {
    global.Intl = require('intl');
}

app.use(cookieParser())
app.use('/public', express.static(resolve(__dirname, '../public')))
app.get('/favicon:ext', (req, res)=> {
    res.sendFile(resolve(__dirname, `../assets/favicon${req.params.ext}`))
})
app.use('/uploads', proxy(origin, {
    forwardPath: (req)=> {
        return '/uploads' + require('url').parse(req.url).path
    }
}))

app.use((req, res)=> {
    const store = configureStore()
    match({routes, location: req.url}, (err, redirect, renderProps)=> {
        if (err) {
            res.status(500).send('Internal error :(')
        } else if (redirect) {
            res.redirect(302, redirect.pathname + redirect.search)
        } else if (renderProps) {
            store.dispatch(setUserAgent(req.get('user-agent')))
            store.dispatch(setLocale(req.cookies.locale || defaultLocale))
            const unplug = plugToRequest(req, res)
            loadOnServer({store, renderProps}).then(
                ()=> {
                    const locale = req.cookies.locale || config().defaultLocale
                    const localeData = require(`react-intl/locale-data/${locale.split('-')[0]}`)
                    const messages = require(`../src/locales/${locale.split('-')[0]}.json`)
                    addLocaleData([...localeData])

                    const sheet = new ServerStyleSheet()
                    const html = renderToString(
                        sheet.collectStyles(
                            <IntlProvider locale={locale} initialNow={new Date()} messages={messages}>
                                <Provider store={store}>
                                    <RouterContext {...renderProps}/>
                                </Provider>
                            </IntlProvider>
                        )
                    )
                    const helmet = Helmet.renderStatic()
                    const css = sheet.getStyleTags()
                    res.status(200).send(page({store, helmet, html, css}))
                    unplug()
                }
            ).catch(({code, to, location, e})=> {
                if (code == 303) {
                    res.redirect(to == '/error' ? to + '?errorData=' + JSON.stringify({location, e}) : to)
                }
            })
        } else {
            res.status(404).send('Not found')
        }
    })
})

app.listen(3000, ()=> {
    console.log('Page server is listening on port 3000!')
})
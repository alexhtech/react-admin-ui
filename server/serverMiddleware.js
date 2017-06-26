import React from 'react'
import {renderToString} from 'react-dom/server'
import {Helmet} from 'react-helmet'
import {resolved} from 'react-isomorphic-tools/lib/loadData'
import createHistory from 'history/createMemoryHistory'
import {renderRoutes} from 'react-router-config'
import {ConnectedRouter} from 'react-router-redux'
import {IntlProvider, addLocaleData} from 'react-intl'
import {Provider} from 'react-redux'
import {plugToRequest} from 'react-cookie'
import page from 'react-isomorphic-tools/server/page'
import configureStore from './configureStore'
import {routes} from '../src/routes'
import {setLocale, setUserAgent, errorHandler, resolveRoutes} from 'react-isomorphic-tools'

import {ServerStyleSheet} from 'styled-components'
import config from '../config'
import queryString from 'query-string'

const {defaultLocale} = config()


const serverMiddleware = async(req, res)=> {
    try {
        const store = configureStore()
        const searchString = queryString.stringify(req.query)
        const search = searchString.length != 0 ? '?' + searchString : ''
        const history = createHistory({
            initialEntries: [req.path + search]
        })

        store.dispatch(setUserAgent(req.get('user-agent')))
        store.dispatch(setLocale(req.cookies.locale || defaultLocale))
        const unplug = plugToRequest(req, res)

        await resolveRoutes({
            routes,
            location: {
                pathname: req.path,
                search
            },
            store
        })

        const locale = req.cookies.locale || config().defaultLocale
        const localeData = require(`react-intl/locale-data/${locale.split('-')[0]}`)
        const messages = require(`../src/locales/${locale.split('-')[0]}.json`)
        addLocaleData([...localeData])

        const sheet = new ServerStyleSheet()
        const html = renderToString(
            sheet.collectStyles(
                <IntlProvider locale={locale} initialNow={new Date()} messages={messages}>
                    <Provider store={store}>
                        <ConnectedRouter history={history}>
                            {renderRoutes(routes)}
                        </ConnectedRouter>
                    </Provider>
                </IntlProvider>))

        const helmet = Helmet.renderStatic()
        const css = sheet.getStyleTags()
        res.status(200).send(page({store, helmet, html, css, resolved}))
        unplug()
    }
    catch (error) {
        errorHandler({error, res, req})
    }


}

export default serverMiddleware
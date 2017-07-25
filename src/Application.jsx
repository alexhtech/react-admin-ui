import React from 'react'
import ReactDOM from 'react-dom'
import {ConnectedRouter} from 'react-router-redux'
import {routes} from './routes'
import {resolveRoutes} from 'react-isomorphic-tools'
import {renderRoutes} from 'react-router-config'
import {Provider} from 'react-redux'
import {AppContainer} from 'react-hot-loader'
import {store, history} from './'
import {IntlProvider, addLocaleData} from 'react-intl'
import config from '../config'

import '../assets/styles/style.sass'
import 'bootstrap/dist/css/bootstrap-grid.min.css'
import 'react-json-pretty/src/JSONPretty.1337.css'

const render = async() => {
    await resolveRoutes({routes, location: history.location, store})

    const locale = store.getState().navigator.locale || config().defaultLocale
    const messages = await import(`./locales/${locale.split('-')[0]}.json`)
    switch (locale){
        case 'ru':
            addLocaleData([...await import('react-intl/locale-data/ru')])
            break;
        case 'en':
            addLocaleData([...await import('react-intl/locale-data/en')])
            break;
    }


    ReactDOM.render(
        <AppContainer>
            <IntlProvider locale={locale} messages={messages}>
            <Provider store={store} key='provider'>
                <ConnectedRouter history={history}>
                    {renderRoutes(routes)}
                </ConnectedRouter>
            </Provider>
            </IntlProvider>
        </AppContainer>,
        document.getElementById('react-root')
    )
}


export {
    render,
    routes
}
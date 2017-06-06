import React from 'react'
import ReactDOM from 'react-dom'
import {Router, match} from 'react-router'
import {routes} from './Routes.jsx'
import {AsyncLoader} from 'react-isomorphic-tools'
import {Provider} from 'react-redux'
import {AppContainer} from 'react-hot-loader'
import {store, history} from './'
import {IntlProvider, addLocaleData} from 'react-intl'
import config from '../config'

const render = () => {
    match({history, routes}, async (error, redirectLocation, renderProps) => {
        const locale = store.getState().getIn(['navigator', 'locale']) || config().defaultLocale
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
                        <Router history={history} {...renderProps}
                                render={(props)=><AsyncLoader {...props}/>}>
                            {routes}
                        </Router>
                    </Provider>
                </IntlProvider>
            </AppContainer>,
            document.getElementById('react-root')
        )
    })
}

export {
    render
}
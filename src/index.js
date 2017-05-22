import React from 'react'
import ReactDOM from 'react-dom'
import {browserHistory} from 'react-router'
import {AppContainer} from 'react-hot-loader'
import {syncHistoryWithStore} from 'react-router-redux'
import {setBaseUrl} from 'react-isomorphic-tools'
import Application from './Application'
import configureStore from './store/configureStore'
import config from '../config'
import 'bootstrap/dist/css/bootstrap.min.css'
import injectTapEventPlugin from 'react-tap-event-plugin'

setBaseUrl(config().baseUrl)
injectTapEventPlugin()

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState (state) {
        return state.get('routing').toJS()
    }
})

const render = () => {
    ReactDOM.render(
        <AppContainer>
            <Application store={store} history={history}/>
        </AppContainer>,
        document.getElementById('root')
    )
}


render()

if (module.hot) module.hot.accept('./Application', render)

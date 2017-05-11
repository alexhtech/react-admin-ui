import {createStore, applyMiddleware, compose} from 'redux'
import Immutable from 'immutable'
import thunkMiddleware from 'redux-thunk'
import {routerMiddleware} from 'react-router-redux'
import {browserHistory} from 'react-router'
import {loadingBarMiddleware} from 'react-redux-loading-bar'
import rootReducer from '../reducers/rootReducer'
import preload from 'react-isomorphic-tools/middlewares/preload'

export default function configureStore() {
    const composeEnhancers = typeof window == 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose

    const store = composeEnhancers(
        applyMiddleware(thunkMiddleware),
        applyMiddleware(
            loadingBarMiddleware({
                promiseTypeSuffixes: ['@@preload/start', '@@preload/finish', '@@preload/error'],
            })
        ),
        applyMiddleware(preload),
        applyMiddleware(routerMiddleware(browserHistory))
    )(createStore)(rootReducer, Immutable.fromJS(typeof window == 'object' ? window.__data : {}))

    if (module.hot) {
        module.hot.accept('../reducers/rootReducer', () => {
            store.replaceReducer(rootReducer)
        })
    }

    return store
}
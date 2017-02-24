import {createStore, applyMiddleware, compose} from 'redux'
import Immutable from 'immutable'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../src/reducers/rootReducer'

export default function configureStore() {
    const initialState = Immutable.Map({})
    return compose(
        applyMiddleware(thunkMiddleware),
    )(createStore)(rootReducer, initialState)
}
import {createStore, applyMiddleware, compose} from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../src/reducers/rootReducer'

export default function configureStore() {
    const initialState = {}
    return compose(
        applyMiddleware(thunkMiddleware),
    )(createStore)(rootReducer, initialState)
}
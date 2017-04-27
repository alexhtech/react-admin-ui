import Immutable from 'immutable'

export default (state = Immutable.Map({}), action) => {
    switch (action.type) {

        case '@@snackbar/open':
            return state.set(action.meta, {open: true, message: action.payload})

        case '@@snackbar/close':
            return state.set(action.meta, {open: false, message: action.payload})
        default:
            return state
    }
}
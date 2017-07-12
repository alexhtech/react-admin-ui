import {SNACKBAR_OPEN, SNACKBAR_CLOSE} from '../constants'

const snackbar = (state = {}, action) => {
    switch (action.type) {
        case SNACKBAR_OPEN:
            return {
                ...state,
                [action.meta.key]: {open: true, message: action.payload, key: action.meta.key, time: action.meta.time}
            }
        case SNACKBAR_CLOSE:
            return {...state, [action.meta.key]: {open: false}}

        default:
            return state
    }
}

export default snackbar
const open = (key, message) => dispatch => {
    dispatch({
        type: '@@snackbar/open',
        meta: key,
        payload: message
    })
}

const close = (key, message) => dispatch => {
    dispatch({
        type: '@@snackbar/close',
        meta: key,
        message: message
    })
}

export {open, close}
let lock = false
export default store => next => action => {
    switch (action.type) {
        case '@@preload/start': {
            lock = true
            next(action)
        }
            break
        case '@@preload/finish': {
            lock = false
            next(action)
        }
            break
        case '@@router/LOCATION_CHANGE': {
            if (!lock) {
                next(action)
            }
        }
            break
        default: {
            next(action)
        }

    }
}
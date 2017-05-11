import {goBack} from 'react-router-redux'
import {getEntity} from '../utils'

const edit = async({fetchToState, params, location, dispatch})=> {
    const entity = getEntity(params.name)
    try {
        await fetchToState(typeof (entity.actions.show.url) == 'function' ? entity.actions.show.url(params, location.query) : `${entity.url}/${params.id}`, {
            params: {...location.query},
            key: `${params.name}Edit`
        })
    }
    catch (e) {
        dispatch(goBack())
    }
}

const list = async({fetchToState, params, location, dispatch})=> {
    const {url, actions:{list: {url: listUrl, params: listParams}}} = getEntity(params.name)
    try {
        await fetchToState(typeof (listUrl) == 'function' ? listUrl(params, location.query) : listUrl || url, {
            params: Object.assign({...location.query}, listParams),
            key: `${params.name}List`
        })
    }
    catch (e) {
        dispatch(goBack())
    }
}

const show = async({fetchToState, params, location, dispatch})=> {
    const entity = getEntity(params.name)
    try {
        await fetchToState(typeof (entity.actions.show.url) == 'function' ? entity.actions.show.url(params) : `${entity.url}/${params.id}`, {
            params: Object.assign({...location.query.params}, entity.actions.show.params),
            key: `${params.name}Show`
        })
    }
    catch (e) {
        dispatch(goBack())
    }
}

export {edit, list, show}
import {getEntity} from "react-admin-ui"

const edit = ({fetchToState, params, location})=> {
    const entity = getEntity(params.name)
    return fetchToState(typeof (entity.actions.show.url) == "function" ? entity.actions.show.url(params, location.query) : `/${params.name}/${params.id}`, {
        params: {...location.query},
        key: `${params.name}Edit`
    })
}

const list = ({fetchToState, params, location})=> {
    const {url, actions:{list: {url: listUrl, params: listParams}}} = getEntity(params.name)
    return fetchToState(typeof (listUrl) == "function" ? listUrl(params, location.query) : listUrl || url, {
        params: Object.assign({...location.query}, listParams),
        key: `${params.name}List`
    })
}

export {edit, list}
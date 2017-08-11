import {fetcher, fetchToState, closeModal} from 'react-isomorphic-tools'
import {SubmissionError} from 'redux-form'
import {push} from 'react-router-redux'
import {open} from '../actions/snackbar'
import isJSON from 'is-json'
import {getEntity} from '../lib'


const list = ({fetchToState, params, location:{query:{filters: queryFilters, ...query}}})=> {
    const entity = getEntity(params.name)

    if(!entity){
        throw {
            code: '303',
            to: '/',
            type: 'redirect'
        }
    }

    const {url: baseUrl, actions:{list: {url: listUrl, params: listParams}}} = entity
    let args = {}

    let filters = queryFilters && isJSON(queryFilters) ? JSON.parse(queryFilters) : undefined

    switch (typeof listUrl) {
        case 'function': {
            const result = listUrl(params, {...query, filters})
            args = typeof result == 'object' ? result : {
                url: result,
                params: Object.assign(query, listParams, {filters})
            }
        }
            break;
        case 'string':
            args = {
                url: listUrl,
                params: Object.assign(query, listParams, {filters})
            }
            break;
        default:
            args = {
                url: baseUrl,
                params: Object.assign(query, listParams, {filters})
            }
            break;
    }


    return fetchToState(args.url, {
        params: args.params,
        key: `${params.name}List`
    })
}

const show = ({fetchToState, params, location:{query}})=> {
    const entity = getEntity(params.name)

    if(!entity){
        throw {
            code: '303',
            to: '/',
            type: 'redirect'
        }
    }

    return fetchToState(typeof (entity.actions.show.url) == 'function' ? entity.actions.show.url(params) : `${entity.url}/${params.id}`, {
        params: Object.assign({...query.params}, entity.actions.show.params),
        key: `${params.name}Show`
    })
}


const handleCreate = (form, dispatch, props) => {
    const {wrapper, url, params = {}, result} = props.entity.actions.create
    let _params = wrapper ? Object.assign(params, {[wrapper]: form}) : Object.assign(form, params)

    return fetcher(typeof (url) == 'function' ? url(props.params, props.query, {form, dispatch, props}) : url, {
        params: typeof result == 'function' ? result(_params) : _params,
        method: 'POST'
    })
}

const handleCreateSuccess = async(result, dispatch, props) => {
    try {
        const {
            entity:{
                actions:{
                    create:{
                        redirect = 'list',
                        handleSubmitSuccessBeforeHook,
                        handleSubmitSuccessAfterHook
                    }
                },
                id = 'id',
                name
            },
            prefix
        } = props

        if (handleSubmitSuccessBeforeHook) await handleSubmitSuccessBeforeHook(result, dispatch, props)
        dispatch(open('successCreated', 'Successfully created'))
        await list({
            fetchToState: (url, params)=>dispatch(fetchToState(url, params)),
            params: props.params,
            location: {query: props.query}
        })
        dispatch(open('listUpdated', 'List has been updated'))
        if (result[id]) {
            switch (redirect) {
                case 'show':
                    dispatch(push(`${prefix}/${name}/${result[id]}`))
                    break
                case 'edit':
                    dispatch(push(`${prefix}/${name}/${result[id]}/edit`))
                    break
                case 'create':
                    dispatch(push(`${prefix}/${name}/create`))
                    break
                default:
                    dispatch(push(`${prefix}/${name}`))
            }
        } else {
            dispatch(push(`${prefix}/${name}`))
        }

        if (handleSubmitSuccessAfterHook) await handleSubmitSuccessAfterHook(result, dispatch, props)
    }
    catch (e) {
        console.log(e)
        // const message = error && error.error && error.error.message || 'Error creation'
        // dispatch(open('errorCreation', message, 5000))
        // throw new SubmissionError({error})
    }

}

const handleCreateFail = async(props, dispatch, {error})=> {
    const message = error && error.error && error.error.message || 'Error creation'
    dispatch(open('errorCreation', message, 5000))
    throw new SubmissionError({error})
}


const handleEdit = (form, dispatch, props) => {
    const {
        actions:{
            edit:{
                wrapper, params = {}, url, method = 'PUT', result
            }
        }
    } = props.entity

    let _params = wrapper ? Object.assign(params, {[wrapper]: form}) : Object.assign(form, params)

    return fetcher(typeof (url) == 'function' ? url(props.params, props.query, {form, dispatch, props}) : `${props.entity.url}/${props.params.id}`, {
        params: typeof result == 'function' ? result(_params) : _params,
        method
    })
}

const handleEditSuccess = async(result, dispatch, props) => {
    try {
        const {
            entity:{
                id = 'id',
                name,
                actions:{
                    redirect = 'list',
                    handleSubmitSuccessBeforeHook,
                    handleSubmitSuccessAfterHook
                }
            },
            params,
            prefix,
            query
        } = props

        if (handleSubmitSuccessBeforeHook) await handleSubmitSuccessBeforeHook(result, dispatch, props)
        dispatch(open('successEdit', 'Successfully saved'))

        await show({fetchToState: (url, params)=>dispatch(fetchToState(url, params)), location: {query}, params})
        await list({fetchToState: (url, params)=>dispatch(fetchToState(url, params)), location: {query}, params})
        dispatch(open('listUpdated', 'List and Show have been updated'))


        if (result[id]) {
            switch (redirect) {
                case 'list':
                    dispatch(push(`${prefix}/${name}`))
                    break
                case 'show':
                    dispatch(push(`${prefix}/${name}/${result[id]}`))
                    break
                case 'stay':
                    break
            }
        } else {
            dispatch(push(`${prefix}/${name}`))
        }
        if (handleSubmitSuccessAfterHook) await handleSubmitSuccessAfterHook(result, dispatch, props)
    }
    catch ({error}) {
        const message = error && error.error && error.error.message || 'Error while saving'
        dispatch(open('errorSaving', message, 5000))
        throw new SubmissionError({error})
    }
}

const handleEditFail = async(props, dispatch, {error})=> {
    const message = error && error.error && error.error.message || 'Error while saving'
    dispatch(open('errorSaving', message, 5000))
    throw new SubmissionError({error})
}

const handleDelete = (id, name, del, query, prefix) => async(dispatch) => {
    try {
        await fetcher(del.url({id}, query), {
            method: 'DELETE'
        })
        dispatch(closeModal('confirmDelete'))
        dispatch(open('itemDelete', 'Successfully deleted'))

        await list({
            fetchToState: (url, params) => dispatch(fetchToState(url, params)),
            params: {name},
            location: {query}
        })
        dispatch(open('listUpdated', 'List has been updated'))

        dispatch(push(`${prefix}/${name}`))
    }
    catch (e) {
        dispatch(open('errorDeleting', 'Error deleting'))
    }
}

export {
    list,
    show,
    handleCreate,
    handleCreateSuccess,
    handleCreateFail,
    handleEdit,
    handleEditSuccess,
    handleEditFail,
    handleDelete
}
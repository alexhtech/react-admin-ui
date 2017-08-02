import {fetcher, Auth} from 'react-isomorphic-tools'
import {push} from 'react-router-redux'
import {AUTH_LOGOUT_SUCCESS, AUTH_ACCOUNT_SUCCESS} from 'react-isomorphic-tools/constants'
import {parse} from 'qs'


const login = async(form, dispatch, props) => {
    const {token, refreshToken} = await fetcher('/login_check', {
        params: form,
        method: 'POST'
    })
    Auth.setToken(token)
    Auth.setRefreshToken(refreshToken)
    await dispatch(loadAccount)
    const query = parse(props.search, {ignoreQueryPrefix: true})
    dispatch(push(query.from ? query.from : '/'))
}

const loadAccount = async(dispatch) => {
    dispatch({
        type: AUTH_ACCOUNT_SUCCESS,
        payload: await fetcher('/profiles/own')
    })
}


const logout = () => (dispatch) => {
    Auth.logout()
    dispatch({
        type: AUTH_LOGOUT_SUCCESS
    })
    dispatch(push('/login'))
}
export {
    login,
    loadAccount,
    logout
}
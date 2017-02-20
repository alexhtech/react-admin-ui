import {fetcher, Auth, goto} from 'react-isomorphic-tools'

export const login = (form) => async (dispatch) => {
    try{
        const response = await fetcher('/login_check', {
            params: form,
            method: 'POST'
        })
        Auth.setToken(response.token)
        Auth.setRefreshToken(response.refreshToken)
        dispatch({
            type: 'LOGIN_SUCCESS',
            payload: await dispatch(getAccount())
        })
    }
    catch (e){
        dispatch({
            type: 'LOGIN_ERROR'
        })
        throw e
    }
}

export const getAccount = () => async (dispatch) => {
    if(!Auth.isAuthenticated()){
        return;
    }
    try{
        const response = await fetcher('/users-self')
        dispatch({
            type: 'ACCOUNT_SUCCESS',
            payload: response
        })
        return response
    }
    catch (e){
        dispatch({
            type: 'ACCOUNT_ERROR'
        })
        throw e
    }
}

export const logout = () => (dispatch) => {
    Auth.logout()
    dispatch({
        type: 'LOGOUT_SUCCESS'
    })
    dispatch(goto('/login'))
}
import {fetchData, Auth} from 'react-security-fetcher'
import {goto} from 'react-isomorphic-render/redux'

export const login = (form) => async (dispatch) => {
    try{
        const response = await fetchData('/login_check', 'POST', {params: form})
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
        const response = await fetchData('/users-self')
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
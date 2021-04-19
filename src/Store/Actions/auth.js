import * as actionTypes from './actionTypes';

export const loginSuccessHandler = (token, personData) => {
    localStorage.setItem('token', token)
    localStorage.setItem('personData',JSON.stringify(personData))
    return {
        type: actionTypes.LOGIN_SUCCESS,
        token,
        personData
    }
}

export const passwordChangeHandler = (token) => {
    return {
        type:actionTypes.PASSWORD_CHANGE,
        token:token
    }
        
}


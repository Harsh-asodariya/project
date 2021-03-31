import * as actionTypes from './actionTypes';

export const loginSuccessHandler = (token,personData) => {
    return{
        type: actionTypes.LOGIN_SUCCESS,
        token,
        personData
    }
}
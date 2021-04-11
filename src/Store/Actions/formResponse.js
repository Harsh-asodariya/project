import * as actionTypes from './actionTypes';

export const setClientFormResponse = (data) => {
    console.log('in setclientFormresponse')
    return {
        type: actionTypes.CLIENT_RESPONSE,
        data
    }
}

export const setOrderFormResponse = (data) => {
    console.log('in setOrderFormresponse')
    return {
        type: actionTypes.ORDER_RESPONSE,
        data
    }
}
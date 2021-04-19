import * as actionTypes from './actionTypes';

export const setClientFormResponse = (data) => {
    return {
        type: actionTypes.CLIENT_RESPONSE,
        data
    }
}

export const setOrderFormResponse = (data) => {
    return {
        type: actionTypes.ORDER_RESPONSE,
        data
    }
}
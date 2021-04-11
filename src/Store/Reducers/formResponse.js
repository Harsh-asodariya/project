import * as actionTypes from '../Actions/actionTypes';

const initialState = {
    client:null,
    order:null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CLIENT_RESPONSE:
            return {
                ...state,
                client : action.data
            }
        case actionTypes.ORDER_RESPONSE:
            return{
                ...state,
                order : action.data
            }
        default:
            return state
    }
}

export default reducer
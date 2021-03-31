import * as actionTypes from '../Actions/actionTypes';

const initialState = {
    authenticated: false,
    token:null,
    personData: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                authenticated: true,
                token:action.token,
                personData: action.personData
            }
        default:
            console.log('Should not reach default')
            return state
    }
}

export default reducer
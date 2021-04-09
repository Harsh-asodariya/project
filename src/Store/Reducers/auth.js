import * as actionTypes from '../Actions/actionTypes';

const initialState = {
    authenticated: false,
    token:null,
    personData: null,
    loading:false
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
        case actionTypes.PASSWORD_CHANGE:
            return{
                ...state,
                token:action.token
            }
        case actionTypes.SIGN_OUT:
            return{
                ...initialState
            }
        case actionTypes.SET_SPINNER:
            return{
                ...state,
                loading:action.value
            }
        default:
            return state
    }
}

export default reducer
import * as ActionTypes from './ActionTypes';
export const Login = ( state = { errMess: null, login:[] }, action ) => {
    switch( action.type ) {
        case ActionTypes.FETCH_LOGIN:
            return{ ...state, errMess:null, login: action.payload };
        
        default:
            return state;
    }
}
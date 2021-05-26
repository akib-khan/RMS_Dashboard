import * as ActionTypes from './ActionTypes';
export const Servers = ( state = { errMess: null, servers:[] }, action ) => {
    switch( action.type ) {
        case ActionTypes.FETCH_SERVERS:
            return{ ...state, errMess:null, servers: action.payload };
        
        default:
            return state;
    }
}
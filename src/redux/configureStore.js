import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Servers } from './servers';
import {Login} from './login'

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            servers: Servers,
            login: Login
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}
import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';
import  { Redirect, withRouter } from 'react-router-dom'
import React from "react";

export const addServers = (servers) => ( {
    type: ActionTypes.FETCH_SERVERS,
    payload: servers
})

export const fetchServers = () => (dispatch) => {
    return fetch( baseUrl + 'servers' )
    .then( response => {
        //console.error("first: ", response);
        if( response.ok )
            return response;
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            console.info("Response is: ",error, " ", response)
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(servers => dispatch(addServers(servers)))
    .catch(error => console.log(error));
}

export const addLogin = (login) => ( {
    type: ActionTypes.FETCH_LOGIN,
    payload: login
})

export const fetchLogin = (user,pass) => (dispatch) => {
    var url = 'login?username='+user+'&password='+pass;
    console.log(baseUrl+url);
    return fetch( baseUrl + url )
    .then( response => {
        if( response.ok ) {
            return response;
            /*var login = response.json();
            console.error("first: ", login);
            if( login.login === true) {
                return <Redirect to='/landing'  />
            }
            else
            return <Redirect to='/login'  />*/
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            console.info("Response is: ",error, " ", response)
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then( response => response.json() )
    .then( login => {
        console.log(" login is: ",login," loginllogin is ", login.login);
        if( login.login === true) {
            console.log("Redirecting?");
            return login;
        }
        else {
            console.log("staying same!");
            this.props.history.push('/login');
            return login;
        }
    })
    .catch(error => console.log(error));
}

export const fetchRMSLimits = (server) => (dispatch) => {
    var url='servers/:'+server;
    console.log("RMSLimts fetch url: ",baseUrl + url);
    return fetch( baseUrl + url )
    .then( response => {
        //console.error("first: ", response);
        if( response.ok )
            return response;
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            console.info("Response is: ",error, " ", response)
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .catch(error => console.log(error));
}
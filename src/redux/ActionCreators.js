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
    var url='servers/'+server;
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
    .then( response => response.json() )
    .then( rmsLimits => {
        console.log(" RMSLimits are: ",rmsLimits);
        return rmsLimits;
    })
    .catch(error => console.log(error));
}

export const postRMSLimits = (server, data) => (dispatch) => {
    var url='servers/'+server;
    console.log("RMSLimts fetch url: ",baseUrl + url);
    return fetch(baseUrl + url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    .then( response => {
        if (response.ok) {
            return response;
          } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
          }
    },
    error => {
        throw error;
    })
    .then(response => response.json())
    .then( response => {
        return response;
    })
    .catch(error =>  { console.log('post rmslimits', error.message); alert('Your limits could not be posted\nError: '+error.message); });
}

export const strategySQOff = (server) => (dispatch) => {
    var url='servers/'+server+'/strategy_sq_off';
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

export const strategyStart = (server) => (dispatch) => {
    var url='servers/'+server+'/strategy_start';
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


export const strategyKill = (server) => (dispatch) => {
    var url='servers/'+server+'/strategy_Kill';
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

export const strategyCancel = (server) => (dispatch) => {
    var url='servers/'+server+'/strategy_Cancel';
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


export const infraSQOff = (server) => (dispatch) => {
    var url='servers/'+server+'/infra_sq_off';
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

export const infraStart = (server) => (dispatch) => {
    var url='servers/'+server+'/infra_start';
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


export const orsSQOff = (server) => (dispatch) => {
    var url='servers/'+server+'/ors_sq_off';
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
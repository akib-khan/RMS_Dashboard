import React from 'react';
import {Link, withRouter} from "react-router-dom";
import LoginForm from "../forms/LoginForm";
import axios from 'axios';
import {Button } from 'semantic-ui-react';
import './beamlogo.jpg';
import {fetchLogin} from '../../redux/ActionCreators'
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    login: state.login
  }
}

const mapDispatchToProps = dispatch => ({
  fetchLogin: (user, pass ) => dispatch( fetchLogin(user,pass) )
});

class LoginPage extends React.Component{

//This gets the data and sends it as a post request
submit = data => {

  this.props.fetchLogin(data.email,data.password)
  .then(login => { 
  console.log(" login1 is: ",login);
  if( login.login === true ) {
    console.log("I am true!");
    this.props.history.push({
      pathname: '/landing',
      state: {login: true}
      }
    );
  }
  else {
    console.log("I am false!");
    this.props.history.push('/login');
  }
  },
  error => {
      var errmess = new Error(error.message);
      throw errmess;
  })
  .catch(error => console.log(error));

    //alert("username: " + data.username);
    //This calls the URL to submit the post request.
    /*axios.get('http://localhost:3001/login',{
      email:data.email,
      password:data.password
    })
    .then(function(response){
      var email = response.data.email;

      //This part is responsible for the window navigation after login.
      response.data.success
      ?  (document.getElementById('status').innerHTML = "Login Successfull! You are being redirected to landing page in 5 seconds.",setTimeout(() => {window.location.replace('/landing?name='+ email)},5000))
      : document.getElementById('status').innerHTML = response.data.message
    });*/

  };

//This renders the HTML code
render(){
  return(

    <div>
          <h3>Login</h3>
          <div >
            <LoginForm submit={this.submit}/>
            <Link to="/registration" className="button">Registration</Link>
          </div>
    </div>

    );
  }
}




export default withRouter(connect(mapStateToProps,mapDispatchToProps)(LoginPage));

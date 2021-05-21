import React from 'react';
import {Link} from "react-router-dom";
import LoginForm from "../forms/LoginForm";
import axios from 'axios';
import {Button } from 'semantic-ui-react';
import './beamlogo.jpg';


class LoginPage extends React.Component{

//This gets the data and sends it as a post request
submit = data => {

    //alert("username: " + data.username);
    //This calls the URL to submit the post request.
    axios.post('http://localhost:3333/api/login',{
      email:data.email,
      password:data.password
    })
    .then(function(response){
      var email = response.data.email;

      //This part is responsible for the window navigation after login.
      response.data.success
      ?  (document.getElementById('status').innerHTML = "Login Successfull! You are being redirected to landing page in 5 seconds.",setTimeout(() => {window.location.replace('/landing?name='+ email)},5000))
      : document.getElementById('status').innerHTML = response.data.message
    });
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




export default LoginPage;

import React, { Component } from 'react';
import {Route} from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import LandingPage from "./components/pages/LandingPage";
import LoginPage from "./components/pages/LoginPage";
import RegistrationPage from "./components/pages/RegistrationPage";



class App  extends Component {
  render() {
    return(
    <div >
  <div className="pulse ">
    <div className="ring"></div>
  </div>
    <header>
    <div className="header-logo">
      <img src="./beamlogo.jpg"/>
    </div>
  </header>

    <section className="hero">
      <Route path="/" exact component = {HomePage}/>
      <Route path="/login" exact component = { props => <LoginPage {...props} /> } />
      <Route path="/registration" exact component = {RegistrationPage}/>
      <Route path="/landing" exact component = { props => <LandingPage {...props} /> } />

    </section>
    </div>
    );
  }
}

export default App;

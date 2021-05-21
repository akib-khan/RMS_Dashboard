import React from 'react';
import {Link} from "react-router-dom";
import {Button} from 'semantic-ui-react';
import './beamlogo.jpg';

const HomePage = () => (
<div className="ui container">
  <h3>Home</h3>
  <Link to='/login' className="button"> Login </Link><br/>
</div>

);

export default HomePage;

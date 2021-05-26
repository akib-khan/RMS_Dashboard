import React from 'react';
import {Link, withRouter, Redirect, Switch } from "react-router-dom";
import {Button } from 'semantic-ui-react';
import RMSTable from './RMSTable';
import StrategyTable from './StrategyTable'
import {fetchServers} from '../../redux/ActionCreators'
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    servers: state.servers
  }
}

const mapDispatchToProps = dispatch => ({
  fetchServers: () => dispatch( fetchServers() )
});


class LandingPage extends React.Component{

//We are declaring the function "getQueryVariable"
  componentDidMount() {
    this.props.fetchServers(); 
  }

  constructor(props){
    super(props);
    this.state = { 
      strategyOpen: false,
      rmsOpen: false,
      infraOpen: false,
      orsOpen: false 
    
    };
    this.getQueryVariable = this.getQueryVariable.bind(this);
    this.openStrategy = this.openStrategy.bind(this);
    this.openRMSLimits = this.openRMSLimits.bind(this);
    this.openInfra = this.openInfra.bind(this);
    this.openORS = this.openORS.bind(this);
  }

//This function decodes the URI and gets the parameters passed to it.
getQueryVariable(variable) {
         var query = window.location.search.substring(1);
         var vars = query.split("&");
         for (var i=0;i<vars.length;i++) {
                 var pair = vars[i].split("=");
                 if(pair[0] === variable){return pair[1];}
         }
         return(false);
}
openStrategy() {
  this.setState(prevState => ({ strategyOpen: !prevState.strategyOpen }));
}

openRMSLimits() {
  this.setState(prevState => ( { rmsOpen: !prevState.rmsOpen }));  
}

openInfra() {
  this.setState(prevState => ( { infraOpen: !prevState.infraOpen }));
}

openORS() {
  this.setState(prevState => ( { orsOpen: !prevState.orsOpen }));
}
/*const servers = (props) => {

}*/
render(){
  //let Strategies;
  //console.log("Landing page render");
  const strategies = () => {
    if( this.state.strategyOpen ) {
      return(
        <React.Fragment>
         <div>
          <Button className="button_cpy" id="Strategies" onClick={this.openStrategy} primary>Start</Button>
          <Button className="button_cpy" id="Strategies" onClick={this.openStrategy} primary>Kill</Button>
          <Button className="button_cpy" id="Strategies" onClick={this.openStrategy} primary>Cancel</Button>
          <Button className="button_cpy" id="Strategies" onClick={this.openStrategy} primary>Sq_Off</Button>
          {/*<Button className="button" id="Strategies" onClick={this.openStrategy} primary>Refresh</Button>*/}
        </div>
        {/*<StrategyTable />*/}
        </React.Fragment>
      );
    }
    else {
      return(
        <React.Fragment>
        </React.Fragment>
      );
    }
  }
  const RMSLimits = this.state.rmsOpen?<RMSTable server={document.getElementById("servers").value}/> : <div></div>;

  const infra = () => {
    if( this.state.infraOpen ) {
      return(
        <React.Fragment>
         <div>
          <Button className="button_cpy" id="Strategies" onClick={this.openStrategy} primary>Start</Button>
          <Button className="button_cpy" id="Strategies" onClick={this.openStrategy} primary>Sq_Off</Button>
          {/*<Button className="button" id="Strategies" onClick={this.openStrategy} primary>Refresh</Button>*/}
        </div>
        </React.Fragment>
      );
    }
    else {
      return(
        <React.Fragment>
        </React.Fragment>
      );
    }
  }

  const ors = () => {
    if( this.state.orsOpen ) {
      return(
        <React.Fragment>
         <div>
          <Button className="button_cpy" id="Strategies" onClick={this.openStrategy} primary>Sq_Off</Button>
          {/*<Button className="button" id="Strategies" onClick={this.openStrategy} primary>Refresh</Button>*/}
        </div>
        </React.Fragment>
      );
    }
    else {
      return(
        <React.Fragment>
        </React.Fragment>
      );
    }
  }

  const RenderServers = () => {
    if( (this.props.servers.servers === null) || this.props.servers.servers.length===0 ) {
      return(
        <React.Fragment>
        <option value="21.33">21.33</option>
        <option value="20.19">20.19</option>
        <option value="20.13">20.13</option>
        <option value="20.16">20.16</option>
        </React.Fragment>
      )
    }
    else {
      return (
        this.props.servers.servers.map( (server, index) => {
          return (
          <option key={index}>{server.name} </option>
          )  
        })
      )
    }
  
  }

  const location=this.props.location;
  console.log("Location is: ",location);
  if( ( location.state === undefined ) || ( location.state.login !== true ) ) {
    return (
      <Switch>
        <Redirect to='/login'  />
      </Switch>
    )
  } 
  else {
    return(
      <div className="ui container">
        <h2>RMS DashBoard</h2>
        <div>
        <label htmlFor="servers">Choose a server:</label>
        <select name="servers" id="servers">
          {/*<option value="21.33">21.33</option>
          <option value="20.19">20.19</option>
          <option value="20.13">20.13</option>
          <option value="20.16">20.16</option>*/}
            {RenderServers()}
        </select>
        </div>
        <div>
        <Button id="Strategies" onClick={this.openStrategy} >Strategy</Button>
        {strategies()}
        </div>
        <div>
        <Button id="RMSLimits" onClick={this.openRMSLimits} >RMS_Limits</Button>
        {/*<Link className="button" >Login</Link>*/}
        {RMSLimits}
        </div>
        <div>
        <Button id="Infra" onClick={this.openInfra} >Infra</Button>
        {infra()}
        </div>
        <div>
        <Button id="ORS" onClick={this.openORS} >ORS</Button>
        {ors()}
        </div>
      </div>

    );
  }
}

}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(LandingPage));

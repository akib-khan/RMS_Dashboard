import React from 'react';
import {Link} from "react-router-dom";
import {Button } from 'semantic-ui-react';
import RMSTable from './RMSTable';
import StrategyTable from './StrategyTable'
class LandingPage extends React.Component{

//We are declaring the function "getQueryVariable"
  constructor(props){
    super(props);
    this.state = { strategyOpen: false,
      rmsOpen: false };
    this.getQueryVariable = this.getQueryVariable.bind(this);
    this.openStrategy = this.openStrategy.bind(this);
    this.openRMSLimits = this.openRMSLimits.bind(this);
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
render(){
  //let Strategies;
  const strategies = () => {
    if( this.state.strategyOpen ) {
      return(
        <React.Fragment>
        {/*
        <div>
          <Button className="button1" id="Strategies" onClick={this.openStrategy} primary>Start</Button>
          <Button className="button1" id="Strategies" onClick={this.openStrategy} primary>Kill</Button>
          <Button className="button1" id="Strategies" onClick={this.openStrategy} primary>Cancel</Button>
          <Button className="button1" id="Strategies" onClick={this.openStrategy} primary>Sq_Off</Button>
          <Button className="button1" id="Strategies" onClick={this.openStrategy} primary>Refresh</Button>
        </div>
        <div>
          <Button className="button1" id="Strategies" onClick={this.openStrategy} primary>pid</Button>
          <Button className="button1" id="Strategies" onClick={this.openStrategy} primary>core</Button>
          <Button className="button1" id="Strategies" onClick={this.openStrategy} primary>Kill</Button>
          <Button className="button1" id="Strategies" onClick={this.openStrategy} primary>Cancel</Button>
          <Button className="button1" id="Strategies" onClick={this.openStrategy} primary>Sq_Off</Button>
        </div>
        <div>
          <Button className="button1" id="Strategies" onClick={this.openStrategy} primary>pid</Button>
          <Button className="button1" id="Strategies" onClick={this.openStrategy} primary>core</Button>
          <Button className="button1" id="Strategies" onClick={this.openStrategy} primary>Kill</Button>
          <Button className="button1" id="Strategies" onClick={this.openStrategy} primary>Cancel</Button>
          <Button className="button1" id="Strategies" onClick={this.openStrategy} primary>Sq_Off</Button>
        </div>*/ }
         <div>
          <Button className="button" id="Strategies" onClick={this.openStrategy} primary>Start</Button>
          <Button className="button" id="Strategies" onClick={this.openStrategy} primary>Kill</Button>
          <Button className="button" id="Strategies" onClick={this.openStrategy} primary>Cancel</Button>
          <Button className="button" id="Strategies" onClick={this.openStrategy} primary>Sq_Off</Button>
          <Button className="button" id="Strategies" onClick={this.openStrategy} primary>Refresh</Button>
        </div>
        <StrategyTable />
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
  const RMSLimits = this.state.rmsOpen?<RMSTable /> : <div></div>;
  return(
    <div className="ui container">
      <h2>RMS DashBoard</h2>
      <div>
      <label htmlFor="servers">Choose a server:</label>
      <select name="servers" id="servers">
        <option value="21.33">21.33</option>
        <option value="20.19">20.19</option>
        <option value="20.13">20.13</option>
        <option value="20.16">20.16</option>
      </select>
      </div>
      <div>
      <Button id="Strategies" onClick={this.openStrategy} >Strategy</Button>
      {strategies()}
      </div>
      <Button id="Strategies" onClick={this.openRMSLimits} >RMS_Limits</Button>
      {/*<Link className="button" >Login</Link>*/}
      {RMSLimits}

    </div>

  );

}

}
export default LandingPage;

import React, { Component } from 'react';
import './App.css';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Incomings from './components/Incomings/Incomings';
//import DateTime from './components/DateTimePalett';

class App extends Component {
  constructor() {
    super();
    this.state = {
      route: 'signin',
      user: {
        /*fullname: '',
        username: '',
        email: '',
        household: '',
        joined: ''*/
      }
    }
  }

  loadUser = (data) => {
    this.setState({ user: data })
  }

  onRouteChange = (route) => {
    this.setState({route: route})
  }

  renderSwitch (route){
    switch (route) {
      case 'signin' : return <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>;
      case 'register': return <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>;
      case 'summary' : return <Incomings user={this.state.user} />;
      default:
    }
  }

  render() {
    const { route } = this.state;
    return (
      <div className='App'>
        {this.renderSwitch(route)}
        {/*<DateTime />*/}
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Incomings from './components/Incomings/Incomings';
//import DateTime from './components/DateTimePalett';

import { onRouteChange, loadUser } from './actions';

const mapStateToProps = state => {
  return {
    route: state.onRouteChange.route,
    user: state.loadUser.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRouteChange: (route) => dispatch(onRouteChange(route)),
    loadUser: (data) => dispatch(loadUser(data))
  }
}

class App extends Component {

  /*loadUser = (data) => {
    this.setState({ user: data })
  }

  onRouteChange = (route) => {
    this.setState({route: route})
  }*/

  renderSwitch (route){
    const { onRouteChange, loadUser, user } = this.props;
    switch (route) {
      case 'signin' : return <SignIn loadUser={loadUser} />;
      case 'register': return <Register loadUser={loadUser} onRouteChange={onRouteChange}/>;
      case 'summary' : return <Incomings user={user} />;
      default:
    }
  }

  render() {
    const { route } = this.props;
    return (
      <div className='App'>
        {this.renderSwitch(route)}
        {/*<DateTime />*/}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

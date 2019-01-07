import React from 'react';
import { connect } from 'react-redux';
import { setUsernameField, setPasswordField, onSubmitSignIn } from './actions';
import { onRouteChange } from '../../actions'

const mapStateToProps = state => {
  return {
    username: state.valueChange.username,
    password: state.valueChange.password,
    alert: state.setAlert.alert
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUserChange: (event) => dispatch(setUsernameField(event.target.value)),
    onPasswordChange: (event) => dispatch(setPasswordField(event.target.value)),
    onRouteChange: (route) => dispatch(onRouteChange(route)),
    onSubmitSignIn: () => dispatch(onSubmitSignIn())
  }
}

class SignIn extends React.Component {
  
  onRegister = () => {
    this.props.onRouteChange('register');
  }
  
  render() {
    const { onUserChange, onPasswordChange, alert, onSubmitSignIn } = this.props;
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Username</label>
              <input
                onChange={onUserChange}
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                 />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input
                onChange={onPasswordChange}
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                />
            </div>
          </fieldset>
          <div className="">
            <input
            onClick={onSubmitSignIn}
            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
            type="submit"
            value="Sign in"
            />
          </div>
          <div className="lh-copy mt3">
            <p
              onClick={this.onRegister}
              className="f6 link dim black db pointer">Register</p>
          </div>
        </div>
        <div className='gold'>{alert}</div>
      </main>
      </article>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

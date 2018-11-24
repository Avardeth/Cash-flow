import React from 'react';
import Registry from './Registry';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: props.route,
      obj: [],
    }
  }

  reg = [
    {
      id: 'fullname',
      name: 'Full name:',
      type: 'text'
    },
    {
      id: 'username',
      name: 'Username:',
      type: 'text'
    },
    {
      id: 'email',
      name: 'Email:',
      type: 'email'
    },
    {
      id: 'password',
      name: 'Password:',
      type: 'password'
    },
    {
      id: 'confpassword',
      name: 'Confirm Password:',
      type: 'password'
    },
    {
      id: 'household',
      name: 'Household:',
      type: 'text'
    },
  ]



  properties(regs) {
    return regs.map((reg, i) => <Registry key={i} id={reg.id} name={reg.name} type={reg.type} />);
  }


  onChange = () => {
    //making an object from the user's data
    let temps = {}
    const temp = (regs) =>
      regs.filter((reg, i) =>
        {if (reg.id === 'confpassword') {return false} return true})
          .map((reg, i) =>  {
            let val = document.getElementById(reg.id)
            temps[reg.id] = val.value
            return temps
          })
    const tp = temp(this.reg)

    this.setState({obj: tp[0]}, () =>
    {
      //checking if any of the field is empty
      let isFilled = (objs) =>
        {return Object.values(objs).reduce((acc=true, cur, i, obj) =>
           {if (obj[i]) cur = true; else cur = false; return (acc && cur)} )}
      isFilled = isFilled(this.state.obj)

      //checking the two passwords
      let passcheck = () => {
        const pass = document.getElementById('password')
        const confpass = document.getElementById('confpassword')
        if (pass.value && confpass.value && pass.value === confpass.value) {
          return true;
        } else {
          return false;
        }
      }
      passcheck = passcheck()

      //register the user datas if everything is fine
      if (isFilled && passcheck){
        fetch('http://localhost:3001/cashflow/register', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(this.state.obj)
        }).then(response => response.json)
        .then(this.props.onRouteChange('summary'))
      }
    })
  }


  render() {
    return (
      <article className='br3 ba mv4 w-100 mw6 shadow-5 center'>
        <main>
          <h1 className='tc'>Register</h1>
          <div>{this.properties(this.reg)}</div>
          <div className='w-20 pa4 center'>
            <input onClick={this.onChange} type='button' value='Submit' />
          </div>
          <div className='w-40 pa3 center'>
            <input type='button' value='New household register' />
          </div>
        </main>
      </article>
    );
  }
}

export default Register;

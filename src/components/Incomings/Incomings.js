import React from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Tables from './Tables';
import Row from './Row';
import './style.css';
import url from '../url';

class Incomings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      table1: [],
      table2: [],
      rout: 'summary',
      members: [],
      valuetypetop: '',
      valuetypebottom: '',
      t1: {
        name: '',
        value: '',
        recurValue: '',
        occupant: ''
      }
    }
  }

  onT1NameChange = (event) => {
    this.setState(Object.assign(this.state.t1, {name: event.target.value}))
  }

  onT1ValueChange = (event) => {
    this.setState(Object.assign(this.state.t1, {value: parseInt(event.target.value)}))
  }

  onrecurChange = (recurValue) => {
    this.setState(Object.assign(this.state.t1, {recurValue}))
  }

  onoccupChange = (occupant) => {
    this.setState(Object.assign(this.state.t1, {occupant}))
  }

  onSubmit = () => {
    const { user, t1, valuetypetop,  } = this.state;

    fetch(`${url}/cashflow/updatetable`, {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: t1.name,
        value: t1.value,
        recurrence: t1.recurValue,
        occupant: t1.occupant,
        household: user.household,
        valuetype: valuetypetop
      })
    })
      .then(response => response.json())
      .then(this.setState({table1:[], t1:{name:'', value:''}}))
      .then(() => this.tb1())
      
  }

  tb1 = () => {
    fetch(`${url}/cashflow/${this.state.user.household}/${this.state.valuetypetop}`)
      .then(response => response.json())
      .then(data => this.setState({ table1: data }))
  }

  tb2 = () => {
    fetch(`${url}/cashflow/${this.state.user.household}/${this.state.valuetypebottom}`)
      .then(response => response.json())
      .then(data => this.setState({ table2: data }))
  }

  tableswitch = () => {
    switch(this.state.rout) {
      case 'summary': 
        this.setState({valuetypetop: 2}, () => {
          this.tb1()
        })
        this.setState({valuetypebottom: 4}, () => {
          this.tb2()
        })
        break;
      
      default:
    }
  }
  
  componentDidMount(){
    const { household } = this.state.user;

    fetch(`${url}/cashflow/members/${household}`)
      .then(response => response.json())
      .then(obj => {
        const array = Array.from(obj.map((user, i) => obj[i].fullname))
        array.unshift('Summary')
        return array
      })
      .then(users => this.setState({ members: users}))

    this.tableswitch()
  }

  render() {
    const { user, table1, table2, members, t1 } = this.state;

    console.log('render', this.state.t1);
    
    /*const createRow = () => {
      console.log('ok');
      document.getElementsByClassName('test').innerHTML = <Row />;
    }*/

    const tableTop = table1.map((user, i) =>
      <Tables
        key={i}
        name={table1[i].name}
        value={table1[i].value}
        recur={table1[i].recurrence}
        date={table1[i].date}
        appt={table1[i].occupant}
      />
    )

    const tableBottom = table2.map((user, i) =>
      <Tables
        key={i}
        name={table2[i].name}
        value={table2[i].value}
        recur={table2[i].recurrence}
        date={table2[i].date}
        appt={table2[i].occupant}
      />
    )

    /*const sum = table1.map((user, i) => table1[i].value)
                .reduce((acc, value) => acc + value)
    const realval = Inc.map((user, i) => Inc[i].real)
                .reduce((acc, value) => acc + value)*/

    return (
      <div>
        <div className='tc pa3 title'>{user.household} / {user.fullname}({user.username})</div>
        <Dropdown
          className='w-20 tc'
          options={members}
          value={members[0]}
          placeholder={members[0]}
        />
      <div className='pa4 cf f5'>
          <div className=' tc mw8 center mv5'>
            <table className='center w-80'>
              <thead className='bg-white-50'>
                <tr>
                  <th>Name</th>
                  <th>Anticipated Value</th>
                  <th>Recurrence</th>
                  <th>Appertain to</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {tableTop ? tableTop : <tr>Loading</tr>}
                <Row 
                  user={user} 
                  onNameChange={this.onT1NameChange} 
                  onValueChange={this.onT1ValueChange}
                  onrecurChange={this.onrecurChange}
                  onoccupChange={this.onoccupChange}
                  onSubmit={this.onSubmit}
                  name={t1.name}
                  value={t1.value}
                />
                <tr className='test'>
                  <td>{/*<input onClick={this.onSubmit} type='button' value='+'/>*/}</td>
                </tr>
                <tr>
                  <td className='pv3 pr3 bt'>Sum:</td>
                  <td className='pv3 pr3 bt'></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='tc mw8 center'>
            <table className='center w-80'>
              <thead className='bg-white-50'>
                <tr>
                  <th>Name</th>
                  <th>Concrete value</th>
                  <th>Recurrence</th>
                  <th>Appertain to</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {tableBottom ? tableBottom : <tr>Loading</tr>}
                <Row user={user}/>
                <tr>
                  <td className='pv3 pr3 bt'>Sum:</td>
                  <td className='pv3 pr3 bt'></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Incomings;

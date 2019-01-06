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
        recurValue: 'Select',
        occupant: 'Select'
      },
      retval: '',
      rowActive: false
    }
    this.tb = this.tb.bind(this);
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

  onClick = () => {
    this.setState({rowActive: true})
  }


  onSubmit = (t, valuetype) => {
    const { user } = this.state;
    
    return fetch(`${url}/cashflow/updatetable`, {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: t.name,
        value: t.value,
        recurrence: t.recurValue,
        occupant: t.occupant,
        household: user.household,
        valuetype: valuetype
      })
    })
      .then(response => response.json())
  }

  tb = (valuetype) => {
    return fetch(`${url}/cashflow/${this.state.user.household}/${valuetype}`)
      .then(response => response.json())   
  }

  tableswitch = () => {
    switch(this.state.rout) {
      case 'summary': 
        this.setState({valuetypetop: 2}, () => {
          this.tb(this.state.valuetypetop).then(data=>this.setState({table1: data}))
        })
        this.setState({valuetypebottom: 4}, () => {
          this.tb(this.state.valuetypebottom).then(data=>this.setState({table2: data}))
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

  tables = (table) => {
    return table.map((user, i) =>
      <Tables
        key={i}
        name={table[i].name}
        value={table[i].value}
        recur={table[i].recurrence}
        date={table[i].date}
        appt={table[i].occupant}
      />
    )
  }

  render() {
    const { user, table1, table2, members, t1, rowActive } = this.state;

    const tableTop = this.tables(table1)

    const tableBottom = this.tables(table2)

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
                  t1={t1}
                  onNameChange={this.onT1NameChange} 
                  onValueChange={this.onT1ValueChange}
                  onrecurChange={this.onrecurChange}
                  onoccupChange={this.onoccupChange}
                  onSubmit={() => {
                    this.onSubmit(t1, this.state.valuetypetop)
                      .then(this.setState({table1:[], t1:{name:'', value:'', recurValue:'Select', occupant:'Select'}}))
                      .then(() => this.tb(this.state.valuetypetop).then(data=>this.setState({table1: data})))
                    }}
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
                {rowActive ? <Row user={user}/> : <tr><td><input type='button' onClick={this.onClick} value='+' /></td></tr>}
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

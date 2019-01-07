import React from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Tables from './Tables';
import Row from './Row';
import './style.css';
import url from '../url';
import { connect } from 'react-redux';
import { fetchMembers, fetchTables, setValueType } from './actions';

const mapStateToProps = state => {
  return {
    user: state.loadUser.user,
    route: state.onRouteChange.route,
    members: state.setMembers.members,
    table: state.setTables.tabletop
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMembers: (array) => dispatch(fetchMembers(array)),
    fetchTables: () => dispatch(fetchTables()),
    setValueTypeTop: (num) => dispatch(setValueType(num))
  }
}

class Incomings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      table1: [],
      table2: [],
      members: [],
      valuetypetop: '',
      valuetypebottom: '',
      retval: '',
      rowActive: false
    }
    this.tb = this.tb.bind(this);
  }

 
  onClick = () => {
    this.setState({rowActive: true})
  }


  onSubmit = (t, valuetype) => {
    const { user } = this.props;
    
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
    return fetch(`${url}/cashflow/${this.props.user.household}/${valuetype}`)
      .then(response => response.json())
  }

  tableswitch = () => {
    switch(this.props.route) {
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
    this.props.fetchMembers()
    this.props.setValueType(2)
    this.props.fetchTables()
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
    const { table1, table2, t1, rowActive } = this.state;
    const { user, members, table } = this.props;

    
    const tableTop = this.tables(table)

    const tableBottom = [] //= this.tables(table2)

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

export default connect(mapStateToProps, mapDispatchToProps)(Incomings);

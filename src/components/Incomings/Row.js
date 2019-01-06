import React from 'react';
import url from '../url';
import Dropdown from 'react-dropdown';

class Row extends React.Component {
  constructor(props){
    super();
    this.state = {
      user: props.user,
      members: [],
      recurrence: [],
      onNameChange: props.onNameChange,
      onValueChange: props.onValueChange,
      onSubmit: props.onSubmit
    }
  }

  onrecurChange = (event) => {
    this.props.onrecurChange(event.value)
    this.setState({valRecur: event.value})
  }

  onoccupChange = (event) => {
    this.props.onoccupChange(event.value)
    this.setState({valMember: event.value})
  }

  componentDidMount(){
    const { household } = this.state.user;
    fetch(`${url}/cashflow/recur`)
      .then(response => response.json())
      .then(obj => Array.from(obj.map((user, i) => obj[i].name)))
      .then(names => this.setState({ recurrence: names}))

    fetch(`${url}/cashflow/members/${household}`)
      .then(response => response.json())
      .then(obj => Array.from(obj.map((user, i) => obj[i].fullname)))
      .then(users => this.setState({ members: users }))
  }

  render() {
    const { members, recurrence, onNameChange, onValueChange, onSubmit } = this.state;
    return (
      <tr>
        <td className='pv3 pr3 bb b--black-20'>
          <input onChange={onNameChange} value={this.props.t1.name} className='tc' type='text' />
        </td>
        <td className='pv3 pr3 bb b--black-20'>
          <input onChange={onValueChange} value={this.props.t1.value} type='text' />
        </td>
        <td className='pv3 pr3 bb b--black-20'>
        <Dropdown
          onChange={this.onrecurChange}
          className='f6'
          options={recurrence}
          value={this.props.t1.recurValue}
          placeholder=''
        />
        </td>
        <td className='pv3 pr3 bb b--black-20'>
        <Dropdown
          onChange={this.onoccupChange}
          className='f6'
          options={members}
          value={this.props.t1.occupant}
          placeholder=''
        /></td>
        <td className='pv3 pr3 bb b--black-20'><input onClick={onSubmit} type='submit' value='Submit' /></td>
      </tr>
    );
  }
}

export default Row;

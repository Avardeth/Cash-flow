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

  onrecurChangey = (event) => {
    this.props.onrecurChange(event.value)
  }

  onoccupChange = (event) => {
    this.props.onoccupChange(event.value)
  }

  componentDidMount(){
    const { household } = this.state.user;
    fetch(`${url}/cashflow/recur`)
      .then(response => response.json())
      .then(obj => {
        const recurArray = Array.from(obj.map((user, i) => obj[i].name))
        return recurArray
      })
      .then(names => this.setState({ recurrence: names}))

      fetch(`${url}/cashflow/members/${household}`)
      .then(response => response.json())
      .then(obj => {
        const array = Array.from(obj.map((user, i) => obj[i].fullname))
        return array
      })
      .then(users => this.setState({ members: users }))
  }

  render() {
    const { members, recurrence, onNameChange, onValueChange, onSubmit } = this.state;
    return (
      <tr>
        <td className='pv3 pr3 bb b--black-20'><input onChange={onNameChange} className='tc' type='text' /></td>
        <td className='pv3 pr3 bb b--black-20'><input onChange={onValueChange} type='text' /></td>
        <td className='pv3 pr3 bb b--black-20'>
        <Dropdown
          onChange={this.onrecurChangey}
          className='f6'
          options={recurrence}
          value={recurrence[0]}
          placeholder={recurrence[0]}
        />
        </td>
        <td className='pv3 pr3 bb b--black-20'>
        <Dropdown
          onChange={this.onoccupChange}
          className='f6'
          options={members}
          value={members[0]}
          placeholder={members[0]}
        /></td>
        <td className='pv3 pr3 bb b--black-20'><input onClick={onSubmit} type='submit' value='Submit' /></td>
      </tr>
    );
  }
}

export default Row;

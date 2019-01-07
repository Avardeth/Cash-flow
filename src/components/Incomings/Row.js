import React from 'react';
import url from '../url';
import Dropdown from 'react-dropdown';
import { connect } from 'react-redux';
import { setNameField, setValueField, setRecurrenceField, setOccupantField } from './actions';

const mapStateToProps = state => {
  return {
    user: state.loadUser.user,
    name: state.setValues.name,
    value: state.setValues.value,
    recur: state.setValues.recur,
    occup: state.setValues.occup
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onNameChange: (event) => dispatch(setNameField(event.target.value)),
    onValueChange: (event) => dispatch(setValueField(event.target.value)),
    onrecurChange: (event) => dispatch(setRecurrenceField(event.value)),
    onoccupChange: (event) => dispatch(setOccupantField(event.value))
  }
}

class Row extends React.Component {
  constructor(props){
    super();
    this.state = {
      
      members: [],
      recurrence: [],
      onSubmit: props.onSubmit
    }
  }

  componentDidMount(){
    const { household } = this.props.user;
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
    const { members, recurrence, onSubmit } = this.state;
    const { name, value, recur, occup, onNameChange, onValueChange, onrecurChange, onoccupChange } = this.props;
    return (
      <tr>
        <td className='pv3 pr3 bb b--black-20'>
          <input onChange={onNameChange} value={name} className='tc' type='text' />
        </td>
        <td className='pv3 pr3 bb b--black-20'>
          <input onChange={onValueChange} value={value} type='text' />
        </td>
        <td className='pv3 pr3 bb b--black-20'>
        <Dropdown
          onChange={onrecurChange}
          className='f6'
          options={recurrence}
          value={recur}
          placeholder='Select'
        />
        </td>
        <td className='pv3 pr3 bb b--black-20'>
        <Dropdown
          onChange={onoccupChange}
          className='f6'
          options={members}
          value={occup}
          placeholder='Select'
        /></td>
        <td className='pv3 pr3 bb b--black-20'><input onClick={onSubmit} type='submit' value='Submit' /></td>
      </tr>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Row);

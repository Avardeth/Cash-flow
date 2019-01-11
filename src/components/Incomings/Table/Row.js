import React from 'react';
import Dropdown from 'react-dropdown';
import { connect } from 'react-redux';
import { 
  setNameField,
  setValueField,
  setRecurrenceField,
  setOccupantField,
  updateTable,
  fetchRecurrence,
  fetchOccupant
} from '../actions';

const mapStateToProps = state => {
  return {
    user: state.loadUser.user,
    name: state.setValues.name,
    value: state.setValues.value,
    recur: state.setValues.recur,
    occup: state.setValues.occup,
    recurrence: state.setRecurrence.recurrence,
    occupant: state.setOccupant.occupant
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onNameChange: (event) => dispatch(setNameField(event.target.value)),
    onValueChange: (event) => dispatch(setValueField(event.target.value)),
    onrecurChange: (event) => dispatch(setRecurrenceField(event.value)),
    onoccupChange: (event) => dispatch(setOccupantField(event.value)),
    onSubmit: () => dispatch(updateTable()),
    fetchRecurrence: (array) => dispatch(fetchRecurrence(array)),
    fetchOccupant: (array) => dispatch(fetchOccupant(array))
  }
}

class Row extends React.Component {

  componentDidMount(){
    this.props.fetchRecurrence();
    this.props.fetchOccupant()
  }

  render() {
    const {
      name, value, recur, occup, recurrence, occupant,
      onNameChange, onValueChange, onrecurChange, onoccupChange
    } = this.props;
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
          options={occupant}
          value={occup}
          placeholder='Select'
        /></td>
        <td className='pv3 pr3 bb b--black-20'><input onClick={this.props.onSubmit} type='submit' value='Submit' /></td>
      </tr>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Row);

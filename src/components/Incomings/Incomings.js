import React from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './style.css';
import { connect } from 'react-redux';
import { fetchMembers, fetchTables, setValueType } from './actions';
import Table from './Table/Table';

const mapStateToProps = state => {
  return {
    user: state.loadUser.user,
    route: state.onRouteChange.route,
    members: state.setMembers.members,
    table: state.setTables.table,
    valuetype: state.setTableType.valuetype,
    tabletype: state.setTableType.tabletype
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

  componentDidMount(){
    this.props.fetchMembers();
    this.props.fetchTables();
  }

  render() {
    
    const { user, members } = this.props;

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
          <Table id={0} />
          <Table id={1} />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Incomings);

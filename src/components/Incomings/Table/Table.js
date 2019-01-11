import React from 'react';
import Row from './Row';
import { connect } from 'react-redux';
import Tables from './Tables';

const mapStateToProps = state => {
    return {
        table: state.setTables.table
    }
}

class Table extends React.Component {
    constructor(props){
        super();
        this.state = {
            id: props.id
        }
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
        const { table } = this.props;
        const { id } = this.state;
        return (
            <div className=' tc mw8 center mv5'>
            <table className='center w-80'>
              <thead className='bg-white-50'>
                <tr>
                  <th>Name</th>
                  <th>Value</th>
                  <th>Recurrence</th>
                  <th>Appertain to</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {table ? this.tables(table[id]) : <tr><td>Loading</td></tr>}
                <Row id={id} />
                <tr>
                  <td className='pv3 pr3 bt'>Sum:</td>
                  <td className='pv3 pr3 bt'></td>
                </tr>
              </tbody>
            </table>
          </div>
        )
    }
}

export default connect(mapStateToProps)(Table);
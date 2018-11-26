import React from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Tables from './Tables';
//import Inc from './Inc';
import Row from './Row';
import './style.css';

class Incomings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      Inc: []
    }
  }

  componentDidMount(){
    fetch('https://kosagyula.duckdns.org/cashflow/summary', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        username: this.state.user.username,
        household: this.state.user.household
      })
    })
    .then(response => response.json())
    .then(data => this.setState({ Inc: data }))
}

  render() {
    const { user, Inc } = this.state;

    const names = [
      "Summary", "Dad", "Mom", "Son", "Daughter"
    ]

    const createRow = () => {
      console.log('ok');
      document.getElementsByClassName('test').innerHTML = <Row />;
    }

    const Incs = Inc.map((user, i) =>
      <Tables
        key={i}
        name={Inc[i].name}
        value={Inc[i].value}
        recur={Inc[i].recurrence}
        date={Inc[i].date}
        appt={Inc[i].occupant}
      />
    )

    /*const earn = Inc.map((user, i) => Inc[i].value)
                .reduce((acc, value) => acc + value)
    const realval = Inc.map((user, i) => Inc[i].real)
                .reduce((acc, value) => acc + value)*/

    return (
      <div>
        <div className='tc pa3 title'>{user.household} / {user.fullname}({user.username})</div>
        <Dropdown
          className='w-20 tc'
          options={names}
          value={names[0]}
          placeholder={names[0]}
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
                {Incs}
                <tr>
                  <td className='pv3 pr3 bb b--black-20'><input className='tc' type='text' /></td>
                  <td className='pv3 pr3 bb b--black-20'><input type='text' /></td>
                  <td className='pv3 pr3 bb b--black-20'><input type='text' /></td>
                  <td className='pv3 pr3 bb b--black-20'>
                  <Dropdown
                    className='f6'
                    options={names}
                    value={names[0]}
                    placeholder={names[0]}
                  /></td>
                  <td className='pv3 pr3 bb b--black-20'></td>
                </tr>
                <tr className='test'>
                  <td><input onClick={createRow} type='button' value='+'/></td>
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

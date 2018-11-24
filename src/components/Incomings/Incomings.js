import React from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Tables from './Tables';
import Inc from './Inc';
import Row from './Row';
import './style.css';

class Incomings extends React.Component {
  constructor(props) {
    super();
    this.state = {
      username: 'Me',
      household: 'Home Sweet Home'
    }
  }

  render() {

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
        real={Inc[i].real}
      />
    )

    const earn = Inc.map((user, i) => Inc[i].value)
                .reduce((acc, value) => acc + value)
    const realval = Inc.map((user, i) => Inc[i].real)
                .reduce((acc, value) => acc + value)

    return (
      <div>
        <div className='tc pa3 title'>{this.state.household} / {this.state.username}</div>
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
                  <td className='pv3 pr3 bb b--black-20'><Dropdown
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
                  <td className='pv3 pr3 bt'>{earn}</td>
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
                {Incs}
                <tr>
                  <td className='pv3 pr3 bt'>Sum:</td>
                  <td className='pv3 pr3 bt'>{realval}</td>
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

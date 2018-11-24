import React from 'react';

class Tables extends React.Component {
  constructor(props) {
    super();
    this.state = {
      inc: {
        name: props.name,
        value: props.value,
        recur: props.real,
        date: "",
        appt: ""
      }
    }
  }

  render() {
    const { name, value, recur, date, appto } = this.state.inc;
    return (
      <tr>
        <td className='pv3 pr3 bb b--black-20'>{name}</td>
        <td className='pv3 pr3 bb b--black-20'>{value} HUF</td>
        <td className='pv3 pr3 bb b--black-20'>{recur}</td>
        <td className='pv3 pr3 bb b--black-20'>{appto}</td>
        <td className='pv3 pr3 bb b--black-20'>{date}</td>
      </tr>
    );
  }
}

export default Tables;

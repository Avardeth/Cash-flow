import React from 'react';

class Registry extends React.Component {
  constructor(props) {
    super();
    this.state = {
      name: props.name,
      type: props.type,
      id: props.id,
      value: ''
    }
  }

  /*onValueChange = (event) => {
    this.setState({ value: event.target.value}, () => {
      console.log(this.state.name, this.state.value);
    })
  }*/

  render() {
    const { name, type, id } = this.state;
    return (
      <div className='pa3'>
        <div><label className='b tc fl w-40'>{name}</label></div>
        <div>
          <input
            onChange={this.onValueChange}
            id={id}
            className='fl w-50 tc center'
            type={type} /></div>
      </div>
    );
  }
}

export default Registry;

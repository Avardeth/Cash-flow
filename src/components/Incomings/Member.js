import React from 'react';

class Member extends React.Component {
  constructor(props) {
    super();
    this.state = {
      mem: {
        name: props.name
      }
    }
  }

  render() {
    const { name } = this.state.mem;
    return <input className='ma3 w-20 pa1' type='button' value={name} />
  }
}

export default Member;

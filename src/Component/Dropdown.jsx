import React from 'react';
import componentDidMount from './News'

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: ''
    };
  }

  handleSelectChange = (event) => {
    const option = event.target.value;
    this.setState({ selectedOption: option });
    console.log("Hello World",option);
    componentDidMount(option);
  };


  render() {
    return (
      <div>
         <select id="options" value={this.state.selectedOption} onChange={this.handleSelectChange} className="border-info-subtle bg-transparent" name="cars">
          <option value={"business"}>business</option>
          <option value={"entertainment"}>entertainment</option>
          <option value={"general"}>general</option>
          <option value={"health"}>healt</option>
          <option value={"science"}>science</option>
          <option value={"sports"}>sports</option>
          <option value={"technology"}>technology</option>
        </select>
        
      </div>
    );
  }
}

export default Dropdown;

import React from 'react'

class Detail extends React.Component {
  state = { counter: 1 };

  handleClick = () => {
    this.setState({
      counter: this.state.counter + 1
    });
  };

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.counter}
      </button>
    );
  }
}

export default Detail
import React from 'react'
import { withRouter } from 'react-router'

class Detail extends React.Component {

  state = { counter: 1 };

  constructor(props) {
    super(props);
    this.state = {
      lists: {}
    };
  }

  componentDidMount() {
    // console.log(this.props.match.params.id);

    // fetch api on load
    fetch('https://cdn-discover.hooq.tv/v1.2/discover/titles/' + this.props.match.params.id)
      .then(res => res.json())
      .then(data => {
        // console.log(data.data);
        this.setState({ lists: data.data })
        // this.state;
      });



  }

  render() {
    console.log(this.state.lists)
    return (
      <p>{this.state.lists.title}</p>
    );
  }
}

export default withRouter(Detail);
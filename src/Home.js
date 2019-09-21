import React from 'react'
import { Link } from 'react-router-dom'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: []
    };
  }

  componentDidMount() {

    fetch('https://cdn-discover.hooq.tv/v1.2/discover/feed?region=ID&page=1&perPage=20')
      .then(res => res.json())
      .then(data => {
        this.setState({ lists: data.data })
      });

  }

  render() {
    const { lists } = this.state;

    return (
      <div>
        <p>Hello</p>
        <ul>
          {
            lists.map(list => {
              if (list.type === "Multi-Title-Manual-Curation") {
                return (
                  <li key={list.row_id}>
                    <a href={list.row_id}>{list.type}</a>
                  </li>
                )
              }
            })
          }
        </ul>
      </div>
    );
  }
}

export default Home

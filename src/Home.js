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
        <div>
          {
            lists.map(list => {
              if (list.type === "Multi-Title-Manual-Curation") {
                console.log(list);
                return (
                  <div key={list.row_id}>
                    <p>{list.row_name}</p>
                    <ChildList key={list.id} list={list} />
                  </div>
                )
              }
            })
          }
        </div>
      </div>
    );
  }
}

class ChildList extends React.Component {
  render() {
    return (
      <ul>
        {
          this.props.list.data.map(hit =>
            <li key={hit.id}>
              <Link
                to={{
                  pathname: `/detail/${hit.id}`
                }}>
                {hit.title}</Link>
            </li>
          )}
      </ul>
    )
  }
}

export default Home

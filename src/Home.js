import React from 'react'
import { Link } from 'react-router-dom'

class Home extends React.Component {

  queryPage = 2;
  fetch = true;

  constructor(props) {
    super(props);
    this.state = {
      lists: []
    };
  }

  componentDidMount() {

    // fetch api on load
    fetch('https://cdn-discover.hooq.tv/v1.2/discover/feed?region=ID&page=1&perPage=20')
      .then(res => res.json())
      .then(data => {
        this.setState({ lists: data.data })
      });

    window.addEventListener('scroll', () => {

      // if scrolled all the way down
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {

        if (this.fetch) {
          // fetch more api
          fetch('https://cdn-discover.hooq.tv/v1.2/discover/feed?region=ID&page=' + this.queryPage + '&perPage=20')
            .then(res => res.json())
            .then(data => {
              console.log(data.data)

              // if data is not empty
              if (data.data.length !== 0) {

                // add to state list
                this.setState({ lists: [...this.state.lists, ...data.data] })
              } else {

                // stop fetching
                this.fetch = false;
              }
            });

          // query next page
          this.queryPage++;
        }
      }
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
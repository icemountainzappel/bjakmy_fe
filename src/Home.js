import React from 'react'
import { Link } from 'react-router-dom'

class Home extends React.Component {
  page = 2;
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
        // console.log(this.state.lists)
      });

    window.addEventListener('scroll', (event) => {

      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        console.log("you're at the bottom of the page");
        fetch('https://cdn-discover.hooq.tv/v1.2/discover/feed?region=ID&page=' + this.page + '&perPage=20')
          .then(res => res.json())
          .then(data => {
            // console.log(data.data)
            // this.state.lists.push(data.data);
            this.setState({ lists: [...this.state.lists, ...data.data] })
          });
        this.page++;
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
                // console.log(list);
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

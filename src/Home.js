import React from 'react'
import { Link } from 'react-router-dom'
import Slider from "react-slick"

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
              // console.log(data.data)

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

  componentWillUnmount() {
    this.fetch = false;
  }

  render() {
    const { lists } = this.state;

    return (
      <div className="wrapper">
        <p>Hello</p>
        <div>
          {
            lists.map(res => {
              if (res.type === "Multi-Title-Manual-Curation") {
                return (
                  <div key={res.row_id}>
                    <p>{res.row_name}</p>
                    <ChildList key={res.id} list={res} />
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
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
      initialSlide: 0,
      // centerPadding: "60px",
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 900,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    return (
      <Slider {...settings}>
        {
          this.props.list.data.map(res => {
            // console.log(res)
            return (
              <div className="post-container" key={res.id}>
                <Link className="image"
                  to={{
                    pathname: `/detail/${res.id}`
                  }}>
                  {res.title}<GrandChildList key={res.id} list={res.images} />
                </Link>
              </div>
            )
          })
        }
      </Slider>
    )
  }
}

class GrandChildList extends React.Component {

  render() {
    return (
      <div>
        {
          this.props.list.map(res => {
            if (res.type === "POSTER") {
              return (
                <img width="250" key={res.id} src={res.url} alt={res.title} />
              )
            }
          })
        }
      </div>
    )
  }
}


export default Home
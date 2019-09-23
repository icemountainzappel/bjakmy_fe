import React from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { Typography, Breadcrumbs, Paper } from '@material-ui/core';


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
    fetch('https://cdn-discover.hooq.tv/v1.2/discover/feed?region=ID&page=1&perPage=20')
      .then(res => res.json())
      .then(data => {
        this.setState({ lists: data.data })
      });

    window.addEventListener('scroll', () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        if (this.fetch) {
          fetch('https://cdn-discover.hooq.tv/v1.2/discover/feed?region=ID&page=' + this.queryPage + '&perPage=20')
            .then(res => res.json())
            .then(data => {
              if (data.data.length !== 0) {
                this.setState({ lists: [...this.state.lists, ...data.data] })
              } else {
                this.fetch = false;
              }
            });
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
      <React.Fragment>
        <CssBaseline />
        <Paper elevation={0} >
          <Breadcrumbs separator='/' aria-label="breadcrumb">
            <Typography color="textPrimary">Home</Typography>
          </Breadcrumbs>
        </Paper>
        {/*<Container maxWidth="lg">*/}
        {
          lists.map(res => {
            if (res.type === "Multi-Title-Manual-Curation") {
              return (
                <section key={res.row_id}>
                  <Container maxWidth="lg">
                    <Typography className="text-center m-t-10 m-b-10" variant="h5" color="primary" component="h2">
                      {res.row_name}
                    </Typography>
                    <ChildList key={res.id} list={res} />
                  </Container>
                </section>
              )
            } else {
              return null
            }
          })
        }
        {/*</Container>*/}
      </React.Fragment>
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
      lazyLoad: true,
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
            return (
              <div className="post-container" key={res.id}>
                <Card>
                  <CardActionArea>
                    <GrandChildList link={res.id} key={res.id} list={res.images} />
                  </CardActionArea>
                  <CardActions>
                    <Button size="medium">
                      <Link to={{ pathname: `/detail/${res.id}` }}>{res.title}</Link>
                    </Button>
                  </CardActions>
                </Card>
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
        <Link className="image"
          to={{
            pathname: `/detail/${this.props.link}`
          }}>
          {
            this.props.list.map(res => {
              if (res.type === "POSTER") {
                return (
                  <CardMedia
                    key={res.id}
                    image={res.url}
                    title={res.title}
                    className="card-image"
                  />
                )
              } else {
                return null
              }
            })
          }
        </Link>
      </div>
    )
  }
}

export default Home
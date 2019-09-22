import React from 'react';
import { withRouter } from 'react-router';
import { CssBaseline, Container, Card, CardActionArea, CardActions, CardMedia, CardContent, Typography } from '@material-ui/core';

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {

    fetch('https://cdn-discover.hooq.tv/v1.2/discover/titles/' + this.props.match.params.id)
      .then(res => res.json())
      .then(data => {
        data.data.images.forEach(el => {
          if (el.type === "POSTER") {
            console.log(el.url)
            this.setState({
              info: data.data,
              imagesUrl: el.url
            })
          }
        });
      });
  }

  render() {
    const { info, imagesUrl } = this.state;
    console.log(this.state)

    if (this.state.info) {

      return (
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth="lg">
            <div className="post-container">
              <Card>
                <CardActionArea>
                  <CardMedia
                    image={imagesUrl}
                    title={info.title}
                    className="card-image"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {info.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {info.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                </CardActions>
              </Card>
            </div>
          </Container>
        </React.Fragment>
      );
    } else {
      return null
    }
  }
}

export default withRouter(Detail);
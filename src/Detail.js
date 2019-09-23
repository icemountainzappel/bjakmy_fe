import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { CssBaseline, Container, Card, CardMedia, CardContent, Typography, Breadcrumbs, Paper } from '@material-ui/core';

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
            this.setState({
              info: data.data,
              imagesUrl: el.url,
              languages: data.data.languages.join(', '),
              audios: data.data.audios.join(', '),
              runningTime: function secondsToHms() {
                var d = data.data.running_time;
                var h = Math.floor(d / 3600);
                var m = Math.floor(d % 3600 / 60);
                var s = Math.floor(d % 3600 % 60);
                return ('0' + h).slice(-2) + ":" + ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);
              }()
            })
          }
        });
      });
  }

  render() {
    const { info, imagesUrl, languages } = this.state;
    // console.log(this.state)

    if (this.state.info) {

      return (
        <React.Fragment>
          <CssBaseline />
          <Paper elevation={0} >
            <Breadcrumbs separator='/' aria-label="breadcrumb">
              <Link color="inherit" to="/">Home</Link>
              <Typography color="textPrimary">Detail</Typography>
            </Breadcrumbs>
          </Paper>
          <Container maxWidth="lg">
            <div className="post-container post-container--detail">
              <Card>
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
                  <Typography className="m-t-15" variant="body2" color="textSecondary" component="p">
                    <i title="language" className="material-icons" style={{ verticalAlign: 'middle' }}>
                      language
                  </i>: {languages}
                  </Typography>
                  <Typography className="m-t-15" variant="body2" color="textSecondary" component="p">
                    <i title="language" className="material-icons" style={{ verticalAlign: 'middle' }}>
                      access_time
                  </i>: {info.running_time_friendly}
                  </Typography>
                </CardContent>
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
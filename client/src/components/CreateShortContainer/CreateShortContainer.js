import React, { Component } from 'react'
import './CreateShortContainer.css'
import axios from 'axios'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';

const styles = ({
  card: {
    width: '50%',
    margin: 'auto',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  cardActions: {
    textAlign: 'center',
    justifyContent: 'center',
  }
});

class CreateShortContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shortUrl: '',
      fullUrl: '',
      errorMessage: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.submitFullUrl = this.submitFullUrl.bind(this);
  }

  submitFullUrl() {  
    const postBody = {
      full_url: this.state.fullUrl
    }  
    axios.post('/api/v1/url_shorts/new', postBody)
    .then(response => {      
      this.setState({shortUrl: response.data.short_url})
    })
    .catch(error => {
      if(error.response.status === 422) {
        this.setState({errorMessage: 'URL has already been taken'})
      } else {
        this.setState({errorMessage: 'There is an error. Please Retry.'})
      }
    })
  }

  handleChange(event) {    
    this.setState({fullUrl: event.target.value, errorMessage: ''});    
  }

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardContent className="inputContainer">          
          <input className="taskInput" type="text" value={this.state.fullUrl} onChange={this.handleChange} placeholder="Add Full URL to shorten" maxLength="100" />          
          <span>
            <p>{this.state.shortUrl}</p>
          </span>
          <span className="error-message">
            <p>{this.state.errorMessage}</p>
          </span>
        </CardContent>  	    
        <CardActions className={classes.cardActions}>
          <Button onClick={this.submitFullUrl} disabled={this.state.fullUrl.length === 0} variant="contained" color="primary">
            Submit
          </Button>
        </CardActions>
      </Card>    
    )
  }
}

export default withStyles(styles)(CreateShortContainer)
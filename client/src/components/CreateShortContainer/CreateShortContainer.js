import React, { Component } from "react";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/styles";

import AuthService from "./../AuthService";

const styles = {
  card: {
    margin: "auto"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  cardActions: {
    textAlign: "center",
    justifyContent: "center"
  },
  textField: {
    width: "100%"
  }
};

class CreateShortContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shortUrl: "",
      fullUrl: "",
      link: "",
      errorMessage: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.submitFullUrl = this.submitFullUrl.bind(this);
    this.authService = new AuthService();
  }

  submitFullUrl() {
    const token = this.authService.getToken();
    const postBody = {
      full_url: this.state.fullUrl
    };
    axios
      .post("/api/v1/url_shorts/new", postBody, {
        headers: { Authorization: token }
      })
      .then(response => {
        this.setState({
          shortUrl: response.data.short_url,
          link: response.data.share
        });
      })
      .catch(error => {
        if (error.response.status === 422) {
          this.setState({ errorMessage: "URL has already been taken" });
        } else {
          this.setState({ errorMessage: "There is an error. Please Retry." });
        }
      });
  }

  handleChange(event) {
    this.setState({ fullUrl: event.target.value, errorMessage: "" });
  }

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardContent className="inputContainer">
          <TextField
            id="outlined-name"
            label="Full URL"
            className={classes.textField}
            value={this.state.fullUrl}
            onChange={this.handleChange}
            margin="normal"
            variant="outlined"
          />
          <span>
            <p>
              <a href={this.state.link}>{this.state.shortUrl}</a>
            </p>
          </span>
          <span className="error-message">
            <p>{this.state.errorMessage}</p>
          </span>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button
            onClick={this.submitFullUrl}
            disabled={this.state.fullUrl.length === 0}
            variant="contained"
            color="primary"
          >
            Create
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(CreateShortContainer);

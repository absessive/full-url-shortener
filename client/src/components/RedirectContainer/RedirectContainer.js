import React, { Component } from "react";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/styles";

import AuthService from "../AuthService";

const styles = {
  card: {
    width: "50%",
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
  }
};

class RedirectContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shortUrl: "",
      fullUrl: "",
      errorMessage: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.getFullUrl = this.getFullUrl.bind(this);
    this.authService = new AuthService();
  }

  getFullUrl() {
    const token = this.authService.getToken();
    axios
      .get(`/api/v1/url_shorts/${this.state.shortUrl}`, {
        headers: { Authorization: token }
      })
      .then(response => {
        this.setState({ fullUrl: response.data.full_url });
      })
      .catch(error => {
        if (error.response.status === 400) {
          this.setState({ errorMessage: "Does Not Exist" });
        } else {
          this.setState({ errorMessage: "There is an error. Please Retry." });
        }
      });
  }

  handleChange(event) {
    this.setState({ shortUrl: event.target.value, errorMessage: "" });
  }

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardContent>
          <TextField
            id="outlined-name"
            label="Short URL"
            className={classes.textField}
            value={this.state.shortUlr}
            onChange={this.handleChange}
            margin="normal"
            variant="outlined"
          />
          <span className="full-url" hidden={!this.state.fullUrl}>
            <p>
              Redirect to: <a href={this.state.fullUrl}>{this.state.fullUrl}</a>
            </p>
          </span>
          <span className="error-message">
            <p>{this.state.errorMessage}</p>
          </span>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button
            onClick={this.getFullUrl}
            disabled={this.state.shortUrl.length !== 8}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(RedirectContainer);

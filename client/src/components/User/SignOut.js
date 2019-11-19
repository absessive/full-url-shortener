import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import AuthService from "../AuthService";

const styles = theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
});

class SignOut extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMessage: "",
      redirect: false
    };
    this.authService = new AuthService();
    this.renderRedirect = this.renderRedirect.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  static contextTypes = {
    router: PropTypes.object
  };

  renderRedirect() {
    if (this.state.redirect) {
      this.props.setTab(0);
      return <Redirect to="/signin" />;
    }
  }

  setRedirect() {
    this.setState({
      redirect: true
    });
  }

  signOut() {
    this.authService.setToken(null);
    this.setRedirect();
  }

  render() {
    const { classes } = this.props;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {this.renderRedirect()}
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign Out
          </Typography>
          <form className={classes.form} noValidate>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.signOut}
            >
              Sign Out
            </Button>
          </form>
        </div>
      </Container>
    );
  }
}

export default withStyles(styles)(SignOut);

import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import SignIn from "./components/User/SignIn";

const styles = theme => ({
  root: {
    padding: theme.spacing(3, 2),
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
});

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <div className="App">
          <Typography component="h1" variant="h3">
            URL Shortening Service
          </Typography>
          <SignIn />
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(App);

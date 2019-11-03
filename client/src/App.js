import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import { Router, Switch, Route, Link } from "react-router-dom";
import { createBrowserHistory } from "history";

import PrivateRoute from "./components/Common/PrivateRoute";
import SignIn from "./components/User/SignIn";
import CreateShortContainer from "./components/CreateShortContainer/CreateShortContainer";
import RedirectContainer from "./components/RedirectContainer/RedirectContainer";

const styles = theme => ({
  root: {
    padding: theme.spacing(3, 2),
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
});

const history = createBrowserHistory();

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <div className="App">
          <Typography component="h1" variant="h3">
            URL Shortening Service
          </Typography>
          <Router history={history}>
            <ul>
              <li>
                <Link to="/redirect">Redirect</Link>
              </li>
              <li>
                <Link to="/create">Create</Link>
              </li>
            </ul>
            <Switch>
              <PrivateRoute path="/redirect">
                <RedirectContainer />
              </PrivateRoute>
              <Route path="/create">
                <CreateShortContainer />
              </Route>
              <Route path="/signin">
                <SignIn />
              </Route>
              <Route path="/home">
                <h2>Home</h2>
              </Route>
              <Route path="/">
                <SignIn />
              </Route>
            </Switch>
          </Router>
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(App);

import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { withStyles } from "@material-ui/core/styles";
import { Router, Switch, Route, Link } from "react-router-dom";
import { createBrowserHistory } from "history";

import SignIn from "./components/User/SignIn";
import CreateShortContainer from "./components/CreateShortContainer/CreateShortContainer";
import RedirectContainer from "./components/RedirectContainer/RedirectContainer";
import UserShortUrls from "./components/User/UserShortUrls";
import Register from "./components/User/Register";
import AuthService from "./components/AuthService";
import SignOut from "./components/User/SignOut";

const styles = theme => ({
  root: {
    padding: theme.spacing(3, 2),
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  title: {
    textAlign: "center"
  }
});

const history = createBrowserHistory();

const locationMap = {
  "/signin": 0,
  "/redirect": 1,
  "/create": 2,
  "/urls": 3,
  "/register": 4,
  "/signout": 5
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabValue: 0
    };

    this.authService = new AuthService();
    this.handleChange = this.handleChange.bind(this);
    this.setTab = this.setTab.bind(this);
  }

  handleChange(_event, newValue) {
    this.setState({ tabValue: newValue });
  }

  setTab(value) {
    this.setState({ tabValue: value });
  }

  componentDidMount() {
    const location = history.location.pathname;
    this.setState({ tabValue: locationMap[location] });
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <div className="App">
          <Typography component="h1" variant="h3" className={classes.title}>
            URL Shortening Service
          </Typography>
          <Router history={history}>
            <Tabs
              value={this.state.tabValue || 0}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab label="Sign In" value={0} component={Link} to="/signin" />
              <Tab
                label="Redirects"
                value={1}
                component={Link}
                to="/redirect"
              />
              <Tab label="Create" value={2} component={Link} to="/create" />
              <Tab
                label="All Short URLs"
                value={3}
                component={Link}
                to="/urls"
              />
              <Tab label="Register" value={4} component={Link} to="/register" />
              <Tab label="Sign Out" value={5} component={Link} to="/signout" />
            </Tabs>
            <Switch>
              <Route path="/redirect" component={RedirectContainer} />
              <Route path="/create" component={CreateShortContainer} />
              <Route
                path="/signin"
                render={props => <SignIn {...props} setTab={this.setTab} />}
              />
              <Route
                path="/signout"
                render={props => <SignOut {...props} setTab={this.setTab} />}
              />
              <Route
                path="/register"
                render={props => <Register {...props} setTab={this.setTab} />}
              />
              <Route path="/urls" component={UserShortUrls} />
              <Route
                path="/"
                render={props => <SignIn {...props} setTab={this.setTab} />}
              />
            </Switch>
          </Router>
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(App);

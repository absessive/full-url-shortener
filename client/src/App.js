import React, { Component } from 'react';
import './App.css';
import RedirectContainer from './components/RedirectContainer/RedirectContainer';
import CreateShortContainer from './components/CreateShortContainer/CreateShortContainer';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
});

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <div className="App">
          <header className="App-header">
            <h1>URL Shortening Service</h1>
          </header>
          <RedirectContainer />
          <CreateShortContainer />
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(App);

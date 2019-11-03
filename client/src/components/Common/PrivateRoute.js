import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthService from "../AuthService";

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
  const authService = new AuthService();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        authService.loggedIn() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;

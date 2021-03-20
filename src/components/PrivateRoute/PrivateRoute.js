import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import { loginContext } from '../../App';

const PrivateRoute = ({ children, ...rest }) => {
  const [userData] = useContext(loginContext)
  return (
    <Route
      {...rest}
      render={({ location }) =>
        userData.name && userData.message === undefined ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
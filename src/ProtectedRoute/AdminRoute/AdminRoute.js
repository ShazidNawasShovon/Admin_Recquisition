
import React from "react";
import { Route, Navigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import useAuth from "../../hooks/useAuth";

const AdminRoute = ({ children, ...rest }) => {
  const { user, isLoading, admin } = useAuth();
  if (isLoading) {
    return <CircularProgress
    color="primary"
  determinate={false}
  size="md"
  variant="soft"
    />;
  }
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user.email && admin ? (
          children
        ) : (
          <Navigate
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default AdminRoute;

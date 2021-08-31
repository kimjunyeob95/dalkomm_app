import React, { useEffect, useState, useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { authContext } from "./ContextApi/Context";
// eslint-disable-next-line no-unused-vars
import * as globalFN from "Config/GlobalJs";

export default function PrivateRoute({ children }) {
  const [state] = useContext(authContext);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setTimeout(() => {
      setLoading(true);
    }, 100);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  if (loading) {
    return (
      <Route
        render={({ location }) =>
          state?.loginFlag ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location },
              }}
            />
          )
        }
      />
    );
  } else return null;
}

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  RouteProps,
  Routes,
  useLocation,
} from "react-router-dom";
import { isAuthenticatedSelector, isLoadingSelector } from "./selectors";
import { signIn, signOut } from "./actions";
import NoMatch from "./components/NoMatch";
import Home from "./components/Home";
import NavBar from "./components/UI/NavBar";
import { Paper } from "@mui/material";
import { routes, RouteType } from "./routs";

function App() {
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const isLoading = useSelector(isLoadingSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(signIn());
    }
  }, [isAuthenticated, dispatch]);

  interface ParentCompProps {
    childComp?: React.ReactNode;
    isPrivate?: Boolean;
  }

  const CustomRoute = ({ isPrivate, childComp }: ParentCompProps) => {
    const location = useLocation();

    if (!isAuthenticated && isPrivate) {
      return <Navigate to="/home" replace state={{ from: location }} />;
    }

    return <>{childComp}</>;
  };

  return (
    <>
      {isLoading ? null : (
        <Router>
          {" "}
          {isAuthenticated ? <NavBar /> : null}
          <Paper
            elevation={6}
            sx={{ height: "100vh", maxWidth: "375px", mx: "auto", px: "10px" }}
          >
            {isAuthenticated ? (
              <button onClick={() => dispatch(signOut())}>Sign Out</button>
            ) : null}

            <Routes>
              <Route index element={<Home />} />
              <Route path="home" element={<Home />} />
              {routes.map((el: RouteType, index: number) => (
                <Route
                  path={el.path}
                  element={
                    <CustomRoute
                      childComp={el.element}
                      isPrivate={el.protected}
                    />
                  }
                  key={index}
                />
              ))}
              <Route path="*" element={<NoMatch />} />
            </Routes>
          </Paper>
        </Router>
      )}{" "}
    </>
  );
}

export default App;

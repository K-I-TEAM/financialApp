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
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import NavBar from "./components/UI/NavBar";
import Transactions from "./components/Transactions";
import Profile from "./components/Profile";
import { Paper } from "@mui/material";

function App() {
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const isLoading = useSelector(isLoadingSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(signIn());
    }
  }, [isAuthenticated, dispatch]);

  interface PrivateRouteProps extends RouteProps {
    // tslint:disable-next-line:no-any
    component?: any;
    // tslint:disable-next-line:no-any
    children?: any;
  }
  const ProtectedRoute = ({ children }: PrivateRouteProps) => {
    const location = useLocation();

    if (!isAuthenticated) {
      return <Navigate to="/home" replace state={{ from: location }} />;
    }

    return children;
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

            <div className="App">Happy days!!!</div>
            <Routes>
              <Route index element={<Home />} />
              <Route path="home" element={<Home />} />
              <Route
                path="dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="transactions"
                element={
                  <ProtectedRoute>
                    <Transactions />
                  </ProtectedRoute>
                }
              />
              <Route
                path="profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NoMatch />} />
            </Routes>
          </Paper>
        </Router>
      )}{" "}
    </>
  );
}

export default App;

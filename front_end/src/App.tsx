import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  RouteProps,
  Routes,
  NavLink,
  useLocation,
} from "react-router-dom";
import Auth from "./store/user/auth";
import { isAuthenticatedSelector } from "./selectors";
import { signIn } from "./actions";
import NoMatch from "./components/NoMatch";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const dispatch = useDispatch();
  //temporary here
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (!isAuthenticated) {
      dispatch(signIn());
    }
    setIsLoading(false);
    /* async function checkAuth() {
      setIsLoading(true);
      try {
        await Auth.currentAuthenticatedUser();
        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    }
    checkAuth(); */
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
          <div className="App">Happy days!!!</div>
          <Navigation />
          <Routes>
            <Route index element={<Home isAuthenticated={isAuthenticated} />} />
            <Route
              path="home"
              element={<Home isAuthenticated={isAuthenticated} />}
            />
            <Route
              path="dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </Router>
      )}{" "}
    </>
  );
}

const Navigation = () => {
  return (
    <nav>
      <NavLink to="/home">Home</NavLink>
      <NavLink to="/dashboard">Dashboard</NavLink>
    </nav>
  );
};

export default App;

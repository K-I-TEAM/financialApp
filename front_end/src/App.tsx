import React, { useEffect } from "react";
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
import { isAuthenticatedSelector, isLoadingSelector } from "./selectors";
import { signIn, signOut } from "./actions";
import NoMatch from "./components/NoMatch";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";

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
      {isAuthenticated ? (
        <button onClick={() => dispatch(signOut())}>Sign Out</button>
      ) : null}
      {isLoading ? null : (
        <Router>
          <div className="App">Happy days!!!</div>
          <Navigation />
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

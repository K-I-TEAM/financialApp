import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import Transactions from "./components/Transactions";
import EditProfile from "./components/EditProfile";
import Categories from "./components/Categories";

export type RouteType = {
  path: string;
  element: React.ReactNode;
  protected: Boolean;
};

export const routes: Array<RouteType> = [
  { path: "/dashboard", element: <Dashboard />, protected: true },
  { path: "/transactions", element: <Transactions />, protected: true },
  { path: "/profile", element: <Profile />, protected: true },
  { path: "/edit-profile", element: <EditProfile />, protected: true },
  { path: "/categories", element: <Categories />, protected: true },
];

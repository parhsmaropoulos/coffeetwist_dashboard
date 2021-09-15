import logo from "./logo.svg";
import "./App.css";
import { Switch, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Dashboard from "./components/Dashboard";

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change
  return (
    <>
      <Switch>
        <Route exact path="/*" component={Dashboard} />
      </Switch>
    </>
  );
}

export default App;

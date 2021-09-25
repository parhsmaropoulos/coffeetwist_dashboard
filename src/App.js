import "./App.css";
import { Switch, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Dashboard from "./components/Dashboard";
import HomePage from "./components/HomePage";

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
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/create/:string" component={Dashboard} />
        <Route exact path="/*" component={Dashboard} />
      </Switch>
    </>
  );
}

export default App;

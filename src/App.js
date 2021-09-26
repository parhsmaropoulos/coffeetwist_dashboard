import "./App.css";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import HomePage from "./components/HomePage";
import { BrowserRouter as Router } from "react-router-dom";
import withAuthentication from "./components/firebase/withAuthentication";

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/login" component={HomePage} />
      <Route exact path="/create/:string" component={Dashboard} />
      <Route exact path="/*" component={Dashboard} />
    </Switch>
  </Router>
);

export default withAuthentication(App);

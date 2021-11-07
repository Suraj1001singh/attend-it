import "./App.css";
import DisplayQrCode from "./components/displayQrCode/DisplayQrCode";
import Login from "./components/login/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Login}></Route>
          <Route exact path="/user" component={DisplayQrCode}></Route>
          <Route exact path="/dashboard" component={Dashboard}></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;

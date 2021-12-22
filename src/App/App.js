import "./App.css";
import Navbar from "../Navbar/Navbar.js";
import Home from "../Home/Home.js";
import Account from "../Account/Account.js";
import Login from "../Login/Login.js";
import Register from "../Register/Register.js";
import Watchlist from "../Watchlist/Watchlist.js";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/account" exact>
            <Account />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/register" exact>
            <Register />
          </Route>
          <Route path="/watchlist" exact>
            <Watchlist />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

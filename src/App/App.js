import "./App.css";
import Navbar from "../Navbar/Navbar.js";
import Home from "../Home/Home.js";
import Account from "../Account/Account.js";
import Login from "../Login/Login.js";
import Register from "../Register/Register.js";
import Watchlist from "../Watchlist/Watchlist.js";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  function authCheck() {
    axios({
      method: "get",
      url: process.env.REACT_APP_SERVER_URL + "api/auth-check",
    })
      .then((response) => setIsAuth(response.data))
      .catch((error) => setIsAuth(false));
  }
  useEffect(authCheck, []);
  return (
    <Router>
      <div className="App">
        <Navbar isAuth={isAuth} setIsAuth={setIsAuth} />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route
            path="/account"
            exact
            render={() => (isAuth ? <Account /> : <Redirect to="/login" />)}
          ></Route>
          <Route
            path="/login"
            exact
            render={() =>
              isAuth ? <Redirect to="/" /> : <Login setIsAuth={setIsAuth} />
            }
          ></Route>
          <Route
            path="/register"
            exact
            render={() => (isAuth ? <Redirect to="/" /> : <Register />)}
          ></Route>
          <Route
            path="/watchlist"
            exact
            render={() => (isAuth ? <Watchlist /> : <Redirect to="/login" />)}
          ></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

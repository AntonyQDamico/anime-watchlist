import "../App/App.css";
import "./Navbar.css";
import axios from "axios";

function logout() {
  axios({
    method: "post",
    url: process.env.REACT_APP_SERVER_URL + "api/logout",
  }).then((response) => this.props.setIsAuth(false));
  console.log("logout edition");
}
const loggedInNav = (
  <nav>
    <ul>
      <li>
        <a href="./watchlist">Watchlist</a>
      </li>
      <li>
        <a href="./account">Account</a>
      </li>
      <li>
        <a href="./" onClick={logout()}>
          Logout
        </a>
      </li>
    </ul>
  </nav>
);

const loggedOutNav = (
  <nav>
    <ul>
      <li>
        <a href="./Login">Login</a>
      </li>
      <li>
        <a href="./Register">Register</a>
      </li>
    </ul>
  </nav>
);

function Navbar(props) {
  return (
    <div className="navbar">
      <a href="./" className="logo-name">
        Anime Watchlist
      </a>
      {props.isAuth ? loggedInNav : loggedOutNav}
    </div>
  );
}

export default Navbar;

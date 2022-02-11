import "../App/App.css";
import "./Navbar.css";
import axios from "axios";
import { Link } from "react-router-dom";

function Navbar(props) {
  const loggedInNav = (
    <nav>
      <ul>
        <li>
          <Link to="./watchlist">Watchlist</Link>
        </li>
        <li>
          <Link to="./account">Account</Link>
        </li>
        <li>
          <Link to="./" onClick={logout}>
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );

  const loggedOutNav = (
    <nav>
      <ul>
        <li>
          <Link to="./Login">Login</Link>
        </li>
        <li>
          <Link to="./Register">Register</Link>
        </li>
      </ul>
    </nav>
  );

  function logout() {
    axios({
      method: "post",
      url: "/api/logout",
      withCredentials: true,
    })
      .then((response) => props.setIsAuth(false))
      .catch((error) => props.setIsAuth(false));
  }

  return (
    <div className="navbar">
      <Link to="./" className="logo-name">
        🍙 Derailed Anime
      </Link>
      {props.isAuth ? loggedInNav : loggedOutNav}
    </div>
  );
}

export default Navbar;

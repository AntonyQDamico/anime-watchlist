import "../App/App.css";
import "./Navbar.css";

function logout() {
  sessionStorage.clear();
}
function Navbar() {
  return (
    <div className="navbar">
      <a href="./" className="logo-name">
        Anime Watchlist
      </a>
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
    </div>
  );
}

export default Navbar;

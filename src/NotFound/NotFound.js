import "./NotFound.css";
import { useNavigate } from "react-router-dom";

function NotFound() {
  let navigate = useNavigate();
  function redirectToHome() {
    navigate("/");
  }
  return (
    <div className="content-area">
      <h1>Page Not Found</h1>
      <p>Sorry the page you are asking for cannot be found</p>
      <button onClick={redirectToHome}>Redirect to Home</button>
    </div>
  );
}

export default NotFound;

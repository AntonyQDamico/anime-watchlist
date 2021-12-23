import "./Watchlist.css";
import WatchItem from "./WatchItem/WatchItem.js";

function Watchlist() {
  const titleList = ["One Piece", "Bleach", "Naruto"];
  return (
    <div className="watchlist content-area">
      <h1>Watchlist</h1>
      <div className="headers">
        <h2 className="head-title">Title</h2>
        <h2 className="head-site-day">
          Site
          <br />
          Day
        </h2>
        <h2 className="head-status">Status</h2>
      </div>
      {titleList.map((eachItem) => {
        return <WatchItem title={eachItem} />;
      })}
    </div>
  );
}

export default Watchlist;

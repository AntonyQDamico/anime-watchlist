import "./Watchlist.css";
import WatchItem from "./WatchItem/WatchItem.js";

function Watchlist() {
  const titleList = [
    {
      title: "One Piece",
      site: "CR",
      day: "Thur",
      queue: [102],
      totalEps: 24,
      nextEp: 102,
      showID: 1,
    },
    {
      title: "Bleach",
      site: "NF",
      day: "Sat",
      queue: [1, 2, 3],
      totalEps: 25,
      nextEp: 1,
      showID: 2,
    },
    {
      title: "Naruto",
      site: "FUN",
      day: "Wed",
      queue: [2],
      totalEps: 12,
      nextEp: 2,
      showID: 3,
    },
  ];
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
        return <WatchItem show={eachItem} key={eachItem.showID} />;
      })}
    </div>
  );
}

export default Watchlist;

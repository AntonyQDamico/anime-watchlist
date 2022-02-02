import "./Watchlist.css";
import WatchItem from "./WatchItem/WatchItem.js";
import AddShowButton from "./AddShowButton/AddShowButton.js";
import { useEffect, useState } from "react";
import axios from "axios";

// const trialList = [
//   {
//     title: "One Piece",
//     site: "CR",
//     day: "Thur",
//     queue: [102],
//     totalEps: 24,
//     nextEp: 102,
//     showID: 1,
//   },
//   {
//     title: "Bleach",
//     site: "NF",
//     day: "Sat",
//     queue: [1, 2, 3],
//     totalEps: 25,
//     nextEp: 1,
//     showID: 2,
//   },
//   {
//     title: "Naruto",
//     site: "FUN",
//     day: "Wed",
//     queue: [2],
//     totalEps: 12,
//     nextEp: 2,
//     showID: 3,
//   },
// ];

function Watchlist() {
  const [titleList, setTitleList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [nextShowId, setNextShowId] = useState(4); //value based on trialList

  function removeFromList(showId) {
    const newList = titleList.filter((item) => item.showID !== showId);
    setTitleList(newList);
  }
  function getNextShowId() {
    const nextValue = nextShowId;
    console.log(typeof nextShowId);
    setNextShowId(Number(nextValue) + 1);
    return nextValue;
  }

  function addShowToList(title, site, day, totalEps, nextEp) {
    const newList = [...titleList];
    newList.push({
      title: title,
      site: site,
      day: day,
      queue: [],
      totalEps: totalEps,
      nextEp: nextEp,
      showID: getNextShowId(),
    });
    setTitleList(newList);
  }
  function sortWatchListTitle() {
    let newList = [...titleList];
    newList.sort((firstItem, secondItem) =>
      firstItem.title > secondItem.title ? 1 : -1
    );
    setTitleList(newList);
  }
  function sortWatchListDay() {
    const weekdayToday = new Date().getDay();
    let weekdays = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
    let sortedDays = weekdays
      .slice(weekdayToday)
      .concat(weekdays.slice(0, weekdayToday));
    sortedDays.push("??");

    let newList = [...titleList];
    newList.sort((firstItem, secondItem) => {
      if (
        sortedDays.indexOf(firstItem.day) > sortedDays.indexOf(secondItem.day)
      ) {
        return 1;
      }
      if (
        sortedDays.indexOf(firstItem.day) < sortedDays.indexOf(secondItem.day)
      ) {
        return -1;
      }
      if (
        firstItem.title.toLocaleLowerCase() >
        secondItem.title.toLocaleLowerCase()
      ) {
        return 1;
      }
      if (firstItem.title < secondItem.title) {
        return -1;
      }
      return 0;
    });
    setTitleList(newList);
  }

  function getUsersWatchList() {
    axios({
      method: "get",
      url: process.env.REACT_APP_SERVER_URL + "api/user-shows",
      withCredentials: true,
    })
      .then((response) => {
        const newList = response.data.map((eachShow) => {
          return {
            title: eachShow.title,
            site: eachShow.site,
            day: eachShow.air_day,
            queue: [],
            totalEps: eachShow.ending_ep > 0 ? eachShow.ending_ep : "??",
            nextEp: eachShow.next_ep,
            showID: eachShow.show_id,
          };
        });
        setTitleList(newList);
      })
      .catch((error) => setErrorMessage("Something went wrong, Sorry."));
  }

  useEffect(getUsersWatchList, []);

  return (
    <div className="watchlist content-area">
      <h1>Watchlist</h1>
      {errorMessage.length > 0 ? <p>{errorMessage}</p> : null}
      <div className="headers">
        <h2 className="head-title" onClick={sortWatchListTitle}>
          Title
        </h2>
        <h2 className="head-site-day" onClick={sortWatchListDay}>
          Site
          <br />
          Day
        </h2>
        <h2 className="head-status">Status</h2>
      </div>
      {titleList.map((eachItem) => {
        return (
          <WatchItem
            show={eachItem}
            key={eachItem.showID}
            removeFromList={removeFromList}
          />
        );
      })}
      <AddShowButton addShowToList={addShowToList} />
    </div>
  );
}

export default Watchlist;

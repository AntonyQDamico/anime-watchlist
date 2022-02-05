import "./Watchlist.css";
import WatchItem from "./WatchItem/WatchItem.js";
import AddShowButton from "./AddShowButton/AddShowButton.js";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

function Watchlist(props) {
  const [titleList, setTitleList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  function removeFromList(showId) {
    axios({
      method: "delete",
      url: process.env.REACT_APP_SERVER_URL + "api/shows",
      withCredentials: true,
      data: {
        show_id: showId,
      },
    })
      .then((response) => {
        const newList = titleList.filter((item) => item.showID !== showId);
        setTitleList(newList);
      })
      .catch((error) => setErrorMessage("Failed to Delete"));
  }

  function addShowToList(title, site, day, totalEps, startEp) {
    axios({
      method: "post",
      url: process.env.REACT_APP_SERVER_URL + "api/shows",
      withCredentials: true,
      data: {
        title: title,
        site: site,
        air_day: day,
        start_ep: startEp,
        ending_ep: totalEps,
      },
    })
      .then((response) => {
        axios({
          method: "post",
          url: process.env.REACT_APP_SERVER_URL + "api/user-shows",
          withCredentials: true,
          data: {
            show_id: response.data.show_id,
            next_ep: response.data.start_ep,
          },
        })
          .then((res) => {
            const newList = [...titleList];
            newList.push({
              title: response.data.title,
              site: response.data.site,
              day: response.data.air_day,
              queue: [],
              totalEps: response.data.ending_ep,
              nextEp: res.data.next_ep,
              showID: response.data.show_id,
            });
            setTitleList(newList);
          })
          .catch((error) => setErrorMessage("Failed to Create New Show"));
      })
      .catch((error) => setErrorMessage("Failed to Create New Show"));
  }
  function sortWatchListTitle() {
    let newList = [...titleList];
    newList.sort((firstItem, secondItem) =>
      firstItem.title.toLocaleLowerCase() > secondItem.title.toLocaleLowerCase()
        ? 1
        : -1
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
      {props.isAuth ? null : <Navigate to="/login" />}
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

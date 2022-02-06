import "./WatchItem.css";
import { useEffect, useState } from "react";
import axios from "axios";

function WatchItem(props) {
  const [queueEps, setQueueEps] = useState(props.show.queue);
  const [nextEp, setNextEp] = useState(props.show.nextEp);
  const [extraVis, setExtraVis] = useState(false);

  function queueAdd() {
    const currentQueue = [...queueEps];
    if (currentQueue.length > 0) {
      axios({
        method: "post",
        url: "/api/watch-queue",
        withCredentials: true,
        data: {
          queueEp: currentQueue[currentQueue.length - 1] + 1,
          showId: props.show.showID,
        },
      })
        .then((response) => {
          currentQueue.push(response.data.queue_ep);
          setQueueEps(currentQueue);
        })
        .catch(null);
    } else {
      axios({
        method: "post",
        url: "/api/watch-queue",
        withCredentials: true,
        data: {
          queueEp: nextEp,
          showId: props.show.showID,
        },
      })
        .then((response) => {
          currentQueue.push(response.data.queue_ep);
          setQueueEps(currentQueue);
        })
        .catch(null);
    }
  }
  function queueRemove() {
    const currentQueue = [...queueEps];
    if (currentQueue.length > 0) {
      axios({
        method: "delete",
        url: "/api/watch-queue",
        withCredentials: true,
        data: {
          queueEp: currentQueue.pop(),
          showId: props.show.showID,
        },
      })
        .then((response) => {
          setQueueEps(currentQueue);
        })
        .catch(null);
    } else {
      return;
    }
  }
  function deleteFromList() {
    props.removeFromList(props.show.showID);
  }
  function toggleExtraInfo() {
    setExtraVis(!extraVis);
  }
  function watchAnEp() {
    const currentQueue = [...queueEps];
    if (currentQueue.length > 0) {
      const epToWatch = currentQueue.shift();
      axios({
        method: "delete",
        url: "/api/watch-queue",
        withCredentials: true,
        data: {
          queueEp: epToWatch,
          showId: props.show.showID,
        },
      })
        .then((response) => {
          axios({
            method: "put",
            url: "/api/user-shows",
            withCredentials: true,
            data: {
              nextEp: epToWatch + 1,
              showId: props.show.showID,
            },
          })
            .then((response) => {
              setNextEp(response.data.next_ep);
              setQueueEps(currentQueue);
            })
            .catch(null);
        })
        .catch(null);
    } else {
      return;
    }
  }
  const title = props.show.title;
  const site = props.show.site;
  const day = props.show.day;
  const totalEps = props.show.totalEps;

  let classExtra = extraVis
    ? "watch-extra-info"
    : "watch-extra-info hidden-row";
  let classDelButton = extraVis ? "delete-button" : "delete-button hidden-row";

  function getQueueEps() {
    axios({
      method: "get",
      url: "/api/watch-queue/" + props.show.showID.toString(),
      withCredentials: true,
    })
      .then((response) => {
        setQueueEps(response.data);
      })
      .catch(null);
  }
  useEffect(getQueueEps, [props.show.showID]);
  return (
    <div className="watchitem">
      <div className="watch-title" onClick={toggleExtraInfo}>
        {title}
      </div>
      <div className="watch-site">{site}</div>
      <div className="watch-day">{day}</div>
      <div className="watch-queue" onClick={watchAnEp}>
        {queueEps}
      </div>
      <div className="queue-add">
        <button onClick={queueAdd}>+</button>
      </div>
      <div className="queue-remove">
        <button onClick={queueRemove}>-</button>
      </div>
      <div className={classExtra}>
        <div className="watch-total">Total EPs: {totalEps}</div>
        <div className="watch-next">Next EP: {nextEp}</div>
      </div>
      <div className={classDelButton}>
        <button onClick={deleteFromList}>X</button>
      </div>
    </div>
  );
}

export default WatchItem;

import "./WatchItem.css";
import { useState } from "react";

function WatchItem(props) {
  const [queueEps, setUsername] = useState(props.shows.queue);
  const [nextEp, setNextEp] = useState(props.show.nextEp);

  function queueAdd() {
    console.log("add to queue");
  }
  function queueRemove() {
    console.log("remove from queue");
  }
  const title = props.show.title;
  const site = props.show.site;
  const day = props.show.day;
  const totalEps = props.show.totalEps;

  return (
    <div className="watchitem">
      <div className="watch-title">{title}</div>
      <div className="watch-site">{site}</div>
      <div className="watch-day">{day}</div>
      <div className="watch-queue">16</div>
      <div className="queue-add">
        <button onClick={queueAdd}>+</button>
      </div>
      <div className="queue-remove">
        <button onClick={queueRemove}>-</button>
      </div>
      <div className="watch-extra-info">
        <div className="watch-total">Total EPs: {totalEps}</div>
        <div className="watch-next">Next EP: 16</div>
      </div>
    </div>
  );
}

export default WatchItem;

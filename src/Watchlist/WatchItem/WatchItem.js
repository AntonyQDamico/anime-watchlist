import "./WatchItem.css";
import { useState } from "react";

function WatchItem(props) {
  const [queueEps, setQueueEps] = useState(props.show.queue);
  const [nextEp, setNextEp] = useState(props.show.nextEp);
  const [extraVis, setExtraVis] = useState(false);

  function queueAdd() {
    const currentQueue = [...queueEps];
    if (currentQueue.length > 0) {
      currentQueue.push(currentQueue[currentQueue.length - 1] + 1);
      setQueueEps(currentQueue);
    } else {
      currentQueue.push(nextEp);
      setQueueEps(currentQueue);
    }
  }
  function queueRemove() {
    const currentQueue = [...queueEps];
    currentQueue.pop();
    setQueueEps(currentQueue);
  }
  function deleteFromList() {
    console.log("Are you sure you want to delete?");
  }
  function toggleExtraInfo() {
    setExtraVis(!extraVis);
  }
  function watchAnEp() {
    const currentQueue = [...queueEps];
    if (currentQueue.length > 0) {
      setNextEp(currentQueue.shift() + 1);
      setQueueEps(currentQueue);
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

import "./WatchItem.css";

function WatchItem(props) {
  const title = props.title;
  return (
    <div className="watchitem">
      <div className="watch-title">{title}</div>
      <div className="watch-site">CR</div>
      <div className="watch-day">Thur</div>
      <div className="watch-queue">16</div>
      <div className="queue-add">+</div>
      <div className="queue-remove">-</div>
      <div className="watch-extra-info">
        <div className="watch-total">Total EPs: 24</div>
        <div className="watch-next">Next EP: 16</div>
      </div>
    </div>
  );
}

export default WatchItem;

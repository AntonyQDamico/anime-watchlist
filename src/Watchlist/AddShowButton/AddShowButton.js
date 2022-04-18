import "./AddShowButton.css";
import { useState } from "react";

function AddShowButton(props) {
  const [formVis, setFormVis] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newSite, setNewSite] = useState("??");
  const [newDay, setNewDay] = useState("??");
  const [newStart, setNewStart] = useState(1);
  const [newTotal, setNewTotal] = useState("");

  let classNewShowForm = formVis
    ? "new-show-form"
    : "new-show-form hidden-form";

  function toggleForm() {
    setFormVis(!formVis);
  }
  function resetFormDefault() {
    setNewTitle("");
    setNewSite("??");
    setNewDay("??");
    setNewStart(1);
    setNewTotal("");
  }
  function handleSubmit(event) {
    event.preventDefault();
    setFormVis(false);
    resetFormDefault();
    let totalEps = newStart;
    if (newTotal === "") {
      totalEps = 0;
    } else {
      totalEps += newTotal;
    }
    props.addShowToList(newTitle, newSite, newDay, totalEps, newStart);
  }
  function handleTitle(event) {
    setNewTitle(event.target.value);
  }
  function handleSite(event) {
    setNewSite(event.target.value);
  }
  function handleDay(event) {
    setNewDay(event.target.value);
  }
  function handleStart(event) {
    if (event.target.value === "") {
      setNewStart("");
    } else setNewStart(Number(event.target.value));
  }
  function handleTotal(event) {
    if (event.target.value === "") {
      setNewTotal("");
    } else setNewTotal(Number(event.target.value));
  }
  return (
    <div className="add-show">
      <div className="add-button" onClick={toggleForm}>
        New Show
      </div>
      <form className={classNewShowForm} onSubmit={handleSubmit}>
        <label className="form-head show-title" htmlFor="title">
          Show Title
        </label>
        <input
          className="form-input show-title"
          type="text"
          id="title"
          value={newTitle}
          onChange={handleTitle}
          required
        />
        <label className="form-head show-site" htmlFor="site">
          Site
        </label>
        <select
          className="form-select show-site"
          id="site"
          value={newSite}
          onChange={handleSite}
        >
          <option value="??">Unknown</option>
          <option value="CR">Crunchyroll</option>
          <option value="NF">Netflix</option>
          <option value="HD">HiDive</option>
          <option value="D+">Disney+</option>
          <option value="FUN">Funimation</option>
        </select>
        <label className="form-head show-day" htmlFor="day">
          Weekday
        </label>
        <select
          className="form-select show-day"
          id="day"
          value={newDay}
          onChange={handleDay}
        >
          <option value="??">Unknown</option>
          <option value="Sun">Sunday</option>
          <option value="Mon">Monday</option>
          <option value="Tue">Tuesday</option>
          <option value="Wed">Wednesday</option>
          <option value="Thur">Thursday</option>
          <option value="Fri">Friday</option>
          <option value="Sat">Saturday</option>
        </select>
        <label className="form-head show-start" htmlFor="startEp">
          Starting Ep
        </label>
        <input
          className="form-input show-start"
          type="number"
          id="startEp"
          required
          value={newStart}
          onChange={handleStart}
        />
        <label className="form-head show-eps" htmlFor="totalEp">
          Eps in Season
        </label>
        <input
          className="form-input show-eps"
          type="number"
          id="totalEp"
          value={newTotal}
          onChange={handleTotal}
        />
        <input
          className="submit-show-button"
          type="submit"
          value="Add New Show"
        />
      </form>
    </div>
  );
}

export default AddShowButton;

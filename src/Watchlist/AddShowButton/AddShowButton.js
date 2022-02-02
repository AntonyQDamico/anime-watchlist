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
    console.log(
      `Submitted Values: \nTitle: ${typeof newTitle}\nSite: ${typeof newSite}\nDay: ${typeof newDay}\nStart Ep: ${typeof newStart}\nSeason Eps: ${typeof newTotal}`
    );
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
        <label htmlFor="title">Show Title</label>
        <input
          type="text"
          id="title"
          value={newTitle}
          onChange={handleTitle}
          required
        />
        <label htmlFor="site">Site</label>
        <select id="site" value={newSite} onChange={handleSite}>
          <option value="??">Unknown</option>
          <option value="CR">Crunchyroll</option>
          <option value="NF">Netflix</option>
          <option value="FUN">Funimation</option>
        </select>
        <label htmlFor="day">Weekday</label>
        <select id="day" value={newDay} onChange={handleDay}>
          <option value="??">Unknown</option>
          <option value="Sun">Sunday</option>
          <option value="Mon">Monday</option>
          <option value="Tue">Tuesday</option>
          <option value="Wed">Wednesday</option>
          <option value="Thur">Thursday</option>
          <option value="Fri">Friday</option>
          <option value="Sat">Saturday</option>
        </select>
        <label htmlFor="startEp">Starting Ep</label>
        <input
          type="number"
          id="startEp"
          required
          value={newStart}
          onChange={handleStart}
        />
        <label htmlFor="totalEp">Eps in Season</label>
        <input
          type="number"
          id="totalEp"
          value={newTotal}
          onChange={handleTotal}
        />
        <input type="submit" value="Add New Show" />
      </form>
    </div>
  );
}

export default AddShowButton;

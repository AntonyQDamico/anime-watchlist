import "./AddShowButton.css";
import { useState } from "react";

function AddShowButton(props) {
  const [formVis, setFormVis] = useState(false);
  let classNewShowForm = formVis
    ? "new-show-form"
    : "new-show-form hidden-form";
  function toggleForm() {
    setFormVis(!formVis);
  }
  return (
    <div className="add-show">
      <div className="add-button" onClick={toggleForm}>
        New Show
      </div>
      <form className={classNewShowForm}>
        <label for="title">Show Title</label>
        <input type="text" id="title" />
        <label for="site"></label>
        <select id="site">
          <option value="CR">Crunchyroll</option>
          <option value="NF">Netflix</option>
          <option value="FUN">Funimation</option>
          <option value="??">Unknown</option>
        </select>
        <label for="day">Weekday</label>
        <select id="day">
          <option value="Sun">Sunday</option>
          <option value="Mon">Monday</option>
          <option value="Tue">Tuesday</option>
          <option value="Wed">Wednesday</option>
          <option value="Thur">Thursday</option>
          <option value="Fri">Friday</option>
          <option value="Sat">Saturday</option>
          <option value="??">Unknown</option>
        </select>
      </form>
    </div>
  );
}

export default AddShowButton;

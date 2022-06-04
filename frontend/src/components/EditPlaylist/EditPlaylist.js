import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createSong, updateSong } from "../../store/songs"
import ErrorMessage from "../ErrorMessage";
import * as sessionActions from "../../store/session";
import { ValidationError } from "../../utils/validationError";
import Navigation from "../Navigation"
import SignupFormPage from "../SignupFormPage";
import { Navlink, Route, useParams, Switch } from 'react-router-dom'
import { updatePlaylist } from "../../store/playlist";
const EditPlaylist = ({id, closeModal}) => {
  const dispatch = useDispatch()
  const history = useHistory()

  console.log(id)



  const [errorMessages, setErrorMessages] = useState([])
  const [name, setName] = useState("")


  const updateName = (e) => setName(e.target.value);




  const sessionUser = useSelector((state) => state.session.user);






  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name

    };

  await dispatch(updatePlaylist(id, payload)).catch(async (res) => {
    const data = await res.json();
    if (data && data.errors) setErrorMessages(data.errors);
    else{

    }



  })





  };

  console.log(typeof(errorMessages))


  return (
  <div>
    <div className="new-form-holder">
      <ErrorMessage message={errorMessages.overall} />
      <form className="create-song" onSubmit={handleSubmit}>

        <label>Edit Name: </label>
        <input
          type="text"
          placeholder="edit title"
          value={name}
          onChange={updateName}
        />

        <ErrorMessage label={"title"} message={errorMessages.title} />


        <button type="submit" className="submiteditbutton">Submit Edit</button>

      </form>
    </div>
  </div>
  );

};

export default EditPlaylist

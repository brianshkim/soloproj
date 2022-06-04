import { useEffect, useState, useContext } from "react";
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
import {idContext} from "../Home/Home"
import './editplaylist.css'
const EditPlaylist = ({ id, closeModal}) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [errorMessages, setErrorMessages] = useState([])



const playlists = useSelector(state=>state.playlists[id])
console.log(playlists)
const [name, setName] = useState(playlists.name)


  console.log(id)
  useEffect(()=>{
    const errors = []
    if (name.length < 1){
      errors.push('Name cannot be empty')}
      setErrorMessages(errors)
    }, [name])

  const updateName = (e) => setName(e.target.value);

  const sessionUser = useSelector((state) => state.session.user);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(id)

    const payload = {
      name

    };

dispatch(updatePlaylist(id, payload))
closeModal()





  };

  console.log(typeof(errorMessages))


  return (
  <div>
    <div className="edit-list-form">
    <div className="errors">
          <ul>
            {errorMessages.map(error=>(
              <li>{error}</li>
            ))}
          </ul>
        </div>

      <form className="edit-playlist" onSubmit={handleSubmit}>

        <label>Edit Name: </label>
        <input
          type="text"
          placeholder="edit title"
          value={name}
          onChange={updateName}
        />




        <button type="submit" className="submiteditbutton" disabled={!!errorMessages.length}>Submit Edit</button>

      </form>
    </div>
  </div>
  );

};

export default EditPlaylist

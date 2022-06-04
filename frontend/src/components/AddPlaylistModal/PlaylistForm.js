import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createSong } from "../../store/songs"
import ErrorMessage from "../ErrorMessage";
import * as sessionActions from "../../store/session";
import { ValidationError } from "../../utils/validationError";
import { createPlaylist } from "../../store/playlist";


const CreatePlaylistForm = ({closeModal}) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const [isLoaded, setIsLoaded] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])


  const [name, setName] = useState("")

  const updateName = (e) => setName(e.target.value);


  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(()=>{
    const errors = []
    if (name.length < 1){
      errors.push('Name cannot be empty')}
      setErrorMessages(errors)
    }, [name])

  const sessionUser = useSelector((state) => state.session.user);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name,
      user_id: sessionUser.id
    };

    dispatch(createPlaylist(payload))

    closeModal();

  };

  return (
    <div className="new-form-holder">
      <div className="errors">
          <ul>
            {errorMessages.map(error=>(
              <li>{error}</li>
            ))}
          </ul>
        </div>

      <form className="create-playlist" onSubmit={handleSubmit}>

        <label>Name: </label>
        <input
          type="text"
          placeholder="Playlist Name"
          required
          value={name}
          onChange={updateName}
        />


        <button type="submit" disabled={!!errorMessages.length} >Add new Playlist</button>
      </form>

    </div>
  )
}

export default CreatePlaylistForm

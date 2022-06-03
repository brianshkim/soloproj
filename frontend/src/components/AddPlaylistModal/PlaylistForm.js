import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createSong } from "../../store/songs"
import ErrorMessage from "../ErrorMessage";
import * as sessionActions from "../../store/session";
import { ValidationError } from "../../utils/validationError";
import { createPlaylist } from "../../store/playlist";


const CreatePlaylistForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [isLoaded, setIsLoaded] = useState(false)

  const [errorMessages, setErrorMessages] = useState({})
  const [name, setName] = useState("")

  const updateName = (e) => setName(e.target.value);


  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const sessionUser = useSelector((state) => state.session.user);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name,
      user_id: sessionUser.id
    };

    let playlist;

      playlist = dispatch(createPlaylist(payload));
      console.log('COMPONENT TRY BLOCK - AFTER DISPATCH - THIS IS createdPokemon ->', createSong)

    if (playlist) {
      setErrorMessages({});
     // history.push(`/song/${newSong.id}`);
    }

  };

  return (
    <div className="new-form-holder">
      <ErrorMessage message={errorMessages.overall} />
      <form className="create-song" onSubmit={handleSubmit}>

        <label>Name: </label>
        <input
          type="text"
          placeholder="Playlist Name"
          required
          value={name}
          onChange={updateName}
        />

        <ErrorMessage label={"name"} message={errorMessages.name} />
        <button type="submit" >Add new Playlist</button>
      </form>

    </div>
  )
}

export default CreatePlaylistForm

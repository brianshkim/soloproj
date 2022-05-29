import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createSong } from "../store/songs"
import ErrorMessage from "./ErrorMessage";
import * as sessionActions from "../store/session";
import { ValidationError } from "../utils/validationError";

const CreateSongForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()



  const [errorMessages, setErrorMessages] = useState({})
  const [title, setTitle] = useState("")
  const [releaseDate, setReleaseDate] = useState("")
  const [artist, setArtist] = useState("")
  const [songPath, setSongPath] = useState("")
  const [imagePath, setImagePath] = useState("")
  const [userId, setUserId] = useState(0)
  const [albumName, setAlbumName] = useState("")
  const [albumId, setAlbumId] = useState(0)
  const [playlistId, setPlaylistId] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)


  const updateTitle = (e) => setTitle(e.target.value);
  const updateArtist = (e) => setArtist(e.target.value);
  const updateReleaseDate = (e) => setReleaseDate(e.target.value)
  const updateSongPath = (e) => setSongPath(e.target.value);
  const updateImagePath = (e) => setImagePath(e.target.value);
  const updateUserId = (e) => setUserId(e.target.value);
  const updateAlbumName = (e) => setAlbumName(e.target.value);
  const updateAlbumId = (e) => setAlbumId(e.target.value);
  const updatePlaylistId = (e) => setPlaylistId(e.target.value);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const sessionUser = useSelector((state) => state.session.user);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setUserId(sessionUser.id)

    const payload = {
      title,
      artist,
      releaseDate,
      songPath,
      imagePath,
      userId,
      albumName,
      albumId,
    };

    let newSong;
    try {
      console.log('COMPONENT TRY BLOCK - BEFORE DISPATCH - THIS IS PAYLOAD ->', payload)
      newSong = await dispatch(createSong(payload));
      console.log('COMPONENT TRY BLOCK - AFTER DISPATCH - THIS IS createdPokemon ->', createSong)
    } catch (error) {
      if (error instanceof ValidationError) setErrorMessages(error.errors);
      else setErrorMessages({ overall: error.toString().slice(7) });
    }
    if (newSong) {
      setErrorMessages({});
      history.push(`/song/${newSong.id}`);
    }
  };



  return (
    <div className="new-form-holder centered middled">
      <ErrorMessage message={errorMessages.overall} />
      <form className="create-song" onSubmit={handleSubmit}>
      <label>Song Title: </label>
        <input
          type="text"
          placeholder="Song Title"
          min="1"
          required
          value={title}
          onChange={updateTitle}
        />

        <ErrorMessage label={"title"} message={errorMessages.title} />
        <label>Artist: </label>
        <input
          type="text"
          placeholder="Artist"
          required
          value={artist}
          onChange={updateArtist}
       />

        <ErrorMessage label={"artist"} message={errorMessages.artist} />
        <label>Release Date: </label>
        <input
          type="date"
          placeholder="Release Date"
          min="0"
          max="100"
          required
          value={releaseDate}
          onChange={updateReleaseDate}
        />
        <ErrorMessage label={"releaseDate"} message={errorMessages.releaseDate} />
        <label>Image URL: </label>
        <input
          type="text"
          placeholder="Image URL"
          value={imagePath}
          onChange={updateImagePath}
        />

        <ErrorMessage label={"imagePath"} message={errorMessages.imagePath} />
        <label>Song URL </label>
        <input
          type="text"
          placeholder="Song URL"
          value={songPath}
          onChange={updateSongPath}
        />
        <ErrorMessage label={"songPath"} message={errorMessages.songPath} />
        <label>Album Name: </label>
        <input
          type="text"
          placeholder="Album Name"
          value={albumName}
          onChange={updateAlbumName}
        />

        <ErrorMessage label={"albumName"} message={errorMessages.albumName} />

        <button type="submit">Add new Song</button>

      </form>
    </div>
  );
};

export default CreateSongForm

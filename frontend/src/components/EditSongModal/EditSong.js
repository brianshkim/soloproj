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

const EditSong = ({ id, closeModal }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const song = useSelector(state => state.songs[id])
  console.log(song)



  const [errorMessages, setErrorMessages] = useState([])
  const [title, setTitle] = useState(song.title)
  const [releaseDate, setReleaseDate] = useState(song.releaseDate)
  const [artist, setArtist] = useState(song.artist)
  const [songPath, setSongPath] = useState(song.songPath)
  const [imagePath, setImagePath] = useState(song.imagePath)
  const [userId, setUserId] = useState(song.id)
  const [albumName, setAlbumName] = useState(song.albumName)
  const [albumId, setAlbumId] = useState(song.albumId)
  const [playlistId, setPlaylistId] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)


  const updateTitle = (e) => setTitle(e.target.value);
  const updateArtist = (e) => setArtist(e.target.value);
  const updateReleaseDate = (e) => setReleaseDate(e.target.value)
  const updateSongPath = (e) => setSongPath(e.target.value);
  const updateImagePath = (e) => setImagePath(e.target.value);

  const updateAlbumName = (e) => setAlbumName(e.target.value);
  const updateAlbumId = (e) => setAlbumId(e.target.value);
  const updatePlaylistId = (e) => setPlaylistId(e.target.value);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    const errors = []

    function checkURL(url) {
      if (typeof url !== 'string') return false;
      return (url.match(/\.(jpg|jpeg|gif|png)$/) != null);
    }
    if (title.length < 1) {
      errors.push('Title cannot be empty')
    }

    if (artist.length < 1) {
      errors.push("Artist cannot be empty")
    }
    if (!releaseDate instanceof Date) {
      errors.push("Must be a valid date")
    }
    if (!checkURL(imagePath) && imagePath.length > 0) {
      errors.push("Must be a valid URL")
    }

    if (albumName.length < 1) {
      errors.push('Album Name cannot be empty')
    }

    setErrorMessages(errors)


  }, [title, artist, releaseDate, imagePath, albumName])






  const handleSubmit = async (e) => {
    e.preventDefault();


    const payload = {
      title,
      artist,
      releaseDate,
      songPath,
      imagePath,
      albumName,
      albumId,
      user_id: sessionUser.id
    };

    dispatch(updateSong(id,payload))
    setErrorMessages([]);
    closeModal();









  };

  console.log(typeof (errorMessages))


  return (
    <div>


      <div className="new-form-holder">
        <div className="errors">
          <ul>
            {errorMessages.map(error => (
              <li>{error}</li>
            ))}
          </ul>
        </div>

        <form className="create-song" onSubmit={handleSubmit}>

          <label>Song Title: </label>
          <input
            type="text"
            placeholder="edit title"
            value={title}
            onChange={updateTitle}
          />

          <ErrorMessage label={"title"} message={errorMessages.title} />
          <label>Artist: </label>
          <input
            type="text"
            placeholder="edit artist"
            value={artist}
            onChange={updateArtist}
          />

          <ErrorMessage label={"artist"} message={errorMessages.artist} />
          <label>Release Date: </label>
          <input
            type="edit date"
            placeholder="Release Date"
            value={releaseDate}
            onChange={updateReleaseDate}
          />
          <ErrorMessage label={"releaseDate"} message={errorMessages.releaseDate} />
          <label>Image URL: </label>
          <input
            type="text"
            placeholder="edit Image URL"
            value={imagePath}
            onChange={updateImagePath}
          />

          <ErrorMessage label={"imagePath"} message={errorMessages.imagePath} />
          <label>Song URL </label>
          <input
            type="text"
            placeholder="edit Song URL"
            value={songPath}
            onChange={updateSongPath}
          />
          <ErrorMessage label={"albumName"} message={errorMessages.albumName} />
          <label>Album Name: </label>
          <input
            type="text"
            placeholder="edit album Name"
            value={albumName}
            onChange={updateAlbumName}
          />



          <button type="submit" className="submiteditbutton" disabled={!!errorMessages.length}>Submit Edit</button>

        </form>
      </div>
    </div>
  );

};

export default EditSong

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createSong } from "../../store/songs"
import ErrorMessage from "../ErrorMessage";
import * as sessionActions from "../../store/session";
import { getAlbums } from "../../store/albums";
import { ValidationError } from "../../utils/validationError";
import Navigation from "../Navigation"
import SignupFormPage from "../SignupFormPage";
import { Navlink, Route, useParams, Switch } from 'react-router-dom'

const CreateSongForm = (closeModal) => {
  const dispatch = useDispatch()
  const history = useHistory()



  const [errorMessages, setErrorMessages] = useState([])
  const [title, setTitle] = useState("")
  const [releaseDate, setReleaseDate] = useState("")
  const [artist, setArtist] = useState("")
  const [songPath, setSongPath] = useState("")
  const [imagePath, setImagePath] = useState("")
  const [userId, setUserId] = useState(0)
  const [albumName, setAlbumName] = useState("")

  const [playlistId, setPlaylistId] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [image, setImage] = useState(null)


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
 const albums = useSelector((state)=>state.albums)
  const albumobj = Object.values(albums)
  console.log(albumobj)
  const [albumId, setAlbumId] = useState(albumobj[0].id)

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
    console.log(file)
  };

  const onselect = (e) =>{
    console.log(e.target.value)
    let index = e.target.selectedIndex;
    var optionElement = e.target.childNodes[index].getAttribute('id')
    console.log(optionElement)

      setAlbumName(e.target.value)
      setAlbumId(optionElement)



  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title,
      artist,
      releaseDate,
      image,
      imagePath,
      user_id: sessionUser.id,
      albumName,
      album_id:albumId,
    };

    return dispatch(createSong(payload)).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrorMessages(data.errors);
    }).then(()=>closeModal())
    //then(() => {
    //  setTitle("");
    //  setArtist("");
    //  setReleaseDate("");
    //  setSongPath("");
    //  setImagePath('');
    //  setSongPath("");
    //  setUserId(0);
    //  setAlbumId(0)
    //});
//




  };

  console.log(typeof (albums))
  console.log(sessionUser.id)

  return (
    <div>
      <div className="new-form-holder">
        <ErrorMessage message={errorMessages.overall} />
        <form className="create-song" onSubmit={handleSubmit}>

          <label>Song Title: </label>
          <input
            type="text"
            placeholder="Song Title"
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
            type="file"
            placeholder="Song URL"
            onChange={updateFile}
          />
          <ErrorMessage label={"songPath"} message={errorMessages.songPath} />
          <label>New Album Name: </label>
          <input
            type="text"
            placeholder="Album Name"
            value={albumName}
            onChange={updateAlbumName}
          />
          <ErrorMessage label={"albumName"} message={errorMessages.albumName} />
          <label>Choose an existing album:</label>
          <select
          onChange={onselect}
          >
            {albumobj.map(album=>(
              <option key={album.id} id={album.id}>

              {album.title}</option>
           ))

          }

          </select>

          <button type="submit">Add new Song</button>

        </form>
      </div>
    </div>
  );

};

export default CreateSongForm

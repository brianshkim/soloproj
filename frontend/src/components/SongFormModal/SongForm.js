import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createSong } from "../../store/songs"
import ErrorMessage from "../ErrorMessage";
import * as sessionActions from "../../store/session";
import { getAlbums } from "../../store/albums";
import { ValidationError } from "../../utils/validationError";
import Navigation from "../Navigation"

import { Navlink, Route, useParams, Switch } from 'react-router-dom'
import "./songform.css"



const CreateSongForm = ({setShowModal}) => {
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

  const [albumId, setAlbumId] = useState(albumobj[0].id)

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
    console.log(file)
  };

  const onselect = (e) =>{

    let index = e.target.selectedIndex;
    var optionElement = e.target.childNodes[index].getAttribute('id')
    console.log(optionElement)

      setAlbumName(e.target.value)
      setAlbumId(optionElement)



  }

  useEffect(()=>{
    const errors = []
    function checkURL(url) {
      if (typeof url !== 'string') return false;
      return (url.match(/\.(jpg|jpeg|gif|png)$/) != null);
    }
    if (title.length < 1){
      errors.push('Title cannot be empty')
    }

    if (artist.length < 1){
      errors.push("Artist cannot be empty")
    }
    if (!releaseDate instanceof Date){
      errors.push("Must be a valid date")
    }
    if (!checkURL(imagePath) && imagePath.length>0){

      errors.push("Must be a valid URL")
    }

    if (albumName.length < 1){
      errors.push('Album Name cannot be empty')
    }

    if(!image){
      errors.push("Please upload a song")
    }

    setErrorMessages(errors)


  }, [title, artist, releaseDate, imagePath, albumName, image])


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


    dispatch(createSong(payload))
    setErrorMessages([]);
    setShowModal(false)
  }


  return (
    <div>
       <div className="formimgdiv">
        <img src="https://www.desktopbackground.org/p/2014/09/11/823099_black-and-white-wallpapers-music-hd-hd-images-new_1600x1000_h.jpg" height="500" width="600x"></img>
        </div>

      <div className="new-form-holder">
        <div className="errors">
          {!!errorMessages && <>Errors:</>}
          <ol>
            {errorMessages.map(error=>(
              <li>{error}</li>
            ))}
          </ol>
        </div>
        <br></br>


        <form id="create-song" onSubmit={handleSubmit}>

          <label className="allLabels">Song Title:  </label>
          <input
          id="allinputs"
            type="text"
            placeholder="Song Title"
            required
            value={title}
            onChange={updateTitle}
          />
          <br></br>
          <br></br>
          <br></br>


          <label className="allLabels">Artist: </label>
          <input
          id="allinputs"
            type="text"
            placeholder="Artist"
            required
            value={artist}
            onChange={updateArtist}
          />
          <br></br>
          <br></br>
          <br></br>

          <label className="allLabels">Release Date: </label>
          <input
          id="allinputs"
            type="date"
            placeholder="Release Date"
            required
            value={releaseDate}
            onChange={updateReleaseDate}
          />
          <br></br>
          <br></br>

          <label className="allLabels">Image URL: </label>
          <input
          id="allinputs"
            type="text"
            placeholder="Image URL"
            value={imagePath}
            onChange={updateImagePath}
          />
          <br></br>
          <br></br>
          <br></br>



          <label className="allLabels">Song Upload </label>
          <input
          id="allinputs"
            type="file"
            placeholder="Song URL"
            onChange={updateFile}
          />
          <br></br>
          <br></br>
          <br></br>


          <label className="allLabels"l>New Album Name: </label>
          <input
          id="allinputs"
            type="text"
            placeholder="Album Name"
            value={albumName}
            onChange={updateAlbumName}
          />
               <br></br>
          <br></br>
          <br></br>



          <label className="allLabels">Choose an existing album:</label>
          <select
          onChange={onselect}
          >
            <option></option>
            {albumobj.map(album=>(
              <option key={album.id} id={album.id}>

              {album.title}</option>
           ))

          }

          </select>
          <br></br>
          <br></br>
          <br></br>

          <button
          id="songsubmitbutton"
          disabled={!!errorMessages.length}
          type="submit">Add new Song</button>

        </form>
      </div>
    </div>
  );

};

export default CreateSongForm

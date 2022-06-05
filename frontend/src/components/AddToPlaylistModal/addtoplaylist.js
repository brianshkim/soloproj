import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createSong } from "../../store/songs"
import ErrorMessage from "../ErrorMessage";
import * as sessionActions from "../../store/session";
import { ValidationError } from "../../utils/validationError";
import { createPlaylist } from "../../store/playlist";
import { addtoplaylist } from "../../store/songs"
import "./addtoplaylist.css"


const AddToPlaylistForm = ({ id, closeModal }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  console.log(id)
  const [isLoaded, setIsLoaded] = useState(false)
  const sessionUser = useSelector((state) => state.session.user);

  const getplaylists = useSelector((state) => state.playlists)
  console.log(getplaylists)

  const playlists = Object.values(getplaylists)
  console.log(playlists)

  const [errorMessages, setErrorMessages] = useState({})
  const [name, setName] = useState("")
  const [listid, setListId] = useState(playlists[0].id)

  const updateName = (e) => setName(e.target.value);






  const onselectplaylist =() => {
    console.log(listid)



    const payload = {
      playlist_id: listid,
    }
    dispatch(addtoplaylist(id, payload))
    closeModal();

  }

  const ondropdown = (e) => {
    let index = e.target.selectedIndex;
    setListId(Number(e.target.childNodes[index].getAttribute('id')))



  }



  return (
    <div className="addtoplaylist">
      <form id="addtoplaylistform">
        <select id="addtoplaylistselect"
          onChange={ondropdown}

        >
          {playlists &&

            playlists.map((playlist) => (
              <option id={playlist.id} name="playlistoption" >{playlist.name}</option>
            ))
          }

        </select>
        <button id="addtoaplaylistbutton"onClick={onselectplaylist}>Add To Playlist</button>
      </form>

    </div>
  )
}

export default AddToPlaylistForm

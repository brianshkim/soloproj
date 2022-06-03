import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createSong } from "../../store/songs"
import ErrorMessage from "../ErrorMessage";
import * as sessionActions from "../../store/session";
import { ValidationError } from "../../utils/validationError";
import { createPlaylist } from "../../store/playlist";
import { addtoplaylist } from "../../store/songs"


const AddToPlaylistForm = ({ id, closeModal }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [isLoaded, setIsLoaded] = useState(false)

  const [errorMessages, setErrorMessages] = useState({})
  const [name, setName] = useState("")
  const [listid, setListId] = useState(0)

  const updateName = (e) => setName(e.target.value);




  const sessionUser = useSelector((state) => state.session.user);

  const getplaylists = useSelector((state) => state.playlists)

  const playlists = Object.values(getplaylists)
  console.log(playlists)

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
      <form id="playlists-dropdown">
        <select id="playlist-dropdown"
          onChange={ondropdown}

        >
          {playlists &&

            playlists.map((playlist) => (
              <option id={playlist.id} name="playlistoption" >{playlist.name}</option>
            ))
          }

        </select>
        <button onClick={onselectplaylist}>Add</button>
      </form>

    </div>
  )
}

export default AddToPlaylistForm

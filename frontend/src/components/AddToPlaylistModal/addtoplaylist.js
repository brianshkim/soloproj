import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createSong } from "../../store/songs"
import ErrorMessage from "../ErrorMessage";
import * as sessionActions from "../../store/session";
import { ValidationError } from "../../utils/validationError";
import { createPlaylist } from "../../store/playlist";
import {addtoplaylist} from "../../store/songs"


const AddToPlaylistForm = ({id}) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [isLoaded, setIsLoaded] = useState(false)

  const [errorMessages, setErrorMessages] = useState({})
  const [name, setName] = useState("")

  const updateName = (e) => setName(e.target.value);




  const sessionUser = useSelector((state) => state.session.user);
  const playlists = useSelector((state)=>state.playlists.list)

  const onselectplaylist = async (e) => {

    }



  return (
    <div className="addtoplaylist">
      <form id="playlists-dropdown">
                    <select id="playlist-dropdown"
                        onChange={(e)=>onselect(e)}>
                        {playlists &&

                            playlists.map((playlist) => (
                                <option id={playlist.id}>{playlist.name}</option>
                            ))
                        }



                    </select>
                    </form>

    </div>
  )
}

export default AddToPlaylistForm

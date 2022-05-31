import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { createSong, getSongs, deleteSong, getSongsUser } from "../../store/songs"
import ErrorMessage from "../ErrorMessage";
import * as sessionActions from "../../store/session";
import { ValidationError } from "../../utils/validationError";
import CreateSongForm from "../SongFormModal/SongForm"
import AddSongModal from "../SongFormModal";
import EditSongModal from "../EditSongModal";
import ReactJkMusicPlayer from 'react-jinke-music-player'
import 'react-jinke-music-player/assets/index.css'


import CreatePlaylistForm from "../AddPlaylistModal/PlaylistForm"


import { Navlink, Route, useParams, Switch } from 'react-router-dom'
import './Home.css'

const Upload = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [isLoaded, setIsLoaded] = useState(false)
    const sessionUser = useSelector(state => state.session.user);
    const [isUpload, setIsUpload] = useState(false)
    const [isPlaylist, setIsPlaylist] = useState(false)

    const [playlists, setPlaylists] = useState([])
    const songs = useSelector(state => state.songs)

    useEffect(() => {
        dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    }, [dispatch]);


    const clickhandle= ()=>{

    }




    return (
        <app>
            <header>
                <div className="header-container">
                    <div className="left-nav-logo">
                    </div>
                    <div className="left-header">
                        <nav class="leftnav" role="navigation">
                            <span>
                                <Link className="left-button" to="/home" >Home</Link>
                            </span>
                            <span>
                                <Link className="left-button" to="/upload">Upload</Link>
                            </span>
                            <span>
                                <Link className="left-button" to="/playlists">Playlists</Link>
                            </span>

                        </nav>


                    </div>
                    <div className="middle-header">
                        <div className="search-header" role="search">
                            <form className="searchHeader">

                            </form>

                        </div>
                    </div>
                </div>


                <div>
                    <button>Upload</button>
                </div>

















            </header>
        </app>
    )
}

export default Upload

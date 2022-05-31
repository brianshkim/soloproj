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
import MusicPlayer from "../MusicPlayer/MusicPlayer"
import $ from 'jquery'


import CreatePlaylistForm from "../AddPlaylistModal/PlaylistForm"


import { Navlink, Route, useParams, Switch } from 'react-router-dom'
import './Home.css'

const Home = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [isLoaded, setIsLoaded] = useState(false)
    const sessionUser = useSelector(state => state.session.user);
    const [isUpload, setIsUpload] = useState(false)
    const [isPlaylist, setIsPlaylist] = useState(false)


    const [playlists, setPlaylists] = useState([])
    const songs = useSelector(state => state.songs)

    useEffect(()=>{
        dispatch(getSongsUser())
    },dispatch)

    useEffect(() => {
        dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    }, [dispatch]);

    const songList = Object.values(songs)
    console.log(songList)



    const uploadclick = (e) =>{
        setIsUpload(true)
    }

    const playlistclick=(e)=>{
        setIsPlaylist(true)
    }

    const onDelete = (e)=>{
       let id= e.target.id
       let child = e.target
        dispatch(deleteSong(id))

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

            </div>
            <div className="banner-songs">
            <h2>Your Songs</h2>





            </div>

                <div className="background-songs" >
                    <AddSongModal />
                </div>

                <div className="song-list">
                    <div className="song-list-area">
                        <div className="tracks">
                            <ul className="tracklist"></ul>
                            {songList.map((song) => (
                                <li id={song.id}>
                                  {song.title &&
                                    <div className="trackitem">
                                        {song.title}
                                        <span class="track-buttons">
                                            <button class="delete-track" id={song.id} onClick={onDelete}>Delete Song</button>
                                            <EditSongModal id={song.id}/>
                                        </span>

                                    </div>
}
                                </li>
                            ))}





                        </div>




                    </div>
                </div>














        </header>
        <footer>
            <MusicPlayer />


        </footer>
        </app>
    )
}

export default Home

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

const Home = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [isLoaded, setIsLoaded] = useState(false)
    const sessionUser = useSelector(state => state.session.user);
    const [isUpload, setIsUpload] = useState(false)
    const [isPlaylist, setIsPlaylist] = useState(false)

    const audioLists = [
        {
          name: "Shiki No Uta",
          singer: "Luis Fonsi",
          musicSrc:
            "https://ia800700.us.archive.org/5/items/ShikiNoUta/ShikiNoUta-Minmi.mp3"
        },


      ];

    const [playlists, setPlaylists] = useState([])
    const songs = useSelector(state => state.songs)

    useEffect(() => {
        dispatch(getSongsUser())
    }, dispatch)

    useEffect(() => {
        dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    }, [dispatch]);


    const songList = Object.values(songs)
    console.log(songList)




    const onDelete = (e) => {
        let id = e.target.id
        let child = e.target
        dispatch(deleteSong(id))

    }


    return (
        <app>
            <header>
                <div className="header-container">
                    <div className="left-nav-logo">
                        <Link className="left-logo" to="/"><img src='https://t3.ftcdn.net/jpg/03/06/23/08/360_F_306230810_ROw7MaiXo82VjdlkKVrgs1M9wMG6T1ok.jpg' height="46" width="90"></img></Link>
                    </div>
                    <div className="left-header">
                        <nav class="leftnav" role="navigation">
                            <ul className="left-header-box">
                                <li><Link className="left-button" to="/home" >Home</Link></li>

                                <li><Link className="left-button" to="/upload">Upload</Link></li>

                                <li><Link className="left-button" to="/playlists">Playlists</Link></li>
                            </ul>
                        </nav>
                    </div>
                    <div className="middle-header">
                        <div className="search-header" role="search">
                            <form className="searchHeader">
                                <input class="searchbar" placeholder="Search">
                                </input>
                            </form>

                        </div>
                    </div>
                </div>

                </header>
                <div className="banner-songs">






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
                                            {song.imagePath &&
                                            <span className="smallalbum"><img src={song.imagePath} height="30" width="30"></img></span>}
                                            {song.title}
                                            <span class="track-buttons">
                                                <button class="delete-track" id={song.id} onClick={onDelete}>Delete Song</button>
                                                <EditSongModal id={song.id} />
                                            </span>

                                        </div>
                                    }
                                </li>
                            ))}





                        </div>




                    </div>
                </div>















            <footer>
                <ReactJkMusicPlayer
                    audioLists={audioLists} />



            </footer>
        </app>
    )
}

export default Home

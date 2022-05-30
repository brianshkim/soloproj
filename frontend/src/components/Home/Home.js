import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { createSong, getSongs } from "../../store/songs"
import ErrorMessage from "../ErrorMessage";
import * as sessionActions from "../../store/session";
import { ValidationError } from "../../utils/validationError";
import CreateSongForm from "../SongForm"
import CreatePlaylistForm from "../PlaylistForm"


import { Navlink, Route, useParams, Switch } from 'react-router-dom'
import './Home.css'

const Home = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [isLoaded, setIsLoaded] = useState(false)
    const sessionUser = useSelector(state => state.session.user);
    const [songList, setSongList] = useState([])


    const [playlists, setPlaylists] = useState([])
    const songs = useSelector(state => state.list)
    console.log(songs)
    useEffect(() => {
        dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    }, [dispatch]);

    useEffect(() => {

        dispatch(getSongs()).then((response) => setSongList(response))


    }, [dispatch])

    console.log(songList)



    return (
        <header>
            <div className="header-container">
                <div className="left-nav-logo">
                </div>
                <div className="left-header">
                    <nav class="leftnav" role="navigation">
                        <span>
                            <Link class="left-button" to="/home">Home</Link>
                        </span>
                        <span>
                            <Link class="left-button" to="/upload">Upload</Link>
                        </span>
                        <span>
                            <Link class="left-button" to="/playlists">Playlists</Link>
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
                <Switch>
                    <Route path="/upload"><CreateSongForm /></Route>
                    <Route path="/playlists"><CreatePlaylistForm /></Route>
                </Switch>
            </div>
            <div className="banner-songs">
                <h2>Your Songs</h2>
                <div className="background-songs" ></div>

                <div className="song-list">
                    <div className="song-list-area">
                        <div className="tracks">
                            <ul className="tracklist"></ul>
                            {songList.map(song => (
                                <li>{song.title}</li>
                            ))}





                        </div>



                    </div>
                </div>




            </div>

            <div className="banner-Playlists">
                <h2>Your Playlists</h2>



            </div>









        </header>
    )
}

export default Home

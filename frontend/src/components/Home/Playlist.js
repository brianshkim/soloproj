import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { getPlaylists } from "../../store/playlist"
import ErrorMessage from "../ErrorMessage";
import * as sessionActions from "../../store/session";
import AddPlaylistModal from "../AddPlaylistModal"


import CreatePlaylistForm from "../AddPlaylistModal/PlaylistForm"


import { Navlink, Route, useParams, Switch } from 'react-router-dom'
import './Home.css'
import AddPlaylist from "../AddPlaylistModal";

const Playlist = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [isLoaded, setIsLoaded] = useState(false)
    const sessionUser = useSelector(state => state.session.user);
    const [isUpload, setIsUpload] = useState(false)
    const [isPlaylist, setIsPlaylist] = useState(false)


    const [playlists, setPlaylists] = useState([])


    useEffect(()=>{
        dispatch(getPlaylists())
    },[dispatch])

    useEffect(() => {
        dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    }, [dispatch]);


    const onDelete = (e)=>{
       let id= e.target.id
       let child = e.target


    }
    return (
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
            <h2></h2>





            </div>

                <div className="background-songs" >
                    <span><AddPlaylistModal /></span>
                </div>

                <div className="song-list">
                    <div className="song-list-area">
                        <div className="tracks">
                            <ul className="tracklist"></ul>






                        </div>



                    </div>
                </div>














        </header>
    )
}

export default Playlist

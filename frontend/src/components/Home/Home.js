import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { createSong, getSongs, deleteSong, getSongsUser } from "../../store/songs"
import ErrorMessage from "../ErrorMessage";
import * as sessionActions from "../../store/session";
import { getPlaylists } from "../../store/playlist";
import { deletePlaylist } from "../../store/playlist";
import { getPlaylistSongs } from "../../store/playlistsongs";
import { ValidationError } from "../../utils/validationError";
import CreateSongForm from "../SongFormModal/SongForm"
import AddSongModal from "../SongFormModal";
import EditSongModal from "../EditSongModal";
import ReactJkMusicPlayer from 'react-jinke-music-player'
import 'react-jinke-music-player/assets/index.css'
import { getAlbums } from "../../store/albums";

import CreatePlaylistForm from "../AddPlaylistModal/PlaylistForm"


import { Navlink, Route, useParams, Switch } from 'react-router-dom'
import './Home.css'
import AddPlaylistModal from "../AddPlaylistModal";

const Home = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [isLoaded, setIsLoaded] = useState(false)
    const sessionUser = useSelector(state => state.session.user);


    const [url, setUrl] = useState("")

    const audioLists = [
        {
            name: "Shiki No Uta",
            singer: "Luis Fonsi",
            musicSrc:
                "https://ia800700.us.archive.org/5/items/ShikiNoUta/ShikiNoUta-Minmi.mp3"
        },


    ];




    useEffect(() => {
        dispatch(getSongsUser())
    }, [dispatch])

    useEffect(() => {
        dispatch(getPlaylists())
    }, [dispatch])

    const songList = useSelector(state => state.songs.list)
    const playlists = useSelector(state => state.playlists)
    const [playlistId, setPlaylistId] = useState(0)
    const [playlist, setPlaylist] = useState([songList])
    const playlistid = playlist.list
    const playlistsongs = useSelector(state=>state.playlistsongs.list)

    useEffect(() => {
        dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    }, [dispatch]);

    useEffect(() => {
        dispatch(getAlbums())
    }, [dispatch])

    useEffect(() => {
        console.log(playlistId)
        dispatch(getPlaylistSongs(playlistId))
        setPlaylist(playlistsongs)

    }, [dispatch, playlistId])



    const onselect = (e) => {
        let index = e.target.selectedIndex;
        var optionElement = e.target.childNodes[index].getAttribute('id')


        if (optionElement === "all") {
            setPlaylist(songList)

        }

        else{
            setPlaylistId(optionElement)

        }
    }

    const onclick = (e)=>{
        dispatch(deletePlaylist(playlistId))

    }

    const onDelete = (e) => {
        let id = e.target.id
        let child = e.target
        dispatch(deleteSong(id))

    }

    const imageclick = (e) => {
        setUrl(e.target.getAttribute('src'))
        console.log(url)

        let songdetails = e.target.id.split(",")
        let songalbumname = songdetails[0]
        let songartist = songdetails[1]
        let songreleasedate = songdetails[2]
        console.log(songdetails)

        const banner = document.getElementById("banner-songs")
        banner.innerHTML = `<img src=${url} height="380"></img>`

        let bannerdiv = document.createElement("div")
        let bannertitle = document.createElement('h1')
        let bannerdetail = document.createElement('h2')
        let bannerdetail2 = document.createElement('h3')

        bannertitle.className = "banner-title"
        bannertitle.innerText = songalbumname
        bannerdetail.innerText = songartist
        bannerdetail2.innerText = songreleasedate
        bannerdiv.append(bannertitle)
        bannerdiv.append(bannerdetail)
        bannerdiv.append(bannerdetail2)
        banner.append(bannerdiv)


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
            <div id="banner-songs">






            </div>

            <div className="background-songs" >
                <form id="playlists-dropdown">
                    <select id="playlist-dropdown"
                    onChange={onselect}
                    >
                        <option id="all">All Songs</option>
                        {playlists.list.map((playlist) => (
                            <option key={playlist.id} id={playlist.id}>{playlist.name}</option>
                        ))}



                    </select>
                    <button onClick={onclick}>Delete Playlist</button>
                </form>

                <AddSongModal />

                <span><AddPlaylistModal /></span>
            </div>

            <div className="song-list">
                <div className="song-list-area">
                    <div className="tracks">
                        <ul className="tracklist"></ul>
                        {playlist.map((song) => (
                            <li id={song.id}>
                                {song.title &&
                                    <div className="trackitem">
                                        {song.imagePath &&
                                            <span className="smallalbum"><button className="smallalbumimage" onClick={imageclick}><img id={`${song.albumName},${song.artist},${song.releaseDate}`} className="buttonimage" src={song.imagePath} height="30" width="30"></img></button></span>}
                                        {song.title}
                                        <span class="track-buttons">
                                            <button class="delete-track" id={song.id} onClick={onDelete}>Delete Song</button>
                                            <EditSongModal id={song.id} />
                                            <button class="add-to-playlist" id={song.id} name="">Add to a playlist</button>
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
                    audioLists={audioLists}
                    autoPlay={false}  />



            </footer>
        </app>
    )
}

export default Home

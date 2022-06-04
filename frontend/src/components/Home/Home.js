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
import AddToPlaylistModal from "../AddToPlaylistModal";
import EditPlaylistModal from "../EditPlaylist/";

import CreatePlaylistForm from "../AddPlaylistModal/PlaylistForm"


import { Navlink, Route, useParams, Switch } from 'react-router-dom'
import './Home.css'
import AddPlaylistModal from "../AddPlaylistModal";

let audioLists = [
    //{
    //    name: "Shiki No Uta",
    //    singer: "Luis Fonsi",
    //    musicSrc:
    //        "https://ia800700.us.archive.org/5/items/ShikiNoUta/ShikiNoUta-Minmi.mp3"
    //},


];

const Home = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [isLoaded, setIsLoaded] = useState(false)
    const sessionUser = useSelector(state => state.session.user);
    const [pressed, setPressed] = useState(true)
    const [id, setid] = useState(null)


    const [url, setUrl] = useState("")





    useEffect(() => {
        dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    }, [dispatch]);

    useEffect(() => {
        dispatch(getSongsUser())
    }, [dispatch])

    useEffect(() => {
        dispatch(getPlaylists())
    }, [dispatch])
    const getsongs = useSelector(state => state.songs)
    const songList = Object.values(getsongs)
    const getplaylists = useSelector(state => state.playlists)
    const playlists = Object.values(getplaylists)
    const [playlistId, setPlaylistId] = useState(0)
    const [playlist, setPlaylist] = useState(false)
    const [audioLists, setAudioLists] = useState([])
    let getplaylistsongs = useSelector(state => state.playlistsongs)
    const playlistsongs = Object.values(getplaylistsongs)



    useEffect(() => {
        dispatch(getAlbums())
    }, [dispatch])

    // useEffect(() => {
    //     console.log(playlistId)
    //     dispatch(getPlaylistSongs(playlistId))
    //
    //     setPlaylist(playlistsongs)
    //
    //
    // }, [dispatch, playlistId])




    const onselect = async (e) => {
        const empty = []
        setAudioLists(empty)
        setPressed(false)
        let index = e.target.selectedIndex;
        var optionElement = e.target.childNodes[index].getAttribute('id')
        console.log(optionElement)

        if (optionElement === null) setPressed(true)



        setPlaylistId(optionElement)
        dispatch(getPlaylistSongs(optionElement))
        // setPlaylist(playlistsongs)
        //console.log(playlistsongs)
        const audioListtemp = [];
        playlistsongs.forEach(song => {
            audioListtemp.push({
                name: song.title,
                singer: song.artist,
                musicSrc: song.songPath


            })
        })
        setAudioLists(audioListtemp)

       setid(optionElement)


    }

    const onclick = (e) => {
        console.log(playlistId)
        dispatch(deletePlaylist(playlistId))

    }





    const allsongs = (e) => {
        setPressed(true)
        const audioListtemp = [];
        songList.forEach(song => {
            audioListtemp.push({
                name: song.title,
                singer: song.artist,
                musicSrc: song.songPath


            })
        })
        setAudioLists(audioListtemp)

        document.getElementById("playlist-dropdown").value = "null"


    }
    console.log(audioLists)



    const onDelete = (e) => {
        let id = e.target.parentElement.id
        let child = e.target
        dispatch(deleteSong(id))
        // child.parentElement.parentElement.remove()

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

                            </ul>
                        </nav>
                    </div>


                </div>
            </header>
            <div id="banner-songs">

            </div>

            <div className="background-songs" >

                <button onClick={allsongs} class="allsongsbutton">All Songs</button>

                <h2 id="playlisth2">PLAYLISTS:</h2>
                <form id="playlists-dropdown">
                    <select id="playlist-dropdown"
                        onChange={(e) => onselect(e)}>
                        <option value="null"></option>
                        {playlists &&

                            playlists.map((playlist) => (
                                <option id={playlist.id}>{playlist.name}</option>
                            ))
                        }



                    </select>
                    <div id="playlistbuttonsdiv">
                        <button onClick={onclick} class="deleteplaylistbutton">Delete Playlist</button>
                        {id && <EditPlaylistModal id={id}/>}

                    </div>
                </form>

                <AddSongModal />

                <span><AddPlaylistModal /></span>
            </div>

            <div className="song-list">
                <div className="song-list-area">
                    <div className="tracks">
                        {!pressed &&
                            <ul className="tracklist">
                                {playlistsongs.map((song) => (
                                    <li id={song.id} className="tracksongid">
                                        {song.title &&
                                            <div className="trackitem">
                                                {song.imagePath &&
                                                    <span className="smallalbum"><button className="smallalbumimage" onClick={imageclick}><img id={`${song.albumName},${song.artist},${song.releaseDate}`} className="buttonimage" src={song.imagePath} height="30" width="30"></img></button></span>}
                                                <span className="songartist">{song.artist}</span>
                                                {song.title}
                                                <span class="track-buttons">
                                                    <button class="delete-track" id={song.id} onClick={onDelete}><i class="fa-solid fa-trash-can"></i></button>
                                                    <EditSongModal id={song.id} />
                                                    <AddToPlaylistModal id={song.id} />
                                                </span>

                                            </div>
                                        }
                                    </li>

                                ))}
                            </ul>}
                        {pressed && songList &&
                            <ul className="tracklist">
                                {songList.map((song) => (
                                    <li id={song.id} class="tracksongid">
                                        {song.title &&
                                            <div className="trackitem">
                                                {song.imagePath &&
                                                    <span className="smallalbum"><button className="smallalbumimage" onClick={imageclick}><img id={`${song.albumName},${song.artist},${song.releaseDate}`} className="buttonimage" src={song.imagePath} height="30" width="30"></img></button></span>}
                                                <span className="songartist">{`${song.artist}`}</span>
                                                {`-${song.title}`}
                                                <span class="track-buttons">
                                                    <button class="delete-track" id={song.id} onClick={onDelete}><i class="fa-solid fa-trash-can"></i></button>
                                                    <EditSongModal id={song.id} />
                                                    <AddToPlaylistModal id={song.id} />
                                                </span>

                                            </div>
                                        }
                                    </li>

                                ))}
                            </ul>
                        }


                    </div>

                </div>
            </div>


            <footer>
                <ReactJkMusicPlayer
                    audioLists={audioLists}
                    autoPlay={false}
                    clearPriorAudioLists={true} />



            </footer>
        </app>
    )
}

export default Home

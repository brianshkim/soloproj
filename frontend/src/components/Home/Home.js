import { useEffect, useState, useContext, createContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { createSong, getSongs, deleteSong, getSongsUser } from "../../store/songs"
import ErrorMessage from "../ErrorMessage";
import * as sessionActions from "../../store/session";
import { getPlaylists } from "../../store/playlist";
import { deletePlaylist } from "../../store/playlist";
import { deleteAllPlaylistSongs, getPlaylistSongs } from "../../store/playlistsongs";
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

export const idContext = createContext();

const Home = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [isLoaded, setIsLoaded] = useState(false)
    const sessionUser = useSelector(state => state.session.user);
    const [pressed, setPressed] = useState(true)
    let [id, setid] = useState(null)



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
    console.log(playlists)
    const [playlistId, setPlaylistId] = useState(0)
    const [playlist, setPlaylist] = useState(false)
    const [audioLists, setAudioLists] = useState([])
    let getplaylistsongs = useSelector(state => state.playlistsongs)
    const playlistsongs = Object.values(getplaylistsongs)

    console.log(playlistsongs)



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
        console.log(playlists)
        let foundplaylist = songList.find(song=>song.playlist_id==optionElement)
        console.log(foundplaylist)
        console.log(getplaylistsongs)



        setPlaylistId(optionElement)
        dispatch(getPlaylistSongs(optionElement))
        // setPlaylist(playlistsongs)
        //console.log(playlistsongs)
        //const audioListtemp = [];
        //console.log(playlistsongs)
        //playlistsongs.forEach(song => {
        //    audioListtemp.push({
        //        name: song.title,
        //        singer: song.artist,
        //        musicSrc: song.songPath
//
//
        //    })
        //})
        //setAudioLists(audioListtemp)

        //console.log(audioLists)

       setid(optionElement)


    }

    const playPlaylist = (e) =>{
        e.preventDefault();
        const audioListtemp = [];
        console.log(playlistsongs)
        playlistsongs.forEach(song => {
            audioListtemp.push({
                name: song.title,
                singer: song.artist,
                musicSrc: song.songPath


            })
        })
        setAudioLists(audioListtemp)

        console.log(audioLists)


    }

    const onclick = (e) => {
        e.preventDefault()
        let dropdown = document.getElementById("playlist-dropdown")
        dropdown.value="null"
        setid(null)
        dispatch(deletePlaylist(playlistId))
        dispatch(deleteAllPlaylistSongs())
    }





    const allsongs = (e) => {
        setPressed(true)
        setid(null)
        setAudioLists([])

        const audioListtemp = [];
        songList.forEach(song => {
            audioListtemp.push({
                name: song.title,
                singer: song.artist,
                musicSrc: song.songPath


            })
        })
        setAudioLists(audioListtemp)
        console.log(audioLists)

        document.getElementById("playlist-dropdown").value = "null"


    }




    const onDelete = (e) => {
        let id = e.target.parentElement.id
        let child = e.target
        dispatch(deleteSong(id))
        // child.parentElement.parentElement.remove()

    }

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout()).then(history.push('/'))
      };


    const imageclick = (e) => {
        e.preventDefault()
        setUrl(e.target.getAttribute('src'))
        console.log(url)
        setAudioLists([])



        let songdetails = e.target.id.split(",")
        console.log(songdetails)
        let songalbumname = songdetails[0]
        let songartist = songdetails[1]
        let songreleasedate = songdetails[2]
        let songimage = songdetails[3]
        let songname = songdetails[4]
        let songpath = songdetails[5].split(" ")
        let songpath1 = songpath[1]
        console.log(songpath1)
        setAudioLists([])
        const tempAudioList = [{
            name: songname,
            singer:songartist,
            musicSrc:songpath1
        }]

        setAudioLists(tempAudioList)
        console.log(audioLists)


        const banner = document.getElementById("banner-songs")
        banner.innerHTML = `<img src=${songimage} height="380"></img>`

        let bannerdiv = document.createElement("div")
        let bannertitle = document.createElement('h1')
        let bannerdetail = document.createElement('h2')
        let bannerdetail2 = document.createElement('h3')
        let bannerdetail3 = document.createElement('h1')

        bannertitle.className = "banner-title"
        bannertitle.innerText = songalbumname
        bannerdetail.innerText = songartist
        bannerdetail2.innerText = songreleasedate
        bannerdetail3.innerText = songname
        bannerdiv.append(bannertitle)
        bannerdiv.append(bannerdetail)
        bannerdiv.append(bannerdetail2)
        bannerdiv.append(bannerdetail3)
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
                                <li>

          </li>

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
                        {id &&
                        <>                        <button onClick={onclick} class="deleteplaylistbutton">Delete Playlist</button>
                        <button onClick={playPlaylist} class="deleteplaylistbutton play-playlist">Play</button></>}



                    </div>

                </form>
                {id && <EditPlaylistModal id={id}/>}


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
                                                    <span className="smallalbum"><button className="smallalbumimage" onClick={imageclick}><img id={`${song.albumName},${song.artist},${song.releaseDate}, ${song.imagePath}, ${song.title}, ${song.songPath}`} className="buttonimage" src={song.imagePath} height="30" width="30"></img></button></span>}
                                                <span className="songartist">{song.artist}</span>
                                                {song.title}
                                                <span class="track-buttons">


                                                    <EditSongModal id={song.id} />
                                                     <AddToPlaylistModal playlists={song.id} id={song.id} />
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
                                                    <span className="smallalbum"><button className="smallalbumimage" onClick={imageclick}><img id={`${song.albumName},${song.artist},${song.releaseDate}, ${song.imagePath}, ${song.title}, ${song.songPath}`} className="buttonimage" src={song.imagePath} height="30" width="30"></img></button></span>}
                                                <span className="songartist">{`${song.artist}`}</span>
                                                {`-${song.title}`}
                                                <span class="track-buttons">
                                                    <button class="delete-track" id={song.id} onClick={onDelete}><i class="fa-solid fa-trash-can"></i></button>
                                                    <EditSongModal id={song.id} />
                                                    <AddToPlaylistModal playlists={playlists} id={song.id} />
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
                clearPriorAudioLists
                quietUpdate
                audioLists={audioLists}
                autoPlay

                     />



            </footer>
        </app>
    )
}

export default Home

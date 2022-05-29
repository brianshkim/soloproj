import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {createSong} from "../store/songs"
import ErrorMessage from "./ErrorMessage";
import * as sessionActions from "../../store/session";

const CreateSongForm = () =>{


    const [errorMessages, setErrorMessages]=useState({})
    const [title, setTitle] = useState("")
    const [releaseDate, setReleaseDate] = useState("")
    const [artist, setArtist] = useState("")
    const [songPath, setSongPath] = useState("")
    const [imagePath, setImagePath] = useState("")
    const [userId, setUserId] = useState(0)
    const [albumName, setAlbumName] = useState("")
    const [albumId, setAlbumId] = useState(0)
    const [playlistId, setPlaylistId] = useState(0)


    const updateTitle = (e) => setTitle(e.target.value);
    const updateArtist = (e) => setArtist(e.target.value);
    const updateReleaseDate = (e) => setReleaseDate(e.target.value)
    const updateSongPath = (e) => setSongPath(e.target.value);
    const updateImagePath = (e) => setImagePath(e.target.value);
    const updateUserId = (e) => setUserId(e.target.value);
    const updateAlbumName= (e) => setAlbumName(e.target.value);
    const updateAlbumId= (e) => setAlbumId(e.target.value);
    const updatePlaylistId= (e) => setPlaylistId(e.target.value);

    useEffect(() => {
        dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    }, [dispatch]);

    const sessionUser = useSelector(state => state.session.user);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setUserId(state.session.user.id)

        const payload = {
          title,
          artist,
          releaseDate,
          songPath,
          imagePath,
          userId,
          albumName,
          albumId,
        };

        let newSong;
        try {
          console.log('COMPONENT TRY BLOCK - BEFORE DISPATCH - THIS IS PAYLOAD ->', payload)
          newSong = await dispatch(createSong(payload));
          console.log('COMPONENT TRY BLOCK - AFTER DISPATCH - THIS IS createdPokemon ->', createSong)
        } catch (error) {
          if (error instanceof ValidationError) setErrorMessages(error.errors);
          else setErrorMessages({ overall: error.toString().slice(7) });
        }
        if (createdPokemon) {
          setErrorMessages({});
          history.push(`/song/${newSong.id}`);
          hideForm();
        }
      };



    return (
        <section className="new-form-holder centered middled">
          <ErrorMessage message={errorMessages.overall} />
          <form className="create-song" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Song Title"
              min="1"
              required
              value={title}
              onChange={updateTitle}
            >Song Title:
            </input>
            <ErrorMessage label={"title"} message={errorMessages.title} />
            <input
              type="text"
              placeholder="Artist"
              required
              value={attack}
              onChange={updateAttack}
            >
                Artist:
                </input>
            <ErrorMessage label={"artist"} message={errorMessages.artist} />
            <input
              type="date"
              placeholder="Release Date"
              min="0"
              max="100"
              required
              value={releaseDate}
              onChange={updateReleaseDate}
            >Release Date:
            </input>
            <ErrorMessage label={"releaseDate"} message={errorMessages.releaseDate} />
            <input
              type="text"
              placeholder="Image URL"
              value={imagePath}
              onChange={updateImagePath}
            >Image URL:
                </input>
            <ErrorMessage label={"imagePath"} message={errorMessages.imagePath} />
            <input
              type="text"
              placeholder="Song URL"
              value={songPath}
              onChange={updateSongPath}
            >Song URL:
                </input>
            <ErrorMessage label={"songPath"} message={errorMessages.songPath} />
            <input
              type="text"
              placeholder="Album Name"
              value={albumName}
              onChange={updateAlbumName}
            > Album Name:
                </input>
            <input
              type="text"
              placeholder="Move 2"
              value={move2}
              onChange={updateMove2}
            />
            <ErrorMessage label={"Moves"} message={errorMessages.moves} />
            <select onChange={updateType} value={type}>
              {pokeTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
            <ErrorMessage label={"Type"} message={errorMessages.type} />
            <button type="submit">Add new Song</button>
            <button type="button" onClick={handleCancelClick}>
              Cancel
            </button>
          </form>
        </section>
      );
    };

}

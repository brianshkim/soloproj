import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createSong } from "../store/songs"
import ErrorMessage from "./ErrorMessage";
import * as sessionActions from "../store/session";
import { ValidationError } from "../utils/validationError";


const CreateSongForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [errorMessages, setErrorMessages] = useState({})
    const [title, setTitle] = useState("")
    const [releaseDate, setReleaseDate] = useState("")
    const [artist, setArtist] = useState("")

    useEffect(() => {
        dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
      }, [dispatch]);

      const sessionUser = useSelector((state) => state.session.user);

      const handleSubmit = async (e) => {
        e.preventDefault();




        const payload = {
            name
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
        if (newSong) {
          setErrorMessages({});
          history.push(`/song/${newSong.id}`);
        }
      };

    return(
        null
    )
}

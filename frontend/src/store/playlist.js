import { ValidationError } from "../utils/validationError"
import { csrfFetch } from './csrf';
const LOAD = "playlist/LOAD";
const ADD = "playlist/ADD";
const ADD_SONG = "playlist/ADDSONG"



const load = (list) => ({
    type: LOAD,
    list,
  });


  const addPlaylist= (playlist) => {

    return {
      type: ADD,
      playlist:playlist,
    };
  };


  export const createPlaylist = (data) => async (dispatch) => {
    console.log("TOP OF THUNK IN STORE - data -> ", data);
    try {
      const response = await csrfFetch(`/api/playlists`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });


    if (!response.ok) {
        let error;
        if (response.status === 422) {
          error = await response.json();
          throw new ValidationError(error.errors, response.statusText);
        } else {
          let errorJSON;
          error = await response.text();
          try {
            // Check if the error is JSON, i.e., from the Pokemon server. If so,
            // don't throw error yet or it will be caught by the following catch
            errorJSON = JSON.parse(error);
          } catch {
            // Case if server could not be reached
            throw new Error(error);
          }
          throw new Error(`${errorJSON.title}: ${errorJSON.message}`);
        }
      }
      const playlist = await response.json();
      dispatch(addPlaylist(playlist));
      return playlist;
    } catch (error) {
      throw error;
    }
  };


  const PlaylistReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            const Playlists = {};
            action.list.forEach((playlist) => {
              Playlists[play.id] = song
            });
            return {
              ...Playlists,
              ...state,
              list: sortList(action.list),
            };
            case ADD:
                console.log('IN REDUCER ADD ONE CASE - ACTION -> ', action);
                if (!state[action.playlist.id]) {
                  const newState = {
                    ...state,
                    [action.playlist.id]: playlist,
                  };
                  const playlistList = newState.list.map((id) => newState[id]);
                  songList.push(action.playlist);
                  newState.list = sortList(playlistList);
                  return newState;
                }
                return {
                  ...state,
                  [action.playlist.id]: {
                    ...state[action.playlist.id],
                    ...action.playlist,
                  },
                };

        default:
            return state;
    }
}

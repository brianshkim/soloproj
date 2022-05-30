import { ValidationError } from "../utils/validationError"
import { csrfFetch } from './csrf';
const LOAD = "song/LOAD";
const ADD = "song/ADD";



const load = (list) => ({
    type: LOAD,
    list,
  });

  export const getSongs = () => async (dispatch) => {
    const response = await fetch(`/api/songs`);

    if (response.ok) {
      const list = await response.json();
      dispatch(load(list));
    }
  };

  export const getSearch = (payload) => async(dispatch) =>{
    const response = await csrfFetch('api/search',{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });



    if (response.ok) {
      const list = await response.json();
     return dispatch(load(list));
    }


  }


  const addSong= (song) => {

    return {
      type: ADD,
      song:song,
    };
  };

  export const createSong = (data) => async (dispatch) => {
    console.log("TOP OF THUNK IN STORE - data -> ", data);
    try {
      const response = await csrfFetch(`/api/songs`, {
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
      const song = await response.json();



    dispatch(addSong(song));
    return song;
  } catch (error) {
    throw error;
  }
};


  const sortList = (list) => {
    return list
      .sort((a, b) => {
        return a - b;
      })
      .map((song) => song.id);
  };


  const initialState = {list:[]}


const songReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            const Songs = {};
            action.list.forEach((song) => {
              Songs[song.id] = song
            });
            return {
              ...Songs,
              ...state,
              list: sortList(action.list),
            };
            case ADD:
                console.log('IN REDUCER ADD ONE CASE - ACTION -> ', action);
                if (!state[action.song.id]) {
                  const newState = {
                    ...state,
                    [action.song.id]: action.song,
                  };
                  const songList = newState.list.map((id) => newState[id]);
                  songList.push(action.song);
                  newState.list = sortList(songList);
                  return newState;
                }
                return {
                  ...state,
                  [action.song.id]: {
                    ...state[action.song.id],
                    ...action.song,
                  },
                };

        default:
            return state;
    }
}

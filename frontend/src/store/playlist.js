import { ValidationError } from "../utils/validationError"
import { csrfFetch } from './csrf';
const LOAD = "playlist/LOAD";
const ADD = "playlist/ADD";
const UPDATE = "playlist/UPDATE"
const DELETE = "playlist/DELETE"



const load = (list) => ({
  type: LOAD,
  list,
});


const addPlaylist = (playlist) => {

  return {
    type: ADD,
    playlist,
  };
};

const update = (playlist) => ({
  type: UPDATE,
  playlist
})

const remove = (playlistId) => ({
  type: DELETE,
  playlistId
})

export const getPlaylists = () => async (dispatch) => {
  const response = await csrfFetch(`/api/playlists`);

  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
    return list;
  }
};

export const deletePlaylist = (playlistId) => async dispatch => {
  console.log(playlistId)
  const response = await csrfFetch(`/api/playlists/${playlistId}`, {
    method: 'DELETE',
  })

  if (response.ok) {

    dispatch(remove(playlistId))
    return playlistId
  }

}

export const updatePlaylist = (id, data) => async (dispatch) => {
  const response = await csrfFetch(`/api/playlists/${id}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const playlist = await response.json()
    dispatch(update(playlist))
  }
}




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


const sortList = (list) => {
  return list
    .sort((a, b) => {
      return a - b;
    })

};

const initialState = { list: [] }


const PlaylistReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD:
      const Playlists = {};
      action.list.forEach((playlist) => {
        Playlists[playlist.id] = playlist
      });
      return {
        ...Playlists,
        ...state,

      }
    case ADD:
      return {
        ...state,
        [action.playlist.id]: {
          ...state[action.playlist.id],
          ...action.playlist,
        },
      };

      case UPDATE:
        return {
          ...state,
          [action.playlist.id]: action.playlist
        };

    case DELETE:
      const newState = { ...state };
      delete newState[action.playlistId]
      return newState;

    default:
      return state;
  }
}
export default PlaylistReducer

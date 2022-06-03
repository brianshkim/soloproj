import { ValidationError } from "../utils/validationError"
import { csrfFetch } from './csrf';
const LOAD = "song/LOAD";
const ADD = "song/ADD";
const DELETE = "song/DELETE"
const UPDATE = "song/UPDATE"




const load = (list) => ({
  type: LOAD,
  list,
});

const remove = (songId) => ({
  type: DELETE,
  songId
})

const update = (song) => ({
  type: UPDATE,
  song
})

export const deleteSong = (songId) => async dispatch => {
  console.log(songId)
  const response = await csrfFetch(`api/songs/${songId}`, {
    method: 'DELETE',
  })

  if (response.ok) {

    dispatch(remove(songId))
    return songId
  }

}

export const loadAlbums = () => async (dispatch) => {
  const response = await fetch('/api/albums');

  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
    return list;
  }


}

export const getSongs = () => async (dispatch) => {
  const response = await fetch(`/api/songs`);

  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
    return list;
  }
};


export const getSongsUser = () => async (dispatch) => {
  const response = await fetch(`/api/songs/home`);

  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
    return list;
  }
};


export const getSearch = (payload) => async (dispatch) => {
  const response = await csrfFetch('api/search', {
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




const addSong = (song) => {

  return {
    type: ADD,
    song: song,
  };
};


export const addtoplaylist = (id, data) => async (dispatch) => {
  console.log(id)
  const response = await csrfFetch(`/api/songs/${id}/addtoplaylist`, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const song = await response.json()
    dispatch(addSong(song))
  }
}

export const updateSong = (id, data) => async (dispatch) => {
  const response = await csrfFetch(`/api/songs/${id}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const song = await response.json()
    dispatch(update(song))
  }
}

export const createSong = (data) => async (dispatch) => {
  console.log("TOP OF THUNK IN STORE - data -> ", data);

  const { title, releaseDate, artist, image, imagePath, user_id, albumName, album_id } = data
  const formdata = new FormData();
  formdata.append("title", title)
  formdata.append("releaseDate", releaseDate)
  formdata.append("artist", artist)
  formdata.append("user_id", user_id)
  formdata.append("albumName", albumName)
  formdata.append("imagePath", imagePath)
  if (image) formdata.append('image', image)
  if (album_id) {
    formdata.append("albumId", album_id)
  }


  const response = await csrfFetch(`/api/songs`, {

    method: "post",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formdata
  })

  const song = await response.json();



  dispatch(addSong(song));
  console.log(song)
  return song;

};


const sortList = (list) => {
  return list
    .sort((a, b) => {
      return a - b;
    });
};


const initialState = { list: [] }


const songReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD:

      const Songs = {};
      action.list.forEach((song) => {
        Songs[song.id] = song
      });
      return {
        ...Songs,
        ...state,

      }
    case ADD:
      console.log('IN REDUCER ADD ONE CASE - ACTION -> ', action);
      return {
        ...state,
        [action.song.id]: {
          ...state[action.song.id],
          ...action.song,
        },
      };

    case UPDATE:
      return {
        ...state,
        [action.song.id]: action.song
      };

    case DELETE:
      const newState = { ...state };
      delete newState[action.songId]
      return newState;


    default:
      return state;
  }
}

export default songReducer

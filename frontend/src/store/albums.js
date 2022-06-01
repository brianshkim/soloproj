import { csrfFetch } from './csrf';

const LOAD = "albums/LOAD"
const ADD = "albums/ADD"
const DELETE="albums/DELETE"

const load = (list) => ({
    type: LOAD,
    list,
  });

export const getAlbums = () => async (dispatch) => {
    const response = await fetch('/api/albums/user');

    if (response.ok) {
      const list = await response.json();
      dispatch(load(list));
      return list;
    }


  }


const sortList = (list) => {
    return list
      .sort((a, b) => {
        return a - b;
      })
      .map((song) => song.id);
  };
const initialState = { list: [] }

const albumReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOAD:
        console.log(action.list)
        const Albums = {};
        action.list.forEach((album) => {
          Albums[album.id] = album
        });
        return {
          ...Albums,
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
      case DELETE:
        const newState = { ...state };
        delete newState[action.songId]
        return newState;


      default:
        return state;
    }
  }

  export default albumReducer

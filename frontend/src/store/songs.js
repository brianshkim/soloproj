import { ValidationError } from "../utils/validationError"
import { csrfFetch } from './csrf';
const LOAD = "song/LOAD";
const ADD = "song/ADD";
const DELETE= "song/DELETE"



export const uploadSong = (payload) =>async dispatch=>{
  const formdata = new FormData();
  formdata.append('image', payload)
  console.log(formdata)
  const response = await csrfFetch(`/api/songs/upload`, {

    method: "post",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formdata
  })

  console.log(await response.json());


}

const load = (list) => ({
    type: LOAD,
    list,
  });

const remove = (songId) =>({
  type: DELETE,
  songId
})

export const deleteSong = (songId)=>async dispatch =>{
  console.log(songId)
  const response = await csrfFetch(`api/songs/${songId}`,{
    method: 'DELETE',
  })

  if(response.ok){

    dispatch(remove(songId))
    return songId
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

  export const updateSong = (id, data) => async(dispatch)=>{
    const response=await csrfFetch(`/api/songs/${id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if(response.ok){
      const song=await response.json()
      dispatch(addSong(song))
    }
  }

  export const createSong = (data) => async (dispatch) => {
    console.log("TOP OF THUNK IN STORE - data -> ", data);

      const response = await csrfFetch(`/api/songs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });



      const song = await response.json();



    dispatch(addSong(song));
    return song;

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
          console.log(action.list)
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
              case DELETE:
                const newState = {...state};
                delete newState[action.songId]
                return newState;


        default:
            return state;
    }
}

export default songReducer

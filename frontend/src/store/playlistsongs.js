const LOAD = "playlist/LOAD";


const load = (list) => ({
    type: LOAD,
    list,
  });

  export const getPlaylistSongs = (playlistid) => async (dispatch) =>{
    const response = await fetch(`/api/playlist/${playlistid}/songs`)

    if(response.ok){
      const list = await response.json();
      dispatch(load(list))
      return list;
    }
  }
  const initialState = {list:[]}


  const playlistSongsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
          console.log(action.list)
            const playlistSongs = {};
        action.list.forEach((playlist) => {
              playlistSongs[playlist.id] = playlist
            });
            return {
              ...Playlists,
              ...state,
              list: action.list,
            };
            default:
                return state;
        }
    }

    export default playlistSongsReducer

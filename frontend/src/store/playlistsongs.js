

const LOAD = "playlistsongs/LOAD";
const REMOVE = "playlistsongs/REMOVE"


const load = (list) => ({
  type: LOAD,
  list,
});

const remove = ()=>({
  type: REMOVE
});

export const deleteAllPlaylistSongs = () => async(dispatch)=>{
  dispatch(remove())
}

export const getPlaylistSongs = (playlistid) => async (dispatch) => {
  console.log(playlistid)
  const response = await fetch(`/api/playlists/${playlistid}/songs`)


  if (response.ok) {
    const list = await response.json();
    console.log(list)
    dispatch(load(list))
    return list;
  }
}




const playlistSongsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD:
      const playlistSongs = {};
      action.list.forEach((playlist) => {
        playlistSongs[playlist.id] = playlist
      });
      return {
        ...playlistSongs,


      };

    case REMOVE:{
      return {}
    }
    default:
      return state;
  }
}

export default playlistSongsReducer

const LOAD = "playlistsongs/LOAD";


const load = (list) => ({
  type: LOAD,
  list,
});

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
    default:
      return state;
  }
}

export default playlistSongsReducer

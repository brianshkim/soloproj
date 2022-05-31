import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import CreateSongForm from "./components/SongFormModal/SongForm"
import PlaylistForm from "./components/AddPlaylistModal/PlaylistForm"
import Songs from "./components/Songs/Songs"
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Home from "./components/Home/Home"
import Playlist from "./components/Home/Playlist"

function App() {

  return (
    <>


      <Switch>
       <Route path={["/", "/songs", '/signup']} exact><Songs /></Route>
       <Route path="/home" exact><Home />
          <Route path="upload" exact></Route>


          </Route>
       <Route path="/playlists"><Playlist /></Route>


      </Switch>





    </>
  );
}

export default App;

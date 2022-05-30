import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import CreateSongForm from "./components/SongForm"
import Songs from "./components/Songs/Songs"
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Home from "./components/Home/Home"

function App() {

  return (
    <>


      <Switch>
       <Route path={["/", "/songs"]} exact><Songs /></Route>
       <Route path="/home"><Home /></Route>
       <Route path="/upload"><CreateSongForm /></Route>


      </Switch>





    </>
  );
}

export default App;

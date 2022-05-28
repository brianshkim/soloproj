import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import Songs from "./components/Songs/Songs"
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";

function App() {

  return (
    <>
      <Songs />



    </>
  );
}

export default App;

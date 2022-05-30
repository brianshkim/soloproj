import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createSong } from "../../store/songs"
import ErrorMessage from "../ErrorMessage";
import * as sessionActions from "../../store/session";
import { ValidationError } from "../../utils/validationError";
import Navigation from "../Navigation"
import SignupFormPage from "../SignupFormPage";
import { Navlink, Route, useParams, Switch } from 'react-router-dom'
import './Home.css'

const Home = () => {
  const dispatch = useDispatch()
  const history = useHistory()


  return (
      <header>
          <div className="header-container">
              <div className="left-nav-logo">
              </div>
              <div className="left-header">
                  <nav class="leftnav" role="navigation">
                      <span>
                          <a class="left-button" href="/home">Home</a>
                      </span>
                      <span>
                          <a class="left-button" href="/upload">Upload</a>
                      </span>
                      <span>
                          <a class="left-button" href="/playlists">Playlists</a>
                      </span>

                  </nav>


              </div>
              <div className="middle-header">
                  <div class="search-header" role="search">
                      <form class="searchHeader">

                      </form>

                  </div>
              </div>
          </div>





      </header>
  )
}

export default Home

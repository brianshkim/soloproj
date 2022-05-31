import React, { useState, useEffect } from 'react';
import "./MusicPlayer.css"
import musicplayerscript from "./musicplayerscript"
import $ from 'jquery'


const MusicPlayer = () => {


  useEffect(() => {
    const script = document.createElement('script');
    script.src = "/musicplayerscript.js";
    script.async = true;
    document.body.appendChild(script);
  return () => {
      document.body.removeChild(script);
    }
  }, []);




    return (
        <>
    <head>
   <meta charset="UTF-8" />
   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
   <link rel="stylesheet" href="style.css" />
   <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css"
   />
   <title>Music Player</title>
  </head>
  <body className="musicplayer">
   <h1>Music Player</h1>
   <div class="music-container" id="music-container">
    <div class="music-info">
     <h4 class="title" id="title"></h4>
     <div class="progress-container" id="progress-container">
      <div class="progress" id="progress"></div>
     </div>
    </div>
    <audio src="./music/happyrock.mp3" id="audio"></audio>
    <div class="img-container">
     <img src="./images/happyrock.jpg" alt="music-cover" id="cover" />
    </div>
    <div class="navigation1">
     <button id="prev" class="action-btn">
      <i class="fa fa-backward" aria-hidden="true"></i>
     </button>
     <button id="play" class="action-btn action-btn-big">
      <i class="fa fa-play" aria-hidden="true"></i>
     </button>
     <button id="next" class="action-btn">
      <i class="fa fa-forward" aria-hidden="true"></i>
     </button>
    </div>
   </div>
   <script src="script.js"></script>
  </body>
  </>
    )
}

export default MusicPlayer

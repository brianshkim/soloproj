import React, { useState } from 'react';
import "./MusicPlayer.css"


const MusicPlayer = () => {
    return (
        <>
    <div class="wrap">
        <h1>Material music player</h1>
        <p>Inspired by <a href="https://dribbble.com/shots/2365362-A-or-B-Bottom-music-player-dashboard" target="_blank">Leo Leung</a> </p>
        </div>

  <div class="wrap">

    <div class="player paused">

      <div class="progress-bar">
        <div class="runner"></div>
      </div>
      <div class="album-art">
        <div class="cover"></div>
      </div>

      <div class="description">
        <div class="title">Something from nothing  </div>
        <div class="sub-title">by Foo Fighters, Sonic highways</div>
      </div>

      <div class="visualizer">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div class="play-button">
        <div class="lp-background"></div>
        <i class="mdi mdi-play"></i>
        <i class="mdi mdi-pause"></i>
      </div>

      <div class="time-indicator">
        <i class="mdi mdi-clock"></i>
        <span class="time">03:39</span>
      </div>


    </div>

  </div>
  </>)
}

export default MusicPlayer

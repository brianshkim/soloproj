import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Slider from 'react-native-slider';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

const MusicPlayer = () => {
    const [isAlreadyPlay, setisAlreadyPlay] = useState(false);
    const [duration, setDuration] = useState('00:00:00');
    const [timeElapsed, setTimeElapsed] = useState('00:00:00');
    const [percent, setPercent] = useState(0);
    const [current_track, setCurrentTrack] = useState(0);
    const [inprogress, setInprogress] = useState(false);
    const [audioRecorderPlayer] = useState(new AudioRecorderPlayer());
}

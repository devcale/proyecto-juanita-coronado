import React from "react";
import styles from "./AudioPlayer.module.css";
import sampleAudio from '../assets/sample-song.mp3';

const AudioPlayer = () => {
  return (
    <div className={styles.container}>
      <audio controls className={styles.audio}>
        <source src={sampleAudio} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default AudioPlayer;

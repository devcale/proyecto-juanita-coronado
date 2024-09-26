import React, { useEffect } from "react";
import sampleImage from "../assets/placeholder-modified.png"; // Ensure you have an image in src/assets
import styles from "./MiddleImage.module.css";

const MiddleImage = () => {
  let speech;

  const getSpanishVoice = () => {
    const voices = window.speechSynthesis.getVoices();
    console.log(voices);
    return voices.find(
      (voice) => voice.lang === "es-US" || voice.lang.startsWith("es")
    );
  };

  const speakText = (text) => {
    const voice = getSpanishVoice();
    if (!voice) {
      alert("No hay voz en español disponible en su navegador");
      return;
    }

    // Break the text into smaller chunks to prevent it from being cut off
    const sentences = text.split(/(?<=[.!?])\s+/); // Split by sentences

    sentences.forEach((sentence) => {
      speech = new SpeechSynthesisUtterance(sentence);
      speech.voice = voice;
      speech.lang = voice.lang;
      window.speechSynthesis.speak(speech);
    });
  };

  const stopSpeech = () => {
    window.speechSynthesis.cancel(); // Stop the speech synthesis
  };

  const handleParagraphText = (e) => {
    const text = e.target.innerText;
    speakText(text);
  };

  const handleImageText = (e) => {
    const altText = e.target.alt;
    speakText(altText);
  };

  useEffect(() => {
    // Ensure voices are loaded (voices may not be available immediately on page load)
    window.speechSynthesis.onvoiceschanged = () => {
      getSpanishVoice();
    };
  }, []);

  return (
    <div className={styles.imageContainer}>
      <a
        href="https://ansv.gov.co/es/observatorio/estad%C3%ADsticas/historico-victimas"
        target="_blank"
        rel="noreferrer"
      >
        <img
          src={sampleImage}
          alt="Haga click para ingresar a la gráfica completa"
          className={styles.image}
          onMouseEnter={handleImageText}
          onMouseLeave={stopSpeech}
        />
      </a>
    </div>
  );
};

export default MiddleImage;

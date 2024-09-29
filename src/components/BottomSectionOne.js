import React, { useEffect } from "react";
import sampleImage from "../assets/foto.jpg";
import styles from "./BottomSectionOne.module.css";

const BottomSectionOne = () => {

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
    <div className={styles.container}>
      <p className={styles.line}>
        Interactúe con la imagen para acceder a más información
      </p>
      <div className={styles.sideBySideContainer}>
        <p className={styles.paragraph}
        onMouseEnter={handleParagraphText}
        onMouseLeave={stopSpeech}>
          Hace seis años perdí a una amiga que marcó mi infancia. Ella era una
          promesa del triatlón para el año 2019. Lamentablemente, en mayo de
          2018, perdió la vida en un accidente de tránsito mientras entrenaba en
          su bicicleta. Perdió el control, y a pesar de que el vehículo pesado
          que transitaba justo en ese momento a su lado se percató de su
          presencia, ni la distancia ni el tiempo fueron suficientes para frenar
          semejante bestia. Su cuerpo yacía en el pavimento; su muerte fue
          súbita, y ninguno de los transeúntes que pasaban por su lado podía
          mostrar un mínimo de respeto. El morbo y la curiosidad opacaban la
          importancia de una vida, de una niña, una joven de tan solo 14 años.
          Es desgarrador enfrentarse a la realidad de que este tipo de muertes
          ocurre a diario, ya sea por la falta de vías adecuadas, personas
          irresponsables al volante o la inseguridad que acecha a
          los transeúntes.
        </p>
        <img src={sampleImage} alt="Middle Content" className={styles.image} />
      </div>
    </div>
  );
};

export default BottomSectionOne;

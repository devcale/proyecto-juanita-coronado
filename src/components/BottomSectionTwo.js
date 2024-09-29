import React, { useEffect } from "react";
import sampleImage from "../assets/braillesample.jpg";
import styles from "./BottomSectionTwo.module.css";
import Histogram from "./Histogram";

const BottomSectionTwo = () => {
  let speech;
  const data = [591, 578, 552, 498, 569, 556, 635, 574, 516, 566, 534, 689];

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
      <div className={styles.sideBySideContainer}>
        <h3
          onMouseEnter={handleParagraphText}
          onMouseLeave={stopSpeech}
          onTouchStart={handleParagraphText}
          onTouchEnd={stopSpeech}
        >
          Instrucciones para una experiencia sensorial de representación de
          datos.
        </h3>
        <p
          className={styles.paragraph}
          onMouseEnter={handleParagraphText}
          onMouseLeave={stopSpeech}
          onTouchStart={handleParagraphText}
          onTouchEnd={stopSpeech}
        >
          Imaginemos que todos hemos perdido el sentido de la vista de manera
          repentina. Al enfrentarnos a esta situación, nuestros otros sentidos
          se agudizan. A continuación, te propongo participar en una experiencia
          sensorial que se enfocará en el tacto y el sonido para representar
          información. Sigue los pasos detallados a continuación: Preparación
          auditiva: En lugar de símbolos en relieve como en el sistema Braille,
          interactuarás con un histograma compuesto de pequeños bloques. Cada
          bloque que toques o pases con el cursor representará una víctima, y te
          proporcionará un nombre, ayudándote a "sentir" los datos a través del
          sonido. Estos sonidos se emplearán para captar tu atención y guiarte
          en el proceso de interpretación de los datos. Tacto como herramienta
          principal: Dado que en esta experiencia no contamos con la vista,
          usaremos el tacto para interpretar la información. Los datos serán
          representados mediante bloques virtuales, similares al lenguaje
          Braille. Los datos están organizados de acuerdo con el número de
          ciclistas fallecidos por mes en el año 2018. Cada barra en el
          histograma corresponde a un mes, y el número de bloques representa el
          total de víctimas en ese mes. Haz hover sobre cualquier bloque para
          escuchar un nombre. Cada bloque representa una persona fallecida. A
          medida que interactúes con los bloques, estarás accediendo a los
          nombres de las víctimas. Finalización de la experiencia: Al finalizar,
          reflexiona sobre cómo la ausencia de la vista te ha permitido percibir
          los datos de una manera diferente, a través del sonido y el tacto, lo
          que refuerza la importancia de adaptar la información para ser
          accesible a todos.
        </p>
        <Histogram data={data} />
      </div>
    </div>
  );
};

export default BottomSectionTwo;

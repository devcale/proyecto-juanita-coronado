import React, { useEffect } from "react";
import sampleImage from "../assets/braillesample.jpg";
import styles from "./BottomSectionTwo.module.css";

const BottomSectionTwo = () => {
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
      <div className={styles.sideBySideContainer}>
        <h3 onMouseEnter={handleParagraphText} onMouseLeave={stopSpeech}>
          Instrucciones para una experiencia sensorial de representación de
          datos.
        </h3>
        <p
          className={styles.paragraph}
          onMouseEnter={handleParagraphText}
          onMouseLeave={stopSpeech}
        >
          Imaginemos que todos hemos perdido el sentido de la vista de manera
          repentina. Al enfrentarnos a esta situación, nuestros otros sentidos
          se agudizan. A continuación, te propongo participar en una experiencia
          sensorial que se enfocará en el tacto y el sonido para representar
          información. Sigue los pasos detallados a continuación: Preparación
          auditiva: Vamos a utilizar sonidos perceptibles y de intensidad
          moderada, similares a los pitidos que se escuchan en una audiometría.
          Estos sonidos se emplearán para captar tu atención y guiarte en el
          proceso de interpretación de los datos. Tacto como herramienta
          principal: Dado que en esta experiencia no contamos con la vista,
          usaremos el tacto para interpretar la información. Los datos serán
          representados mediante símbolos en relieve, similares al lenguaje
          Braille. Estos símbolos serán organizados de acuerdo con los
          siguientes criterios: Círculos pequeños para representar las víctimas
          femeninas (ciclistas). Círculos grandes para representar las víctimas
          masculinas (ciclistas). Triángulos para identificar a los menores de
          edad fallecidos. Interpretación de los datos: Los datos representan el
          número de ciclistas fallecidos en accidentes de tránsito durante el
          año 2018, divididos en tres categorías principales: género y edad.
          Cada símbolo en relieve te permitirá "leer" la información tocando las
          formas y reconociendo a qué grupo corresponde cada una. Instrucciones
          de interpretación: Coloca las manos sobre los símbolos en relieve. Al
          reconocer un círculo pequeño, sabrás que estás leyendo una víctima
          femenina. Si identificas un círculo grande, estarás frente a una
          víctima masculina. Los triángulos te indicarán que la víctima era
          menor de edad, independientemente de su género. Finalización de la
          experiencia: Al finalizar, reflexiona sobre cómo la ausencia de la
          vista te ha permitido percibir los datos de una manera diferente, a
          través del sonido y el tacto, lo que refuerza la importancia de
          adaptar la información para ser accesible a todos.
        </p>
        <img src={sampleImage} alt="Middle Content" className={styles.image} />
      </div>
    </div>
  );
};

export default BottomSectionTwo;

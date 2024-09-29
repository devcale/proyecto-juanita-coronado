import React, { useEffect } from "react";
import styles from "./HeaderParagraph.module.css";

const HeaderParagraph = () => {
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
      <p
        className={styles.paragraph}
        onMouseEnter={handleParagraphText}
        onMouseLeave={stopSpeech}
        onTouchStart={handleParagraphText}
        onTouchEnd={stopSpeech}
      >
        La accesibilidad de la información es un reto importante, especialmente
        en una era donde los gráficos, los diagramas y las visualizaciones
        juegan un rol fundamental en la educación y el análisis. Para las
        personas con discapacidad visual, es esencial que se ofrezcan
        alternativas efectivas como el uso de tecnologías auditivas o el
        desarrollo de descripciones detalladas y táctiles que les permitan
        experimentar y comprender los datos de manera inclusiva. Esta reflexión
        nos lleva a considerar no solo la forma en que los datos se representan,
        sino también a quiénes están dirigidos y cómo pueden ser interpretados
        de manera equitativa.
      </p>
    </div>
  );
};

export default HeaderParagraph;

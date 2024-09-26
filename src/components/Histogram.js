import React from 'react';
import styles from './Histogram.module.css';

// List of random names
const randomNames = [
    'Juanita', 'Santiago', 'Sebastián', 'Mateo', 'Matías', 'Valentino', 'Nicolás', 'Alejandro', 'Samuel', 'Daniel', 
    'Emiliano', 'Jerónimo', 'Tomás', 'Lucas', 'Isaac', 'Gabriel', 'Martín', 'Emmanuel', 'David', 'Diego', 
    'Salomé', 'Valentina', 'Sofía', 'Isabella', 'Mariana', 'Luciana', 'Gabriela', 'Sara', 'Emilia', 'Victoria', 
    'Catalina', 'Juliana', 'Camila', 'Andrea', 'Paula', 'Laura', 'Manuela', 'Antonella'
  ];
// Function to generate random name
const getRandomName = () => randomNames[Math.floor(Math.random() * randomNames.length)];

// Square component that speaks a random name when hovered
const Square = () => {
  const handleHover = () => {
    const speech = new SpeechSynthesisUtterance(getRandomName());
    speech.lang = 'es-US'; // Change language if needed
    window.speechSynthesis.speak(speech);
  };

  const stopSpeech = () => {
    window.speechSynthesis.cancel(); // Stop the speech synthesis
  };

  return (
    <div
      onMouseEnter={handleHover}
      onMouseLeave={stopSpeech}
      className={styles.square}
    />
  );
};

// Bar component that represents a month
const Bar = ({ deaths }) => {
  return (
    <div className={styles.bar}>
      {Array.from({ length: deaths }).map((_, index) => (
        <Square key={index} />
      ))}
    </div>
  );
};

// Histogram component
const Histogram = ({ data }) => {
  return (
    <div className={styles.histogram}>
      {data.map((deaths, index) => (
        <Bar key={index} deaths={deaths} />
      ))}
    </div>
  );
};

// Example usage in a parent component
const App = () => {
  // Example data representing deaths per month
  const data = [5, 8, 3, 6, 10, 7, 12]; // Replace with actual data

  return (
    <div>
      <h1>Deaths Histogram</h1>
      <Histogram data={data} />
    </div>
  );
};

export default Histogram;

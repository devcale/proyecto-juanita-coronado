import logo from './logo.svg';
import './App.css';
import HeaderParagraph from './components/HeaderParagraph';
import MiddleImage from './components/MiddleImage';
import BottomSectionOne from './components/BottomSectionOne';
import BottomSectionTwo from './components/BottomSectionTwo';
import AudioPlayer from './components/AudioPlayer';

function App() {
  return (
    <div className="App">
      <HeaderParagraph />
      <MiddleImage />
      <BottomSectionOne />
      <BottomSectionTwo />
    </div>
  );
}

export default App;

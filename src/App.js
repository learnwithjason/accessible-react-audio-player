import { AudioPlayer } from './components/audio-player';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>hi chat!</h1>
      <AudioPlayer src="https://res.cloudinary.com/jlengstorf/video/upload/v1604601320/boop-song.mp3" />
    </div>
  );
}

export default App;

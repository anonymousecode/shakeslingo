import React, { useState,useRef,useEffect } from 'react';
import '../styles/styles.css';

function ShakesLingo() {
  const audioRef = useRef(null);
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleTranslate = async () => {
    if (inputText.trim() === '') {
      alert('Please enter a phrase to translate.');
      return;
    }

    try {
      const response = await fetch(
        `https://api.funtranslations.com/translate/shakespeare.json?text=${encodeURIComponent(inputText)}`,
        { method: 'GET' }
      );
      const data = await response.json();

      if (data.error) {
        setOutputText('Error: ' + data.error.message);
      } else {
        setOutputText(data.contents.translated);
      }
    } catch (error) {
      setOutputText('Something went wrong. Please try again.');
      console.error('Error:', error);
    }
  };

 useEffect(() => {
  const playMusic = () => {
    if (audioRef.current && audioRef.current.paused) {
      audioRef.current.play().catch((err) => {
        console.warn('Autoplay blocked:', err);
      });
    }
    document.removeEventListener('click', playMusic);
  };

  document.addEventListener('click', playMusic);

  return () => document.removeEventListener('click', playMusic);
}, []);


  return (
    <div className="ShakesLingo">
    <audio ref={audioRef} src="/music/bg-music.mp3" loop autoPlay />
      <h1 onClick={() => audioRef.current.pause()}>Shakes Lingo</h1>

      <textarea
        className="shakeslingo-textarea"
        placeholder="Enter your phrase"
        value={inputText}
        onChange={handleInputChange}
      />
      <button onClick={handleTranslate}>Translate</button>

      <div className="shakeslingo-container">
        {/* Add the GIF image */}
        <img
         src="/images/shakesphere.gif"
          alt="Shakespeare"
          className="shakespeare-image"
        />

        {/* Display the translated text in a speech bubble */}
        <div className="speech-bubble">
          {outputText || 'Your translation will appear here.'}
        </div>
      </div>
    </div>
  );
}

export default ShakesLingo;

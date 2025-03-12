import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './CSS/styles.css';
import logoLight from './Files/logo.png';
import logoDark from './Files/logo1.png';
import Webres from './Webres';
import Instruct from './Instruct';
import Blanks from './Blanks';
import Tickets from './Tickets';
import NotFound from './NotFound';
import Gif from './Files/vgif.gif';



function App() {
  const headline = "Державна Казначейська служба України";
  const headline2 = "Департамент цифрової трансформації та інформаційно-комунікаційних систем";
  const requiredPattern = useMemo(() => ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'], []);
  const [keySequence, setKeySequence] = useState([]);
  const [showGif, setShowGif] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);
  
  const activeSubTheme = 'christmas'; // 'default', 'christmas'


  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setDarkTheme(savedTheme === 'dark');
    
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark-theme');
    } else {
      document.documentElement.classList.remove('dark-theme');
      document.documentElement.classList.add(`${activeSubTheme}-theme`);
    }
  }, [activeSubTheme]);
  

  const toggleTheme = () => {
    const newTheme = !darkTheme ? 'dark' : 'light';
    setDarkTheme(!darkTheme);
    localStorage.setItem('theme', newTheme);
  
    if (!darkTheme) {
      document.documentElement.classList.add('dark-theme');
      document.documentElement.classList.remove(`${activeSubTheme}-theme`);
    } else {
      document.documentElement.classList.remove('dark-theme');
      document.documentElement.classList.add(`${activeSubTheme}-theme`);
    }
  };
  

  const handleKeyPress = useCallback((event) => {
    setKeySequence((prevSequence) => {
      const updatedSequence = [...prevSequence, event.key].slice(-requiredPattern.length);
      return updatedSequence;
    });
  }, [requiredPattern]);

  useEffect(() => {
    if (JSON.stringify(keySequence) === JSON.stringify(requiredPattern)) {
      setShowGif(true);
      setTimeout(() => {
        setShowGif(false);
        setKeySequence([]);
      }, 5000);
    }
  }, [keySequence, requiredPattern]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <Router>
    <div className="wrapper">
    <header className="header" id="top">
  <img 
    src={darkTheme ? logoDark : logoLight} 
    alt="Logo" 
    className="logo" 
  />
  <div className="header_headline">
    {headline}<br />
    {headline2}
  </div>
  <button className="btn theme-toggle-btn" onClick={toggleTheme}>
  {darkTheme ? '☀️' : '🌙'}
</button>
</header>

      <div className="buttons">
          <Link to="/Webres" className='btn'>Web-ресурси</Link>
          <Link to="/Instruct" className='btn'>Інструкції</Link>
          <Link to="/Blanks" className='btn'>Бланки</Link>
          <Link to="/Tickets" className='btn'>Заявки</Link>
        </div>
        <div className="content">
      <Routes>
            <Route path="/" element={<Webres />} />
            <Route path="/Webres" element={<Webres />} />
            <Route path="/Instruct" element={<Instruct />} />
            <Route path="/Blanks" element={<Blanks />} />
            <Route path="/Tickets" element={<Tickets />} />
            <Route path="*" element={<NotFound />} />
            </Routes>
            </div>
            {showGif && (
              <img 
                src={Gif} 
                alt="GIF" 
                style={{
                  position: 'fixed', 
                  top: 0, 
                  left: 0, 
                  width: '100vw', 
                  height: '100vh',
                  objectFit: 'cover',
                  zIndex: 1000 
                }} 
              />
            )}
          </div>
      </Router>
  );
}

export default App;



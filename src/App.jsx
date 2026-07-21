import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar/sidebar';
import CreateSmiski from './CreateSmiski/CreateSmiski';
import SmiskiGallery from './SmiskiGallery/SmiskiGallery';
import smiskiHome from './Smiskis/Smiski Home.webp';
import smiskiSidebar from './Smiskis/Smiski-Working.png';
import './App.css';

function Home() {
  return (
    <section className="home-page">
      <h1>GlowSeeker Home</h1>
      <p>Welcome! Here is where you create your own Smiski crew to roam freely throughout
      your home. Use the sidebar to navigate between pages.</p>
      <img src={smiskiHome} alt="Smiski Home" className="home-image" />
    </section>
  );
}

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateSmiski />} />
            <Route path="/gallery" element={<SmiskiGallery />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App

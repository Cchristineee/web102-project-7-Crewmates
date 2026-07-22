import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../Client';
import './CreateSmiski.css';

export default function CreateSmiski () {
    const navigate = useNavigate();

    const [formData, setFormData] = useState ({
    name: '',
    series: 'Work', // ✧˖° Default series ✧˖°
    location: '',
    glow_intensity: 'Radiant',
    quirk: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

    const { error } = await supabase 
        .from('Smiski')
        .insert([formData]);

    setIsSubmitting(false);

    if (error) {
        alert ('Error creating your Smiski: ' + error.message);
    } else {
        // ✧˖° This will navigating straight to the gallery to see the new creation ✧˖°
        navigate('/gallery');
    }
};
    return (
        <div className="create-container">
          <header className="create-header">
              <h1>Create a Smiski</h1>
              <p>Start designing your Smiski here.</p>
          </header>

          <form onSubmit={handleSubmit} className="create-form">
    
        <div className="form-top-row">
          <div className="smiski-avatar-box">
            {/*  ✧˖° Simple CSS/SVG representation of the Smiski face from wireframe (May replace with actual)  ✧˖° */}
            <div className="smiski-face">
              <span className="eye">•</span>
              <span className="eye">•</span>
            </div>
          </div>

          <div className="form-group flex-1">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="e.g. Corner Karl"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="form-grid">
          {/*  ✧˖° Location Field  ✧˖°*/}
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              id="location"
              type="text"
              placeholder="e.g. Behind the Router"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
            />
          </div>

          {/*  ✧˖° Series Selection (Radio Options)  ✧˖° */}
          <div className="form-group series-box">
            <label>Series:</label>
            <div className="radio-group">
              {['Work', 'Bed', 'Museum', 'Yoga'].map((option) => (
                <label key={option} className="radio-label">
                  <input
                    type="radio"
                    name="series"
                    value={option}
                    checked={formData.series === option}
                    onChange={(e) => setFormData({ ...formData, series: e.target.value })}
                  />
                  <span> {option}</span>
                </label>
              ))}
            </div>
          </div>

          {/*  ✧˖° Glow Intensity Field  ✧˖° */}
          <div className="form-group">
            <label htmlFor="glow">Glow Intensity</label>
            <select
              id="glow"
              value={formData.glow_intensity}
              onChange={(e) => setFormData({ ...formData, glow_intensity: e.target.value })}
            >
              <option value="Faint">Faint Dim</option>
              <option value="Radiant">Radiant Glow</option>
              <option value="Blinding">Blindingly Bright</option>
            </select>
          </div>

          {/*  ✧˖° Quirk Field  ✧˖°*/}
          <div className="form-group">
            <label htmlFor="quirk">Quirk</label>
            <input
              id="quirk"
              type="text"
              placeholder="e.g. Stares at night"
              value={formData.quirk}
              onChange={(e) => setFormData({ ...formData, quirk: e.target.value })}
            />
          </div>
        </div>

        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? 'Summoning...' : 'Create Smiski ♡'}
        </button>
      </form>
    </div>
    );
}
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../Client';
import './SmiskiGallery.css';

export default function SkiskiGallery () {
    const [smiskis, setSmiskis] = useState([]);
    const [loading, setLoading] = useState(true);

    // ✧˖° Fetching all of my Smiskis ordered by the creation date (newest first) ✧˖°
    useEffect(() => {
    const fetchSmiskis = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('Smiski') 
        .select('*')
        .order('name', { ascending: true });

    if (error) {
        console.error('Error fetching gallery:', error.message);
      } else {
        console.log('Fetched Smiskis:', data);
        setSmiskis(data || []);
      }
      setLoading(false);
    };

    fetchSmiskis();
  }, []);
    
  return (
    <div className="gallery-container">
      <header className="gallery-header">
        <h1>Smiski Gallery</h1>
        <p>Browse all of your glowing Smiskis in the gallery!</p>
      </header>

      {loading ? (
        <div className="loading-state">Searching corners for glowing friends...</div>
      ) : smiskis.length === 0 ? (
        <div className="empty-state">
          <p>No Smiskis found yet!</p>
          <Link to="/create" className="create-link-btn">
            Summon your first Smiski ♡
          </Link>
        </div>
      ) : (
        <div className="gallery-list-wrapper">
          <div className="gallery-list">
            {smiskis.map((smiski) => (
              <div key={smiski.id} className="smiski-card">
                {/* ✧˖° Left Side: Avatar & Details ✧˖° */}
                <div className="card-main-info">
                  <div className="smiski-card-avatar">
                    <div className="smiski-face">
                      <span className="eye">•</span>
                      <span className="eye">•</span>
                    </div>
                  </div>

                  <div className="smiski-card-details">
                    <h3 className="smiski-name">{smiski.name}</h3>
                    
                    <div className="smiski-meta-grid">
                      <p><span>Series:</span> {smiski.series || 'N/A'}</p>
                      <p><span>Location:</span> {smiski.location || 'Unknown'}</p>
                      <p><span>Glow Intensity:</span> {smiski.glow_intensity || 'Radiant'}</p>
                      <p><span>Quirk:</span> {smiski.quirk || 'None specified'}</p>
                    </div>
                  </div>
                </div>

                {/* ✧˖° Right Side: Edit / View Button ✧˖° */}
                <div className="card-actions">
                  <Link to={`/edit/${encodeURIComponent(smiski.name)}`} className="edit-btn">
                    Edit Smiski
                </Link>
                </div>
              </div>
            ))}
          </div>

          {/* ✧˖° Scroll Down Indicator ✧˖° */}
          {smiskis.length > 2 && (
            <div className="scroll-indicator">
              <span>Scroll down</span>
              <span className="down-arrow">↓</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../Client';
import './EditSmiski.css';

export default function EditSmiski() {
  const { name } = useParams(); 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    series: 'Work',
    location: '',
    glow_intensity: 'Radiant',
    quirk: ''
});

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✧˖° Fetching current Smiski deets on mount ✧˖°
  useEffect(() => {
    const fetchSmiski = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('Smiski')
        .select('*')
        .eq('name', decodeURIComponent(name))
        .single();

        if (error) {
            console.error('Error fetching Smiski:', error.message);
        alert('Could not find this Smiski in the dark!');
        navigate('/gallery');
      } else if (data) {
        setFormData(data);
      }
      setLoading(false);
    };

    fetchSmiski();
  }, [name, navigate]);

  // ✧˖° To handle the update ✧˖°
  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await supabase
      .from('Smiski')
      .update(formData)
      .eq('name', decodeURIComponent(name));

    setIsSubmitting(false);

    if (error) {
      alert('Error updating Smiski: ' + error.message);
    } else {
      navigate('/gallery');
    }
  };

  // ✧˖° Handles the delete (CRUD) ✧˖°
    const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Are you sure ${formData.name || 'this Smiski'} vanished back into the shadows?`
    );
    if (!confirmDelete) return;

    const { error } = await supabase
      .from('Smiski')
      .delete()
      .eq('name', decodeURIComponent(name));

    if (error) {
      alert('Error deleting Smiski: ' + error.message);
    } else {
      navigate('/gallery');
    }
  };

  if (loading) {
    return <div className="edit-container"><p className="loading-txt">Locating Smiski attributes...</p></div>;
  }

  return (
    <div className="edit-container">
      <header className="edit-header">
        <h1>Edit Smiski</h1>
        <p>Relocate or modify your Smiski's documented attributes.</p>
      </header>

      <form onSubmit={handleUpdate} className="edit-form">
       
        <div className="form-top-row">
          <div className="smiski-avatar-box">
            <div className="smiski-face">
              <span className="eye">•</span>
              <span className="eye">•</span>
            </div>
          </div>

          <div className="form-group flex-1">
            <label htmlFor="name">Name (Primary Key)</label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="form-grid">
          {/* * ✧˖° Location Field * ✧˖° */}
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              id="location"
              type="text"
              value={formData.location || ''}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>

          {/* * ✧˖° Series Selection (Radio Group) * ✧˖° */}
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
                  <span>o {option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* * ✧˖° Glow Intensity Field * ✧˖°*/}
          <div className="form-group">
            <label htmlFor="glow">Glow Intensity</label>
            <select
              id="glow"
              value={formData.glow_intensity || 'Radiant'}
              onChange={(e) => setFormData({ ...formData, glow_intensity: e.target.value })}
            >
              <option value="Faint">Faint Dim</option>
              <option value="Radiant">Radiant Glow</option>
              <option value="Blinding">Blindingly Bright</option>
            </select>
          </div>

          {/* * ✧˖° Quirk Field * ✧˖° */}
          <div className="form-group">
            <label htmlFor="quirk">Quirk</label>
            <input
              id="quirk"
              type="text"
              value={formData.quirk || ''}
              onChange={(e) => setFormData({ ...formData, quirk: e.target.value })}
            />
          </div>
        </div>

        {/* * ✧˖° Form Action Buttons * ✧˖° */}
        <div className="form-actions">
          <button type="submit" className="save-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Update Smiski ♡'}
          </button>

          <button type="button" onClick={handleDelete} className="delete-btn">
            Delete Smiski
          </button>
        </div>
      </form>
    </div>
  );
}

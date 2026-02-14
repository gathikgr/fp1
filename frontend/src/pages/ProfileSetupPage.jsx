import { useState } from 'react';
import api from '../api/api';
import { useAuth } from '../context/AuthContext';

const ProfileSetupPage = () => {
  const { user, setUser } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    department: user?.department || '',
    position: user?.position || '',
    profilePic: null
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    const payload = new FormData();
    payload.append('name', formData.name);
    payload.append('department', formData.department);
    payload.append('position', formData.position);
    if (formData.profilePic) {
      payload.append('profilePic', formData.profilePic);
    }

    try {
      const { data } = await api.put('/users/profile', payload, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
      setMessage('Profile saved successfully');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save profile');
    }
  };

  return (
    <div className="card">
      <h2>Profile Setup</h2>
      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>Full Name</label>
        <input name="name" value={formData.name} onChange={handleChange} required />

        <label>Department</label>
        <input name="department" value={formData.department} onChange={handleChange} required />

        <label>Job Position</label>
        <input name="position" value={formData.position} onChange={handleChange} required />

        <label>Profile Picture</label>
        <input type="file" name="profilePic" accept="image/*" onChange={handleChange} />

        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
};

export default ProfileSetupPage;

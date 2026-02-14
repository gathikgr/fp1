import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';

const initialForm = {
  userId: '',
  month: '',
  year: new Date().getFullYear(),
  baseSalary: '',
  allowances: 0,
  deductions: 0
};

const AdminDashboard = () => {
  const [lecturers, setLecturers] = useState([]);
  const [selectedLecturer, setSelectedLecturer] = useState(null);
  const [history, setHistory] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const fetchLecturers = async () => {
    const { data } = await api.get('/users/lecturers');
    setLecturers(data);
  };

  const fetchLecturerDetails = async (id) => {
    const [profileRes, payslipRes] = await Promise.all([
      api.get(`/users/lecturers/${id}`),
      api.get(`/payslips/lecturer/${id}`)
    ]);
    setSelectedLecturer(profileRes.data);
    setHistory(payslipRes.data || []);
  };

  useEffect(() => {
    fetchLecturers().catch((err) => setError(err.response?.data?.message || 'Failed to load lecturers'));
  }, []);

  const handleSelectLecturer = async (id) => {
    setFormData((prev) => ({ ...prev, userId: id }));
    await fetchLecturerDetails(id);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleGeneratePayslip = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      await api.post('/payslips', formData);
      setMessage('Payslip generated successfully');
      if (formData.userId) {
        await fetchLecturerDetails(formData.userId);
      }
      setFormData((prev) => ({ ...initialForm, userId: prev.userId }));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate payslip');
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}

      <section className="card">
        <h3>All Lecturers</h3>
        <ul>
          {lecturers.map((lecturer) => (
            <li key={lecturer._id} className="list-item">
              <span>{lecturer.name || lecturer.email}</span>
              <button onClick={() => handleSelectLecturer(lecturer._id)}>View Profile</button>
            </li>
          ))}
        </ul>
      </section>

      {selectedLecturer && (
        <section className="card">
          <h3>Lecturer Profile</h3>
          <p>Name: {selectedLecturer.name || '-'}</p>
          <p>Email: {selectedLecturer.email}</p>
          <p>Department: {selectedLecturer.department || '-'}</p>
          <p>Position: {selectedLecturer.position || '-'}</p>

          <h4>Generate Payslip</h4>
          <form onSubmit={handleGeneratePayslip}>
            <input type="hidden" name="userId" value={formData.userId} />

            <label>Month</label>
            <input name="month" value={formData.month} onChange={handleChange} required />

            <label>Year</label>
            <input type="number" name="year" value={formData.year} onChange={handleChange} required />

            <label>Base Salary</label>
            <input type="number" name="baseSalary" value={formData.baseSalary} onChange={handleChange} required />

            <label>Allowances</label>
            <input type="number" name="allowances" value={formData.allowances} onChange={handleChange} required />

            <label>Deductions</label>
            <input type="number" name="deductions" value={formData.deductions} onChange={handleChange} required />

            <button type="submit">Generate Payslip</button>
          </form>

          <h4>Payslip History</h4>
          {history.length === 0 ? (
            <p>No payslips generated yet.</p>
          ) : (
            <ul>
              {history.map((p) => (
                <li key={p._id} className="list-item">
                  <span>
                    {p.month} {p.year} - ₹{p.netSalary}
                  </span>
                  <Link to={`/payslip/${p._id}`}>View</Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </div>
  );
};

export default AdminDashboard;

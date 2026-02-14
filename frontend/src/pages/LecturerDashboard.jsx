import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';

const LecturerDashboard = () => {
  const [latestPayslip, setLatestPayslip] = useState(null);
  const [payslips, setPayslips] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const [latestRes, listRes] = await Promise.all([
          api.get('/payslips/me/latest'),
          api.get('/payslips/me')
        ]);
        setLatestPayslip(latestRes.data);
        setPayslips(listRes.data || []);
      } catch (err) {
        setError(err.response?.data?.message || 'Unable to load payslips');
      }
    };

    loadData();
  }, []);

  return (
    <div>
      <h2>Lecturer Dashboard</h2>
      {error && <p className="error">{error}</p>}

      <section className="card">
        <h3>Latest Payslip</h3>
        {latestPayslip ? (
          <div>
            <p>
              {latestPayslip.month} {latestPayslip.year}
            </p>
            <p>Net Salary: ₹{latestPayslip.netSalary}</p>
            <Link to={`/payslip/${latestPayslip._id}`}>View Details</Link>
          </div>
        ) : (
          <p>No payslip available yet.</p>
        )}
      </section>

      <section className="card">
        <h3>Previous Payslips</h3>
        {payslips.length === 0 ? (
          <p>No previous payslips found.</p>
        ) : (
          <ul>
            {payslips.map((p) => (
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
    </div>
  );
};

export default LecturerDashboard;

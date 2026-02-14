import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';

const PayslipViewPage = () => {
  const { id } = useParams();
  const [payslip, setPayslip] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPayslip = async () => {
      try {
        const { data } = await api.get(`/payslips/${id}`);
        setPayslip(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load payslip');
      }
    };

    fetchPayslip();
  }, [id]);

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!payslip) {
    return <p>Loading payslip...</p>;
  }

  return (
    <div className="card">
      <h2>Payslip Details</h2>
      <p>Lecturer: {payslip.userId?.name || '-'}</p>
      <p>Department: {payslip.userId?.department || '-'}</p>
      <p>Position: {payslip.userId?.position || '-'}</p>
      <p>
        Month/Year: {payslip.month} {payslip.year}
      </p>
      <p>Base Salary: ₹{payslip.baseSalary}</p>
      <p>Allowances: ₹{payslip.allowances}</p>
      <p>Deductions: ₹{payslip.deductions}</p>
      <p>
        <strong>Net Salary: ₹{payslip.netSalary}</strong>
      </p>
    </div>
  );
};

export default PayslipViewPage;

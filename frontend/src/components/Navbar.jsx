import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <h1>Payslip Portal</h1>
      <nav>
        {user?.role === 'lecturer' && <Link to="/lecturer">Dashboard</Link>}
        {user?.role === 'admin' && <Link to="/admin">Dashboard</Link>}
        {user && <Link to="/profile">Profile Setup</Link>}
        {user && <button onClick={handleLogout}>Logout</button>}
      </nav>
    </header>
  );
};

export default Navbar;

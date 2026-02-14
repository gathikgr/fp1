import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import LecturerDashboard from './pages/LecturerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ProfileSetupPage from './pages/ProfileSetupPage';
import PayslipViewPage from './pages/PayslipViewPage';

const App = () => {
  const { user } = useAuth();

  return (
    <div>
      {user && <Navbar />}
      <main className="container">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          <Route
            path="/lecturer"
            element={
              <ProtectedRoute role="lecturer">
                <LecturerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfileSetupPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payslip/:id"
            element={
              <ProtectedRoute>
                <PayslipViewPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="*"
            element={<Navigate to={user ? (user.role === 'admin' ? '/admin' : '/lecturer') : '/login'} replace />}
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;

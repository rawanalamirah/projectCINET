import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import LoansList from './pages/LoanList';
import AddLoan from './pages/AddLoan';
import ProtectedRoute from './components/ProtectedRoute';
import Shell from './components/Shell';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><Shell><LoansList /></Shell></ProtectedRoute>} />
        <Route path="/add" element={<ProtectedRoute><Shell><AddLoan /></Shell></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
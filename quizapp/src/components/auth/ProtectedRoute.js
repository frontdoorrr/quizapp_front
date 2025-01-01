import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authService } from '../../api';

function ProtectedRoute({ children }) {
  const location = useLocation();
  
  if (!authService.isAuthenticated()) {
    // 현재 접근하려던 페이지 정보를 state로 전달
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;

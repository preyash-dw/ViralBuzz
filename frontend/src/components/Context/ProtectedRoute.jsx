import { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AdminContext } from './AdminProvider';

function ProtectedRoute({ element, ...props }) {
    const { isAdmin } = useContext(AdminContext);
  
    return isAdmin ? <Route {...props} element={element} /> : <Navigate to="/login" />;
  }
  
  export default ProtectedRoute;
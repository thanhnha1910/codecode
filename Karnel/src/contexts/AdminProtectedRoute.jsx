import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserProvider';
import { toast } from 'react-toastify';

const AdminProtectedRoute = ({ children }) => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      toast.error('Please login to access admin panel');
      navigate('/login', { 
        replace: true,
        state: { from: window.location.pathname }
      });
    } else if (user.role !== 'ADMIN') {
      toast.error('You do not have permission to access admin panel');
      navigate('/', { replace: true });
    }
    setIsLoading(false);
  }, [user, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Allow rendering only if user exists and is an admin
  return user && user.role === 'ADMIN' ? children : null;
};

export default AdminProtectedRoute;
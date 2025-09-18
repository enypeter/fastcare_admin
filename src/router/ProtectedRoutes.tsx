import {useEffect} from 'react';
import {Outlet, useNavigate} from 'react-router-dom';
import {ROUTES} from '@/router/routes';

const ProtectedRoutes = () => {
  const savedToken: string | null = localStorage.getItem('token');
  const token: string | null = savedToken ? savedToken : null;

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate(ROUTES.signin);
    }
  }, [token, navigate]);

  return <Outlet />;
};

export default ProtectedRoutes;

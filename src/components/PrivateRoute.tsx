import { Navigate, Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import authState from 'hooks/Auth';

const PrivateRoute = () => {
  const auth = useRecoilValue(authState);

  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;

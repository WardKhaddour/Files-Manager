import LoadingSpinner from 'components/LoadingSpinner';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStatQuery } from 'services/accessApi/accessSlice';

const RestrictUnauthenticated = ({ children, whiteList = [] }) => {
  const { error, isLoading } = useAuthStatQuery();
  const location = useLocation();

  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  if (!error && !whiteList.some(path => location.pathname.includes(path))) {
    return <Navigate to="/courses" />;
  }

  return children;
};

export default RestrictUnauthenticated;

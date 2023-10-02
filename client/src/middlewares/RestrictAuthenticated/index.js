import LoadingSpinner from 'components/LoadingSpinner';
import { Navigate } from 'react-router-dom';
import { useAuthStatQuery } from 'services/accessApi/accessSlice';

const RestrictAuthenticated = ({ children }) => {
  const { error, isLoading } = useAuthStatQuery();

  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }
  if (error) {
    return <Navigate to="/auth" />;
  }

  return children;
};

export default RestrictAuthenticated;

import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useConfirmEmailMutation } from 'modules/Auth/services/authApi';
import LoadingSpinner from 'components/LoadingSpinner';

const ConfirmEmail = () => {
  const navigate = useNavigate();
  const { confirmToken } = useParams();
  const [confirmEmail, { isLoading }] = useConfirmEmailMutation();

  useEffect(() => {
    confirmEmail(confirmToken)
      .then(() => {
        navigate({
          pathname: '/courses',
        });
      })
      .catch(() => {
        navigate({
          pathname: '/auth',
        });
      });
  }, [confirmEmail, confirmToken, navigate]);

  return <>{isLoading && <LoadingSpinner fullScreen />}</>;
};

export default ConfirmEmail;

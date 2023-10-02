import { useRef, useState } from 'react';
import SignupFirstPage from './components/FirstPage';
import { useSearchParams } from 'react-router-dom';
import SignupSecondPage from './components/SecondPage';
import { useSignupMutation } from '../../services/authApi';
import LoadingSpinner from 'components/LoadingSpinner';

const Signup = () => {
  const [signup, { isLoading }] = useSignupMutation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [userData, setUserData] = useState({});
  const firstPageRef = useRef();
  const secondPageRef = useRef();
  const page = +searchParams.get('page') || 1;

  const goToSecondPage = () => {
    setUserData(prevData => ({
      ...prevData,
      ...firstPageRef.current.getData(),
    }));
    setSearchParams(prev => {
      prev.set('page', 2);
      return prev;
    });
  };

  const handleSignup = async () => {
    const submittedUserData = {
      ...userData,
      ...secondPageRef.current.getData(),
    };
    await signup(submittedUserData);
  };

  return (
    <>
      {isLoading && <LoadingSpinner fullScreen />}
      {page === 1 && (
        <SignupFirstPage
          initialData={userData}
          ref={firstPageRef}
          onSubmit={goToSecondPage}
        />
      )}
      {page === 2 && (
        <SignupSecondPage
          initialData={userData}
          ref={secondPageRef}
          onSubmit={handleSignup}
        />
      )}
    </>
  );
};

export default Signup;

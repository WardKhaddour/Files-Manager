import router from './router';
import { RouterProvider } from 'react-router-dom';
import { useLazyAuthStatQuery } from 'services/accessApi/accessSlice';
import LoadingSpinner from 'components/LoadingSpinner';
import Notification from 'components/Notifications';
import './App.css';
import { Suspense, useEffect, useState } from 'react';

function App() {
  const [getAuthStat] = useLazyAuthStatQuery();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getAuthStat().then(() => setIsLoading(false));
  }, [getAuthStat]);

  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="App">
      <Notification />
      <Suspense fallback={<LoadingSpinner fullScreen />}>
        <RouterProvider router={router} />
      </Suspense>
    </div>
  );
}

export default App;

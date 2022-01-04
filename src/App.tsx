import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from './firebase';
import authState from 'hooks/Auth';
import 'App.css';
import Login from 'pages/Login';
import Home from 'pages/Home';
import PrivateRoute from 'components/PrivateRoute';

function App() {
  const setAuth = useSetRecoilState(authState);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const auth = getAuth(app);

    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setAuth(authUser);
      }
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      {isLoading ? (
        <p>...Loading...</p>
      ) : (
        <Routes>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;

import { FC } from 'react';
import { Link } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { app } from '../firebase';

const Home: FC = () => {
  const auth = getAuth(app);

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <div>
      <h1>Hello World</h1>
      <p>{auth.currentUser?.displayName}</p>
      <Link to="/login" onClick={handleLogout}>
        Logout
      </Link>
    </div>
  );
};

export default Home;

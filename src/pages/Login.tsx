import { FC, FormEvent, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../firebase';
import authState from 'hooks/Auth';

const Login: FC = () => {
  const setAuth = useSetRecoilState(authState);
  const navigate = useNavigate();
  const inputEmailRef = useRef<HTMLInputElement>(null);
  const inputPasswordRef = useRef<HTMLInputElement>(null);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    if (
      inputEmailRef.current?.value !== undefined &&
      inputPasswordRef.current?.value !== undefined
    ) {
      try {
        const auth = getAuth(app);
        const userCreadentials = await signInWithEmailAndPassword(
          auth,
          inputEmailRef.current?.value,
          inputPasswordRef.current?.value
        );

        console.log(userCreadentials);

        if (userCreadentials.user) {
          setAuth(userCreadentials.user);
          navigate('/');
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <label htmlFor="email">
        Email
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          ref={inputEmailRef}
        />
      </label>
      <label htmlFor="password">
        Password
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          autoComplete="off"
          ref={inputPasswordRef}
        />
      </label>

      <button type="submit">Login</button>
    </form>
  );
};

export default Login;

import { atom } from 'recoil';
import { User } from 'firebase/auth';

type AuthState = User | null;

const authState = atom<AuthState>({
  key: 'authState',
  default: null,
  // Avoid TypeError: Cannot freeze
  dangerouslyAllowMutability: true,
});

export default authState;

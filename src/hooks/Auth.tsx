import { atom } from 'recoil';
import { FirebaseApp } from 'firebase/app';

type AuthState = FirebaseApp | null;

const authState = atom<AuthState>({
  key: 'authState',
  default: null,
  dangerouslyAllowMutability: true,
});

export default authState;


import { createContext } from 'react';
import { User } from '../types';

interface UserContextType {
  user: User | null;
  logout: () => void;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  logout: () => {},
});

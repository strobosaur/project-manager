import { useState } from 'react';
import { projectAuth } from '../firebase/fbConfig';
import { useAuthContext } from './useAuthContext';

const useLogout = () => {
  // DEFAULT STATES
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(null);
  const { dispatch } = useAuthContext();

  const logout = async () => {
    // SET NEW STATES
    setError(null);
    setIsPending(true);

    // TRY TO SIGN OUT USER
    try {
      await projectAuth.signOut();

      // DISPATCH LOG OUT ACTION
      dispatch({ type: 'LOGOUT' });

      // UPDATE STATES
      setIsPending(false);
      setError(null);
    }
    catch (err) {
      console.log(err.message);
      // UPDATE STATES
      setError(err.message);
      setIsPending(false);
    }
  }

  return { logout, error, isPending }
}
import { useState, useEffect } from 'react';
import { projectAuth } from '../firebase/fbConfig';
import { useAuthContext } from './useAuthContext';

export const useLogout = () => {
  // DEFAULT STATES
  const [isCancelled, setIsCancelled] = useState(false);
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

      // DISPATCH LOGOUT ACTION
      dispatch({ type: 'LOGOUT' });

      // UPDATE STATES
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    }
    // CATCH ERRORS
    catch (err) {
      // UPDATE STATES
      if (!isCancelled) {
        console.log(err.message);
        setError(err.message);
        setIsPending(false);
      }
    }
  }

  // CLEANUP FUNCTION
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { logout, error, isPending };
}
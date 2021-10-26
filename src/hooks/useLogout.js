import { useState, useEffect } from 'react';
import { projectAuth } from '../firebase/fbConfig';
import { useAuthContext } from './useAuthContext';

const useLogout = () => {
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

      // DISPATCH LOG OUT ACTION
      dispatch({ type: 'LOGOUT' });

      // UPDATE STATES
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    }
    catch (err) {
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

  return { logout, error, isPending }
}
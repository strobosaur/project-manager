import { useState, useEffect } from 'react';
import { projectAuth } from '../firebase/fbConfig';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
  // DEFAULT STATES
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    // SET NEW STATES
    setError(null);
    setIsPending(true);

    // TRY TO LOGIN USER
    try {
      const response = await projectAuth.signInWithEmailAndPassword(email, password);

      // DISPATCH LOGIN ACTION
      dispatch({ type: 'LOGIN', payload: response.user });

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

  return { login, error, isPending };
}
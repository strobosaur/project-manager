import { useState, useEffect } from 'react';
import { projectAuth } from '../firebase/fbConfig';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
  // DEFAULT STATES
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName) => {
    // SET NEW STATES
    setError(null);
    setIsPending(true);

    try {
      // TRY TO SIGN UP USER
      const response = await projectAuth.createUserWithEmailAndPassword(email, password);

      // CHECK FOR NO RESPONSE
      if (!response) {
        throw new Error('Could not signup user');
      }

      // CREATE NEW USER PROFILE
      await response.user.updateProfile({ displayName });

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

  return { error, isPending, signup }
}
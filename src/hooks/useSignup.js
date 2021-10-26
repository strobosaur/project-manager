import { useState } from 'react';
import { projectAuth } from '../firebase/fbConfig';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(null);

  const signup = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);

    try {
      // TRY TO SIGN UP USER
      const response = await projectAuth.createUserWithEmailAndPassword(email, password);
      console.log(response.user);

      // CHECK FOR NO RESPONSE
      if (!response) {
        throw new Error('Could not signup user');
      }

      // CREATE NEW USER PROFILE
      await response.user.updateProfile({ displayName });

      setIsPending(false);
      setError(null);
    }
    // CATCH ERRORS
    catch (err) {
      console.log(err.message);
      setError(err.message);
      setIsPending(false);
    }
  }

  return { error, isPending, signup }
}
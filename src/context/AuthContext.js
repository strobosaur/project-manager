import { createContext, useEffect, useReducer } from 'react';
import { projectAuth } from '../firebase/fbConfig';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  // SWITCH ON ACTION TYPE
  switch (action.type) {
    // LOGIN
    case 'LOGIN':
      return { ...state, user: action.payload };
    // LOGOUT
    case 'LOGOUT':
      return { ...state, user: null };
    // AUTH IS READY
    case 'AUTH_IS_READY':
      return { ...state, user: action.payload, authIsReady: true };
    // DEFAULT
    default:
      return state;
  }
}

// EXPORT AUTH CONTEXT PROVIDER
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false
  });
  console.log('AuthContext state: ', state);

  // TRACK AUTH STATE CHANGE
  useEffect(() => {
    const unSubscribe = projectAuth.onAuthStateChanged((user) => {
      dispatch({ type: 'AUTH_IS_READY', payload: user });
      unSubscribe();
    });
  }, []);

  // RETURN AUTH CONTEXT TEMPLATE
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  );
}
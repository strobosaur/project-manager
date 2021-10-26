import { useReducer, useEffect, useState } from 'react';
import { projectFirestore } from '../firebase/fbConfig';

// CREATE INITIAL STATES
let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null
}

// FIRESTORE REDUCER
const firestoreReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
}

export const useFirestore = (collection) => {
  // DEFAULT STATES
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  // COLLECTION REFERENCE
  const collectionRef = projectFirestore.collection(collection);

  // ADD NEW DOCUMENT TO DATABASE
  const addDocument = (doc) => {

  }

  // DELETE DOCUMENT
  const deleteDocument = (id) => {

  }

  // CLEANUP FUNCTION
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, deleteDocument, response };
}
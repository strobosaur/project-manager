import { useReducer, useEffect, useState } from 'react';
import { projectFirestore, timestamp } from '../firebase/fbConfig';

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
    // IS PENDING
    case 'IS_PENDING':
      return { isPending: true, document: null, success: false, error: null };
    // DOCUMENT ADDED
    case 'DOCUMENT_ADDED':
      return { isPending: false, document: action.payload, success: true, error: null };
    // DOCUMENT DELETED
    case 'DOCUMENT_DELETED':
      return { isPending: false, document: action.payload, success: true, error: null };
    // DOCUMENT UPDATED
    case 'UPDATED_DOCUMENT':
      return { isPending: false, document: action.payload, success: true, error: null };
    // ERROR
    case 'ERROR':
      return { isPending: false, document: null, success: false, error: action.payload };
    // DEFAULT
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

  // FUNCTION CHECK IS CANCELLED BEFORE DISPATCH 
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  }

  // ADD NEW DOCUMENT TO DATABASE
  const addDocument = async (doc) => {
    dispatch({ type: 'IS_PENDING' });

    // TRY TO ADD NEW DOCUMENT
    try {
      const createdAt = timestamp.fromDate(new Date());
      const documentAdded = await collectionRef.add({ ...doc, createdAt });
      dispatchIfNotCancelled({ type: 'DOCUMENT_ADDED', payload: documentAdded });
    }
    // CATCH ERRORS
    catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
    }
  }

  // DELETE DOCUMENT
  const deleteDocument = async (id) => {
    dispatch({ type: 'IS_PENDING' });

    // TRY TO DELETE DOCUMENT
    try {
      const documentDeleted = await collectionRef.doc(id).delete();
      dispatchIfNotCancelled({ type: 'DOCUMENT_DELETED', payload: documentDeleted });
    }
    // CATCH ERRORS
    catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: 'Could not delete document' });
    }
  }

  // UPDATE DOCUMENT
  const updateDocument = async (id, updates) => {
    dispatch({ type: 'IS_PENDING' });

    try {
      const updatedDocument = await collectionRef.doc(id).update(updates);
      dispatchIfNotCancelled({ type: 'UPDATED_DOCUMENT', payload: updatedDocument });
      return updatedDocument;
    }
    catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: err.message });
      return null;
    }
  }

  // CLEANUP FUNCTION
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, deleteDocument, updateDocument, response };
}
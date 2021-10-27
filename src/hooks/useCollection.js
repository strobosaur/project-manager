import { useEffect, useState, useRef } from 'react';
import { projectFirestore } from '../firebase/fbConfig';

export const useCollection = (collection, _query, _orderBy) => {
  // DEFAULT STATES
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  // PREVENT INFINITE LOOP
  const query = useRef(_query).current;
  const orderBy = useRef(_orderBy).current;

  // TRACK COLLECTION CHANGES
  useEffect(() => {
    let collectionRef = projectFirestore.collection(collection);

    // HANDLE QUERY
    if (query) {
      collectionRef = collectionRef.where(...query);
    }

    // ORDER COLLECTION
    if (orderBy) {
      collectionRef = collectionRef.orderBy(...orderBy);
    }

    const unSubscribe = collectionRef.onSnapshot(snapshot => {
      let results = [];
      snapshot.docs.forEach(doc => {
        results.push({ ...doc.data(), id: doc.id })
      });

      // UPDATE STATES
      setDocuments(results);
      setError(null);
    }, error => {
      // HANDLE ERROR
      console.log(error);
      setError('could not fetch data');
    })

    // UNSUBSCRIBE ON UNMOUNT
    return () => unSubscribe();
  }, [collection, query, orderBy]);

  // RETURN OBJECT
  return { documents, error };
}
import { useEffect, useState, useRef } from 'react';
import { projectFirestore } from '../firebase/fbConfig';

export const useCollection = (collection, _query) => {
  // DEFAULT STATES
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  // PREVENT INFINITE LOOP
  const query = useRef(_query).current;

  // TRACK COLLECTION CHANGES
  useEffect(() => {
    let collectionRef = projectFirestore.collection(collection);

    // HANDLE QUERY
    if (query) {
      ref = ref.where(...query);
    }

    const unSubscribe = collectionRef.onSnapshot((snapshot) => {
      let results = [];
      snapshot.docs.forEach(doc => {
        results.push({ ...doc.data(), id: doc.id });
      })

      // UPDATE STATES
      setDocuments(results);
      setError(null);
    }, (err) => {
      // HANDLE ERROR
      console.log(err);
      setError('could not fetch data');
    })

    // UNSUBSCRIBE ON UNMOUNT
    return () => unSubscribe();
  }, [collection, query]);

  // RETURN OBJECT
  return { documents, error };
}
import { useEffect, useState } from 'react';
import { projectFirestore } from '../firebase/fbConfig';

export const useCollection = (collection) => {
  // DEFAULT STATES
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  // TRACK COLLECTION CHANGES
  useEffect(() => {
    let collectionRef = projectFirestore.collection(collection);

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
  }, [collection]);

  // RETURN OBJECT
  return { documents, error };
}
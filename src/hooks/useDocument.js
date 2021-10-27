import { useEffect, useState } from 'react';
import { projectFirestore } from '../firebase/fbConfig';

export const useDocument = (collection, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const collectionRef = projectFirestore.collection(collection).doc(id);

    const unSubscribe = collectionRef.onSnapshot((snapshot) => {
      setDocument({...snapshot.data(), id: snapshot.id });
      setError(null);
    }, (err) => {
      console.log(err.message);
      setError('document fetch failed');
    })

    return () => unSubscribe();

  }, [collection, id])

  return { document, error }
}
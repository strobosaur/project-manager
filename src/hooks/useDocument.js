import { useEffect, useState } from 'react';
import { projectFirestore } from '../firebase/fbConfig';

export const useDocument = (collection, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);

  // GET REALTIME DATA
  useEffect(() => {
    const collectionRef = projectFirestore.collection(collection).doc(id);

    const unSubscribe = collectionRef.onSnapshot((snapshot) => {
      // CHECK IF DOCUMENT EXISTS IN DB
      if (snapshot.data()) {
        setDocument({...snapshot.data(), id: snapshot.id });
        setError(null);
      } else {
        setError('No such document in database');
      }
    }, (err) => {
      console.log(err.message);
      setError('document fetch failed');
    })

    return () => unSubscribe();

  }, [collection, id])

  return { document, error }
}
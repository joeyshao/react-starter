import { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, update, get} from 'firebase/database';

// Import the functions you need from the SDKs you need

const firebaseConfig = {
  apiKey: "AIzaSyBdC2V-eWKKIav2mOheFsjLpk8RTchAp8s",
  authDomain: "react-starter-cs392.firebaseapp.com",
  databaseURL: "https://react-starter-cs392-default-rtdb.firebaseio.com",
  projectId: "react-starter-cs392",
  storageBucket: "react-starter-cs392.firebasestorage.app",
  messagingSenderId: "248474578935",
  appId: "1:248474578935:web:699235e372189fd72588f2",
  measurementId: "G-0Q0M45RTRK"
};


const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const useDataQuery = (path: string): [unknown, boolean, Error | undefined] => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    setData(undefined);
    setLoading(true);
    setError(undefined);
    return onValue(ref(database, path), (snapshot) => {
        setData( snapshot.val() );
        setLoading(false);
      }, (error) => {
        setError(error);
        setLoading(false);
      }
    );
  }, [ path ]);

  return [ data, loading, error ];
};

export function editCourse(
  id: string,
  updates: { title: string; meets: string; term: string; number: string }
) {
  update(ref(database, `courses/${id}`), updates);
}

export async function getCourse(id: string) {
  const snapshot = await get(ref(database, `courses/${id}`));
  if (!snapshot.exists()) throw new Error('Course not found');
  return snapshot.val();
}

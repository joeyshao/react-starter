import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ref, onValue } from "firebase/database";
import { database } from "./firebase"

export function useIsAdmin() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();

    const unsubAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      const adminRef = ref(database, `admins/${user.uid}`);
      const unsubDB = onValue(
        adminRef,
        (snapshot) => {
          setIsAdmin(!!snapshot.val());
          setLoading(false);
        },
        () => setLoading(false)
      );

      return () => unsubDB();
    });

    return () => unsubAuth();
  }, []);

  return { isAdmin, loading };
}
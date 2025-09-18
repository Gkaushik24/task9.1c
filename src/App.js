import React, { useEffect, useState } from "react";
import Auth from "./Auth";
import Dashboard from "./Dashboard";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      {user ? <Dashboard /> : <Auth />}
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { signOut } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";

function Dashboard() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (auth.currentUser) {
      console.log("🔎 Listening for Firestore changes on UID:", auth.currentUser.uid);

      const unsubscribe = onSnapshot(
        doc(db, "users", auth.currentUser.uid),
        (docSnap) => {
          if (docSnap.exists()) {
            console.log("✅ Firestore data updated:", docSnap.data());
            setUserData(docSnap.data());
          } else {
            console.log("⚠️ No Firestore document found for UID:", auth.currentUser.uid);
          }
        }
      );

      return () => unsubscribe();
    }
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => console.log("✅ Signed out"))
      .catch((error) => console.error("❌ Error signing out:", error));
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Welcome 🎉</h2>

      {userData ? (
        <div>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Created At:</strong> {new Date(userData.createdAt).toLocaleString()}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}

      <br />
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}

export default Dashboard;

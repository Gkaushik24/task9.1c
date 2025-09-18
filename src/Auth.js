import React, { useState } from "react";
import { auth, db } from "./firebase";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

  const handleAuth = async () => {
    try {
      if (isLogin) {
        console.log("🔑 Logging in...");
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        console.log("✅ Login success:", user.uid);

        // 🔹 Ensure user exists in Firestore
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          await setDoc(userRef, {
            email: user.email,
            createdAt: new Date().toISOString()
          });
          console.log("📌 Created Firestore doc for existing user:", user.uid);
        }
      } else {
        console.log("🆕 Signing up...");
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        console.log("✅ Signup success:", user.uid);

        // 🔹 Always create Firestore doc on signup
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          createdAt: new Date().toISOString()
        });

        console.log("📌 Firestore doc created for new user:", user.uid);
      }
    } catch (err) {
      console.error("❌ Auth error:", err);
      setError(err.message);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>
      <input 
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br /><br />
      <input 
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br /><br />
      <button onClick={handleAuth}>
        {isLogin ? "Login" : "Sign Up"}
      </button>
      <br /><br />
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Create new account" : "Already have an account? Login"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Auth;

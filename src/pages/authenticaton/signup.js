import { useState } from "react";
import "./Auth.css";
import { db } from "../../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { getAuth, updateProfile } from "firebase/auth";
import { useAuth } from "../../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

export const Signup = () => {
  const [credential, setCredential] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [error, setError] = useState("");
  const [requesting, setRequesting] = useState(false);
  const navigate = useNavigate();
  const { signIn } = useAuth();

  async function formHandler(e) {
    e.preventDefault();

    try {
      setRequesting(true);
      let cred = await signIn(credential.email, credential.password);
      await updateProfile(getAuth().currentUser, {
        displayName: credential.name,
      });
      let docRef = doc(db, "users", cred.user.uid);
      await setDoc(docRef, {
        bio: null,
        posts: null,
      });
      setRequesting(false);

      navigate("/");
    } catch (e) {
      console.error(e);
      setError(e.code);
      setRequesting(false);
    }
    // signIn(credential.email, credential.password)
    //   .then((cred) => {
    //     updateProfile(getAuth().currentUser, {
    //       displayName: credential.name,
    //     });
    //     return cred;
    //   })
    //   .then((cred) => {
    //     let docRef = doc(db, "users", cred.user.uid);
    //     return setDoc(docRef, {
    //       bio: null,
    //       posts: null,
    //     });
    //   })
    //   .then(() => navigate("/"))
    //   .catch((e) => {
    //     setError(e.code);
    //   });
  }

  function credentialHandler(e) {
    setCredential((prevCredential) => {
      return {
        ...prevCredential,
        [e.target.name]: e.target.value,
      };
    });
  }

  return (
    <section className="section-auth">
      <div className="auth-form_container">
        <form onSubmit={formHandler}>
          <input
            type="text"
            id="name"
            name="name"
            value={credential.name}
            placeholder="Name"
            onChange={credentialHandler}
            required
          />

          <input
            type="email"
            id="email"
            name="email"
            value={credential.email}
            placeholder="Email"
            onChange={credentialHandler}
            required
          />

          <input
            type="password"
            id="password"
            name="password"
            value={credential.password}
            placeholder="Password"
            onChange={credentialHandler}
            required
          />
          <button className={`auth-btn ${requesting ? "disabled" : ""}`}>
            Signup
          </button>
        </form>
        {error && <div className="auth-error">{error}</div>}
        <div className={`auth-bottom ${requesting ? "disabled" : ""}`}>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </section>
  );
};

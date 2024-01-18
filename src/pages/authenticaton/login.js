import { useState } from "react";
import "./Auth.css";
import { useAuth } from "../../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const [credential, setCredential] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [requesting, setRequesting] = useState(false);
  const navigate = useNavigate();
  const { Login } = useAuth();

  async function formHandler(e) {
    e.preventDefault();
    try {
      setRequesting(true);
      await Login(credential.email, credential.password);
      setRequesting(false);
      navigate("/");
    } catch (e) {
      console.error(e);
      setError(e.code);
      setRequesting(false);
    }
  }

  function credentialHandler(e) {
    setCredential((prevCredential) => {
      return {
        ...prevCredential,
        [e.target.name]: e.target.value,
      };
    });
  }

  async function handleGuestLogin() {
    let guestCredential = {
      email: "guest@gmail.com",
      password: "123456",
    };
    try {
      setRequesting(true);
      await Login(guestCredential.email, guestCredential.password);
      setRequesting(false);
      navigate("/");
    } catch (e) {
      console.error(e);
      setError(e.code);
      setRequesting(false);
    }
  }

  return (
    <section className="section-auth">
      <div className="auth-form_container">
        <form onSubmit={formHandler}>
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
            Login
          </button>
        </form>
        {error && <div className="auth-error">{error}</div>}
        <div className={`auth-bottom ${requesting ? "disabled" : ""}`}>
          <Link className="hello" to="/Signup">
            Create new account
          </Link>
          <div>
            <span className="bi-line">Or</span>
            <button
              className={`auth-btn ${requesting ? "disabled" : ""}`}
              onClick={handleGuestLogin}
            >
              Login As Guest
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

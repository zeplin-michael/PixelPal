import { useState } from "react";

import { Link, useNavigate } from "react-router";
import "./Auth.css";
import { useAuth } from "./AuthContext";

/** A form that allows users to log into an existing account. */
export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const onLogin = async (formData) => {
    const username = formData.get("username");
    const password = formData.get("password");
    try {
      await login({ username, password });
      navigate("/");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h1>Log in to your account</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            onLogin(formData);
          }}
        >
          <label>
            <input
              style={{ "--input-index": 0 }}
              type="text"
              name="username"
              required
              placeholder="Username"
            />
          </label>
          <label>
            <input
              type="password"
              name="password"
              required
              placeholder="Password"
              style={{ "--input-index": 1 }}
            />
          </label>

          <button type="submit">Login</button>
          {error && <output>{error}</output>}
        </form>
        <Link to="/register">Need an account? Create one here.</Link>
      </div>
    </div>
  );
}

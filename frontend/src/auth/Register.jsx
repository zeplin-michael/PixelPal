import { useState } from "react";
import { Link, useNavigate } from "react-router";
import useQuery from "../api/useQuery";
import { useAuth } from "./AuthContext";

/** A form that allows users to register for a new account */
export default function Register() {
  const { register, token } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const onRegister = async (formData) => {
    const username = formData.get("username");
    const password = formData.get("password");
    try {
      await register({ username, password });
      navigate("/");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h1>Create an account</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            onRegister(formData);
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
              style={{ "--input-index": 1 }}
              type="password"
              name="password"
              required
              placeholder="Password"
            />
          </label>
          <button type="submit">Create</button>
          {error && <output>{error}</output>}
        </form>
        <Link to="/login">Already have an account? Log in here.</Link>
      </div>
    </div>
  );
}

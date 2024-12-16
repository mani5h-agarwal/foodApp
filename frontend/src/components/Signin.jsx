import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";


const Signin = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        localStorage.setItem('token', data.token); 
        navigate("/"); 
      } else {
        console.error("Sign in failed:", data);
        setError(data.error || "Sign in failed");
      }
    } catch (error) {
      console.error("Error:", error);
      setError(error.message || "An unexpected error occurred");
    }
  };

  return (
    <div className="container mt-5">
      {error && (
        <div className="container mt-4">
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};


Signin.propTypes = {
  setUser: PropTypes.func.isRequired,
};

export default Signin;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css"; // Make sure this includes the new CSS from above

const Login = () => {
  const [formData, setFormData] = useState({
    orgId: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  // NEW: State for handling user-facing errors
  const [error, setError] = useState("");
  // NEW: State for password visibility
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error message when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Clear previous errors

    try {
      // --- Replace this with your actual authentication logic ---
      console.log("Login data:", formData);

      // Simulate an API call
      // To test the error, you can change the condition to `false`
      const isSuccess = await new Promise((resolve) => {
        setTimeout(() => {
          // Example condition: fail if email is "test@test.com"
          if (formData.email === "test@test.com") {
            resolve(false);
          } else {
            resolve(true);
          }
        }, 1000);
      });

      if (isSuccess) {
        // After successful login, navigate to dashboards
        navigate("/dashboards");
      } else {
        // If the API returns an error, set the error message
        setError("Invalid Organization ID, Email, or Password.");
      }
      // --- End of simulated logic ---
    } catch (err) {
      console.error("Login error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // NEW: Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="auth-container">
      <div className="login-container">
        <div className="logo">
          <i className="fas fa-sign-in-alt"></i>
          <h1>Welcome Back</h1>
          <p>Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Display error message if it exists */}
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="org-id">Organization ID</label>
            <input
              type="text"
              id="org-id"
              name="orgId"
              value={formData.orgId}
              onChange={handleChange}
              placeholder="Enter your unique organization ID"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="contact@your-business.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            {/* NEW: Wrapper for password input and toggle button */}
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <i
                  className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                ></i>
              </button>
            </div>
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>

          <div className="form-extra-links">
            {/* Using a Link if you have a route for password reset */}
            <Link to="/forgot-password">Forgot your password?</Link>
          </div>
        </form>

        <div className="form-footer">
          <p>
            Don't have an account? <Link to="/signup">Register Here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

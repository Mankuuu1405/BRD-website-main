import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Use Link for internal navigation
import "./Auth.css";

const SignUp = () => {
  const navigate = useNavigate();
  // State to manage all form fields
  const [formData, setFormData] = useState({
    // Primary Contact Information
    contact_person: "",
    email: "",
    mobile_no: "",
    // Business Details
    business_name: "",
    Business_type: "",
    business_website: "",
    business_description: "",
    // Business Address
    address_line1: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
    // Password
    password: "",
  });

  // State for loading and error handling
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Generic handler for input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // Clear error when user types
    if (error) setError("");
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form reload
    setLoading(true);
    setError("");

    try {
      // --- Replace this with your actual API call ---
      console.log("Submitting Form Data:", formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Simulate a potential error (e.g., email already exists)
      if (formData.email === "existing@test.com") {
        throw new Error("An account with this email already exists.");
      }

      // On success: navigate to dashboards (or optionally to login)
      navigate("/dashboards");
    } catch (err) {
      setError(
        err.message || "An unexpected error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="auth-container">
      <div className="signup-container">
        <div className="logo">
          <i className="fas fa-user-plus"></i>
          <h1>Create Your Account</h1>
          <p>Register your organization to get started</p>
        </div>

        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}

          <div className="form-section">
            <h2 className="section-title">
              <i className="fas fa-user"></i> Primary Contact Information
            </h2>
            <div className="form-group">
              <label htmlFor="contact_person">
                Contact Person Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="contact_person"
                name="contact_person"
                value={formData.contact_person}
                onChange={handleChange}
                placeholder="Full name of the primary contact"
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">
                  Email Address <span className="required">*</span>
                </label>
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
                <label htmlFor="mobile_no">
                  Mobile Number <span className="required">*</span>
                </label>
                <input
                  type="tel"
                  id="mobile_no"
                  name="mobile_no"
                  value={formData.mobile_no}
                  onChange={handleChange}
                  placeholder="+1 234 567 8900"
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2 className="section-title">
              <i className="fas fa-building"></i> Business Details
            </h2>
            <div className="form-group">
              <label htmlFor="business_name">
                Business Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="business_name"
                name="business_name"
                value={formData.business_name}
                onChange={handleChange}
                placeholder="Registered name of your business"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="occupation_type">
                Business Type <span className="required">*</span>
              </label>
              <select
                id="occupation_type"
                name="occupation_type"
                value={formData.occupation_type}
                onChange={handleChange}
                required
              >
                <option value="">Select Occupation Type</option>
                <option value="retail">Retail</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="services">Services</option>
                <option value="technology">Technology</option>
                <option value="healthcare">Healthcare</option>
                <option value="education">Education</option>
                <option value="finance">Finance</option>
                <option value="real_estate">Real Estate</option>
                <option value="construction">Construction</option>
                <option value="hospitality">Hospitality</option>
                <option value="transportation">Transportation</option>
                <option value="agriculture">Agriculture</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* --- NEW FIELDS --- */}
            <div className="form-group">
              <label htmlFor="business_website">Business Website</label>
              <input
                type="url"
                id="business_website"
                name="business_website"
                value={formData.business_website}
                onChange={handleChange}
                placeholder="https://www.your-business.com"
              />
            </div>
            <div className="form-group">
              <label htmlFor="business_description">Business Description</label>
              <textarea
                id="business_description"
                name="business_description"
                value={formData.business_description}
                onChange={handleChange}
                rows="3"
                placeholder="Tell us a little about your business..."
              ></textarea>
            </div>
            <h3 className="subsection-title">Business Address</h3>
            <div className="form-group">
              <label htmlFor="address_line1">Address Line 1</label>
              <input
                type="text"
                id="address_line1"
                name="address_line1"
                value={formData.address_line1}
                onChange={handleChange}
                placeholder="Street address, P.O. box, company name"
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                />
              </div>
              <div className="form-group">
                <label htmlFor="state">State / Province</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="State or Province"
                />
              </div>
              <div className="form-group">
                <label htmlFor="postal_code">ZIP / Postal Code</label>
                <input
                  type="text"
                  id="postal_code"
                  name="postal_code"
                  value={formData.postal_code}
                  onChange={handleChange}
                  placeholder="Postal or ZIP code"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Country"
              />
            </div>
            {/* --- END OF NEW FIELDS --- */}
          </div>

          <div className="form-section">
            <h2 className="section-title">
              <i className="fas fa-lock"></i> Set Your Password
            </h2>
            <div className="form-group">
              <label htmlFor="password">
                Password <span className="required">*</span>
              </label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <i
                    className={`fas ${
                      showPassword ? "fa-eye-slash" : "fa-eye"
                    }`}
                  ></i>
                </button>
              </div>
            </div>
          </div>

          <button type="submit" className="register-btn" disabled={loading}>
            {loading ? "Registering..." : "Submit"}
          </button>
          <div className="form-footer">
            <p>
              Already have an account? <Link to="/login">Sign In</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

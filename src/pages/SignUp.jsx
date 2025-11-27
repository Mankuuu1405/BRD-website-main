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
    business_type: "",
    business_pan: "",
    owner_pan: "",
    gst_number: "",
    duns_number: "",
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
  // Onboarding step: 'apply' -> initial form, 'verify' -> enter code, 'success' -> completed
  const [step, setStep] = useState("apply");
  const [emailVerificationCode, setEmailVerificationCode] = useState("");
  const [mobileVerificationCode, setMobileVerificationCode] = useState("");
  const [verificationSentToEmail, setVerificationSentToEmail] = useState("");
  const [verificationSentToMobile, setVerificationSentToMobile] = useState("");

  // Generic handler for input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;
    // Normalize certain identifier fields
    if (
      name === "business_pan" ||
      name === "owner_pan" ||
      name === "gst_number"
    ) {
      newValue = value.toUpperCase();
    }
    if (name === "duns_number") {
      // Allow only digits for DUNS
      newValue = value.replace(/\D/g, "");
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
    // Clear error when user types
    if (error) setError("");
  };

  // Validate PAN, GST, and DUNS formats. Returns array of error messages (empty if valid)
  const validateIdentifiers = (data) => {
    const errors = [];
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/i; // Indian PAN
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/i; // GSTIN
    const dunsRegex = /^\d{9}$/; // 9 digits

    const bt = data.business_type;
    if (bt === "Private Limited" || bt === "LLP") {
      if (!data.business_pan || data.business_pan.trim() === "") {
        errors.push("Business PAN is required for the selected business type.");
      } else if (!panRegex.test(data.business_pan.toUpperCase())) {
        errors.push(
          "Business PAN format is invalid (expected: 5 letters, 4 digits, 1 letter)."
        );
      }
    }

    if (bt === "Proprietorship") {
      if (!data.owner_pan || data.owner_pan.trim() === "") {
        errors.push("Owner PAN is required for Proprietorship.");
      } else if (!panRegex.test(data.owner_pan.toUpperCase())) {
        errors.push(
          "Owner PAN format is invalid (expected: 5 letters, 4 digits, 1 letter)."
        );
      }
    }

    if (data.gst_number && data.gst_number.trim() !== "") {
      if (!gstRegex.test(data.gst_number.toUpperCase())) {
        errors.push(
          "GST Number format is invalid (expected 15 characters, e.g., 27AAAAA0000A1Z5)."
        );
      }
    }

    if (data.duns_number && data.duns_number.trim() !== "") {
      if (!dunsRegex.test(data.duns_number)) {
        errors.push("DUNS Number must be 9 digits.");
      }
    }

    return errors;
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form reload
    setLoading(true);
    setError("");
    try {
      if (step === "apply") {
        // --- Simulate sending verification code ---
        console.log("Submitting application:", formData);
        // Simulate server validation
        await new Promise((resolve) => setTimeout(resolve, 1200));

        if (!formData.business_name || !formData.email) {
          throw new Error(
            "Please provide required fields: Business Name and Email."
          );
        }

        // Simulate duplicate check
        if (formData.email === "existing@test.com") {
          throw new Error("An account with this email already exists.");
        }

        // Validate PAN / GST / DUNS formats before proceeding
        const idErrors = validateIdentifiers(formData);
        if (idErrors.length > 0) {
          throw new Error(idErrors.join(" "));
        }

        // Pretend we sent a verification code to both email and mobile (if provided)
        setVerificationSentToEmail(formData.email || "");
        setVerificationSentToMobile(formData.mobile_no || "");
        setStep("verify");
      } else {
        // If already in verification step, don't handle here
      }
    } catch (err) {
      setError(
        err.message || "An unexpected error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // Simulate verification API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // NOTE: Temporarily bypassing strict verification so user can proceed.
      // In real flow, validate `emailVerificationCode` and `mobileVerificationCode` with backend here.
      console.log(
        "Email code:",
        emailVerificationCode,
        "Mobile code:",
        mobileVerificationCode
      );
      setStep("success");
      // Optionally navigate to profile completion or dashboard
      setTimeout(() => navigate("/dashboards"), 1000);
    } catch (err) {
      // Suppress verification failure message for now; log for debugging.
      console.error(err);
      setError("");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async (channel = "email") => {
    setLoading(true);
    setError("");
    try {
      // Simulate resend to specific channel
      await new Promise((resolve) => setTimeout(resolve, 800));
      if (channel === "mobile") {
        setError(
          `Verification code resent to ${verificationSentToMobile || "mobile"}.`
        );
      } else {
        setError(
          `Verification code resent to ${verificationSentToEmail || "email"}.`
        );
      }
    } catch (err) {
      console.error(err);
      setError("Unable to resend code. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="signup-container">
        <div className="logo">
          <i className="fas fa-user-plus"></i>
          <h1>Create Your Account</h1>
          <p>Register your organization to get started</p>
        </div>

        <form onSubmit={step === "apply" ? handleSubmit : handleVerify}>
          {error && <div className="error-message">{error}</div>}

          {step === "apply" && (
            <>
              <div className="form-section">
                <h2 className="section-title">
                  <i className="fas fa-user"></i> Primary Contact Information
                </h2>
                <div className="form-group">
                  <label htmlFor="contact_person">Contact Person Name</label>
                  <input
                    type="text"
                    id="contact_person"
                    name="contact_person"
                    value={formData.contact_person}
                    onChange={handleChange}
                    placeholder="Full name of the primary contact"
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
                    <label htmlFor="mobile_no">Mobile Number</label>
                    <input
                      type="tel"
                      id="mobile_no"
                      name="mobile_no"
                      value={formData.mobile_no}
                      onChange={handleChange}
                      placeholder="+1 234 567 8900"
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
                  <label htmlFor="business_type">
                    Business Type <span className="required">*</span>
                  </label>
                  <select
                    id="business_type"
                    name="business_type"
                    value={formData.business_type}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Business Type</option>
                    <option value="Private Limited">Private Limited</option>
                    <option value="LLP">LLP</option>
                    <option value="Proprietorship">Proprietorship</option>
                  </select>
                </div>

                {(formData.business_type === "Private Limited" ||
                  formData.business_type === "LLP") && (
                  <div className="form-group">
                    <label htmlFor="business_pan">Business PAN Number</label>
                    <input
                      type="text"
                      id="business_pan"
                      name="business_pan"
                      value={formData.business_pan}
                      onChange={handleChange}
                      placeholder="ABCDE1234F"
                      maxLength={10}
                    />
                  </div>
                )}

                {formData.business_type === "Proprietorship" && (
                  <div className="form-group">
                    <label htmlFor="owner_pan">Owner PAN Card</label>
                    <input
                      type="text"
                      id="owner_pan"
                      name="owner_pan"
                      value={formData.owner_pan}
                      onChange={handleChange}
                      placeholder="ABCDE1234F"
                      maxLength={10}
                    />
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="gst_number">GST Number</label>
                  <input
                    type="text"
                    id="gst_number"
                    name="gst_number"
                    value={formData.gst_number}
                    onChange={handleChange}
                    placeholder="27AAAAA0000A1Z5"
                    maxLength={15}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="duns_number">DUNS Number</label>
                  <input
                    type="text"
                    id="duns_number"
                    name="duns_number"
                    value={formData.duns_number}
                    onChange={handleChange}
                    placeholder="9 digit DUNS number"
                    maxLength={9}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="business_description">
                    Business Description
                  </label>
                  <textarea
                    id="business_description"
                    name="business_description"
                    value={formData.business_description}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Tell us a little about your business..."
                  ></textarea>
                </div>
                <p className="muted">
                  Note: Your account password will be auto-generated and sent to
                  the email you provide after verification.
                </p>
              </div>

              <button type="submit" className="register-btn" disabled={loading}>
                {loading ? "Submitting..." : "Submit Application"}
              </button>
            </>
          )}

          {step === "verify" && (
            <div className="form-section">
              <h2 className="section-title">
                <i className="fas fa-shield-alt"></i> Verify Your Contact
              </h2>
              <p>
                We sent verification codes to the contacts you provided. Enter
                them below to continue.
              </p>

              <div className="form-group">
                <label htmlFor="verification_code_email">
                  Email Verification Code
                </label>
                <input
                  type="text"
                  id="verification_code_email"
                  name="verification_code_email"
                  value={emailVerificationCode}
                  onChange={(e) => setEmailVerificationCode(e.target.value)}
                  placeholder="Enter the 6-digit email code"
                />
                <div className="muted small">
                  Sent to: <strong>{verificationSentToEmail || "-"}</strong>
                </div>
                <button
                  type="button"
                  className="link-btn"
                  onClick={() => handleResend("email")}
                  disabled={loading}
                >
                  Resend Email Code
                </button>
              </div>

              <div className="form-group">
                <label htmlFor="verification_code_mobile">
                  Mobile Verification Code
                </label>
                <input
                  type="text"
                  id="verification_code_mobile"
                  name="verification_code_mobile"
                  value={mobileVerificationCode}
                  onChange={(e) => setMobileVerificationCode(e.target.value)}
                  placeholder="Enter the 6-digit mobile code"
                />
                <div className="muted small">
                  Sent to: <strong>{verificationSentToMobile || "-"}</strong>
                </div>
                <button
                  type="button"
                  className="link-btn"
                  onClick={() => handleResend("mobile")}
                  disabled={loading}
                >
                  Resend Mobile Code
                </button>
              </div>

              <div className="form-row">
                <button
                  type="submit"
                  className="register-btn"
                  disabled={loading}
                >
                  {loading ? "Verifying..." : "Verify"}
                </button>
                <button
                  type="button"
                  className="link-btn"
                  onClick={() => setStep("apply")}
                >
                  Edit Details
                </button>
              </div>
            </div>
          )}

          {step === "success" && (
            <div className="form-section">
              <h2 className="section-title">
                <i className="fas fa-check-circle"></i> Verification Successful
              </h2>
              <p>
                Your account has been created. A temporary password has been
                sent to your email. You will be redirected shortly.
              </p>
              <div className="form-row">
                <Link to="/login" className="link-btn">
                  Go to Sign In
                </Link>
              </div>
            </div>
          )}

          {step !== "success" && (
            <div className="form-footer">
              <p>
                Already have an account? <Link to="/login">Sign In</Link>
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignUp;

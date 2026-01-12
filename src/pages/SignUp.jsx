import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

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
    cin: "", // Corporate Identification Number (added)
    business_website: "",
    business_description: "",
    loan_product: [], // List of selected loan products (added)
    subscription_type: "", // Type of subscription (added)
    // Business Address
    address_line1: "",
    address_line2: "", // Added
    city: "",
    state: "",
    pincode: "", // Changed from postal_code to match screenshot
    country: "",
    // Password
    password: "",
    status: "Active", // Added with default value
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

  // State for loan products dropdown
  const [loanProductsDropdownOpen, setLoanProductsDropdownOpen] =
    useState(false);
  const dropdownRef = useRef(null);

  // Available loan products
  const loanProductsOptions = [
    "Working Capital",
    "Equipment Financing",
    "Line of Credit",
    "Merchant Cash Advance",
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setLoanProductsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
    if (name === "cin") {
      // Allow only alphanumeric for CIN and normalize to uppercase
      newValue = value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
    // Clear error when user types
    if (error) setError("");
  };

  // Handler for multi-select loan products
  const handleLoanProductToggle = (product) => {
    setFormData((prevState) => {
      const loanProducts = [...prevState.loan_product];
      const index = loanProducts.indexOf(product);

      if (index > -1) {
        // Product already selected, remove it
        loanProducts.splice(index, 1);
      } else {
        // Product not selected, add it
        loanProducts.push(product);
      }

      return {
        ...prevState,
        loan_product: loanProducts,
      };
    });
  };

  // Toggle dropdown open/close
  const toggleLoanProductsDropdown = () => {
    setLoanProductsDropdownOpen(!loanProductsDropdownOpen);
  };

  // Handler for multi-select loan products (keeping for compatibility)
  const handleLoanProductChange = (e) => {
    const { options } = e.target;
    const selectedValues = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].value);
      }
    }
    setFormData((prevState) => ({
      ...prevState,
      loan_product: selectedValues,
    }));
  };

  // Validate PAN, GST, and DUNS formats. Returns array of error messages (empty if valid)
  const validateIdentifiers = (data) => {
    const errors = [];
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/i; // Indian PAN
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/i; // GSTIN
    const dunsRegex = /^\d{9}$/; // 9 digits
    // CIN: 21 alphanumeric characters (e.g., U12345MH2023PTC123456)
    const cinRegex = /^[A-Z0-9]{21}$/i;

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

    if (data.cin && data.cin.trim() !== "") {
      if (!cinRegex.test(data.cin.toUpperCase())) {
        errors.push(
          "Corporate Identification Number (CIN) must be 21 characters (letters and digits)."
        );
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

  // Styles for multi-select dropdown (not in Auth.css)
  const multiSelectStyles = {
    container: {
      position: "relative",
      width: "100%",
    },
    input: {
      width: "100%",
      padding: "0.5rem",
      border: "1px solid #e5e7eb",
      borderRadius: "6px",
      boxSizing: "border-box",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "6px",
      minHeight: "40px",
    },
    selectedItems: {
      display: "flex",
      flexWrap: "wrap",
      gap: "6px",
      width: "100%",
    },
    selectedItem: {
      backgroundColor: "#e7f3ff",
      color: "#0369a1",
      borderRadius: "16px",
      padding: "4px 8px",
      fontSize: "14px",
      display: "flex",
      alignItems: "center",
      gap: "6px",
    },
    selectedItemIcon: {
      fontSize: "12px",
      cursor: "pointer",
      marginLeft: "4px",
    },
    placeholder: {
      color: "#6b7280",
    },
    dropdownArrow: {
      position: "absolute",
      right: "12px",
      top: "50%",
      transform: "translateY(-50%)",
      color: "#6b7280",
      pointerEvents: "none",
    },
    dropdown: {
      position: "absolute",
      top: "100%",
      left: "0",
      right: "0",
      background: "white",
      border: "1px solid #e5e7eb",
      borderRadius: "6px",
      maxHeight: "200px",
      overflowY: "auto",
      zIndex: "10",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      marginTop: "4px",
    },
    dropdownItem: {
      padding: "10px 16px",
      cursor: "pointer",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      boxSizing: "border-box",
    },
    dropdownItemSelected: {
      backgroundColor: "#e7f3ff",
      color: "#0369a1",
      fontWeight: "500",
    },
  };

  return (
    <div className="auth-container">
      <div className="signup-container">
        <div className="logo">
          <i
            className="fas fa-user-plus"
            style={{ fontSize: "2rem", color: "#0369a1" }}
          ></i>
          <h1>Create Your Account</h1>
          <p style={{ color: "#6b7280", margin: "0.5rem 0" }}>
            Register your organization to get started
          </p>
        </div>

        <form onSubmit={step === "apply" ? handleSubmit : handleVerify}>
          {error && <div className="error-message">{error}</div>}

          {step === "apply" && (
            <>
              <div className="form-section">
                <h2
                  className="section-title"
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                    marginBottom: "1rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
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
                <h2
                  className="section-title"
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                    marginBottom: "1rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
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
                  <label htmlFor="business_website">
                    Business Website <span className="required">*</span>
                  </label>
                  <input
                    type="url"
                    id="business_website"
                    name="business_website"
                    value={formData.business_website}
                    onChange={handleChange}
                    placeholder="https://www.your-business.com"
                    required
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
                    <label htmlFor="business_pan">
                      Business PAN Number <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="business_pan"
                      name="business_pan"
                      value={formData.business_pan}
                      onChange={handleChange}
                      placeholder="ABCDE1234F"
                      maxLength={10}
                      required
                    />
                  </div>
                )}

                {formData.business_type === "Proprietorship" && (
                  <div className="form-group">
                    <label htmlFor="owner_pan">
                      Owner PAN Card <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="owner_pan"
                      name="owner_pan"
                      value={formData.owner_pan}
                      onChange={handleChange}
                      placeholder="ABCDE1234F"
                      maxLength={10}
                      required
                    />
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="cin">
                    Corporate Identification Number (CIN){" "}
                    <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="cin"
                    name="cin"
                    value={formData.cin}
                    onChange={handleChange}
                    placeholder="e.g., U12345MH2023PTC123456"
                    maxLength={21}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="gst_number">
                    GST Number <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="gst_number"
                    name="gst_number"
                    value={formData.gst_number}
                    onChange={handleChange}
                    placeholder="27AAAAA0000A1Z5"
                    maxLength={15}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="duns_number">
                    DUNS Number <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="duns_number"
                    name="duns_number"
                    value={formData.duns_number}
                    onChange={handleChange}
                    placeholder="9 digit DUNS number"
                    maxLength={9}
                    required
                  />
                </div>

                <div className="form-group" ref={dropdownRef}>
                  <label htmlFor="loan_product">
                    Loan Products <span className="required">*</span>
                  </label>
                  <div style={multiSelectStyles.container}>
                    <div
                      style={multiSelectStyles.input}
                      onClick={toggleLoanProductsDropdown}
                    >
                      {formData.loan_product.length > 0 ? (
                        <div style={multiSelectStyles.selectedItems}>
                          {formData.loan_product.map((product, index) => (
                            <span
                              key={index}
                              style={multiSelectStyles.selectedItem}
                            >
                              {product}
                              <i
                                className="fas fa-times"
                                style={multiSelectStyles.selectedItemIcon}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleLoanProductToggle(product);
                                }}
                              ></i>
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span style={multiSelectStyles.placeholder}>
                          Select loan products...
                        </span>
                      )}
                      <i
                        className={`fas fa-chevron-${
                          loanProductsDropdownOpen ? "up" : "down"
                        }`}
                        style={multiSelectStyles.dropdownArrow}
                      ></i>
                    </div>
                    {loanProductsDropdownOpen && (
                      <div style={multiSelectStyles.dropdown}>
                        {loanProductsOptions.map((product, index) => (
                          <div
                            key={index}
                            style={{
                              ...multiSelectStyles.dropdownItem,
                              ...(formData.loan_product.includes(product)
                                ? multiSelectStyles.dropdownItemSelected
                                : {}),
                            }}
                            onClick={() => handleLoanProductToggle(product)}
                          >
                            {product}
                            {formData.loan_product.includes(product) && (
                              <i className="fas fa-check"></i>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <small
                    style={{
                      fontSize: "0.8rem",
                      color: "#6b7280",
                      display: "block",
                      marginTop: "0.25rem",
                    }}
                  >
                    Click to select multiple loan products
                  </small>
                </div>

                <div className="form-group">
                  <label htmlFor="subscription_type">
                    Subscription Type <span className="required">*</span>
                  </label>
                  <select
                    id="subscription_type"
                    name="subscription_type"
                    value={formData.subscription_type}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Subscription Type</option>
                    <option value="Trial">Trial</option>
                    <option value="Paid">Paid</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="business_description">
                    Business Description <span className="required">*</span>
                  </label>
                  <textarea
                    id="business_description"
                    name="business_description"
                    value={formData.business_description}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Tell us a little about your business..."
                    required
                  ></textarea>
                </div>
                <p
                  style={{
                    fontSize: "0.8rem",
                    color: "#6b7280",
                    margin: "0.5rem 0",
                  }}
                >
                  Note: Your account password will be auto-generated and sent to
                  the email you provide after verification.
                </p>
              </div>

              <div className="form-section">
                <h2
                  className="section-title"
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                    marginBottom: "1rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <i className="fas fa-map-marker-alt"></i> Business Address
                </h2>
                <div className="form-group">
                  <label htmlFor="address_line1">
                    Address Line 1 <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="address_line1"
                    name="address_line1"
                    value={formData.address_line1}
                    onChange={handleChange}
                    placeholder="Street address"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address_line2">
                    Address Line 2 <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="address_line2"
                    name="address_line2"
                    value={formData.address_line2}
                    onChange={handleChange}
                    placeholder="Apartment, suite, unit, building, floor, etc."
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">
                      City <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="City"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="state">
                      State <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="State/Province"
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="pincode">
                      Pincode <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="pincode"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      placeholder="Postal/ZIP code"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="country">
                      Country <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="Country"
                      required
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className="register-btn" disabled={loading}>
                {loading ? "Submitting..." : "Submit Application"}
              </button>
            </>
          )}

          {step === "verify" && (
            <div className="form-section">
              <h2
                className="section-title"
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  marginBottom: "1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <i className="fas fa-shield-alt"></i> Verify Your Contact
              </h2>
              <p style={{ color: "#6b7280", marginBottom: "1rem" }}>
                We sent verification codes to the contacts you provided. Enter
                them below to continue.
              </p>

              <div className="form-group">
                <label htmlFor="verification_code_email">
                  Email Verification Code <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="verification_code_email"
                  name="verification_code_email"
                  value={emailVerificationCode}
                  onChange={(e) => setEmailVerificationCode(e.target.value)}
                  placeholder="Enter the 6-digit email code"
                  required
                />
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "#6b7280",
                    marginTop: "0.25rem",
                  }}
                >
                  Sent to: <strong>{verificationSentToEmail || "-"}</strong>
                </div>
                <button
                  type="button"
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#0369a1",
                    cursor: "pointer",
                    padding: "0.25rem 0",
                    fontSize: "0.9rem",
                  }}
                  onClick={() => handleResend("email")}
                  disabled={loading}
                >
                  Resend Email Code
                </button>
              </div>

              <div className="form-group">
                <label htmlFor="verification_code_mobile">
                  Mobile Verification Code <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="verification_code_mobile"
                  name="verification_code_mobile"
                  value={mobileVerificationCode}
                  onChange={(e) => setMobileVerificationCode(e.target.value)}
                  placeholder="Enter the 6-digit mobile code"
                  required
                />
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "#6b7280",
                    marginTop: "0.25rem",
                  }}
                >
                  Sent to: <strong>{verificationSentToMobile || "-"}</strong>
                </div>
                <button
                  type="button"
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#0369a1",
                    cursor: "pointer",
                    padding: "0.25rem 0",
                    fontSize: "0.9rem",
                  }}
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
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#0369a1",
                    cursor: "pointer",
                    padding: "0.25rem 0",
                    fontSize: "0.9rem",
                  }}
                  onClick={() => setStep("apply")}
                >
                  Edit Details
                </button>
              </div>
            </div>
          )}

          {step === "success" && (
            <div className="form-section">
              <h2
                className="section-title"
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  marginBottom: "1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <i
                  className="fas fa-check-circle"
                  style={{ color: "#10b981" }}
                ></i>{" "}
                Verification Successful
              </h2>
              <p style={{ color: "#6b7280", marginBottom: "1rem" }}>
                Your account has been created. A temporary password has been
                sent to your email. You will be redirected shortly.
              </p>
              <div className="form-row">
                <Link
                  to="/login"
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#0369a1",
                    cursor: "pointer",
                    padding: "0.25rem 0",
                    fontSize: "0.9rem",
                    textDecoration: "underline",
                  }}
                >
                  Go to Sign In
                </Link>
              </div>
            </div>
          )}

          {step !== "success" && (
            <div className="form-footer">
              <p>
                Already have an account?{" "}
                <Link to="/login" style={{ color: "#0369a1" }}>
                  Sign In
                </Link>
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignUp;

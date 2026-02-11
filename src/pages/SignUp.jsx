import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  
  // State to manage all form fields
  const [formData, setFormData] = useState({
    // Page 1: Basic Contact Information
    full_name: "",
    email: "",
    phone_number: "",
    
    // Page 2: Password
    password: "",
    confirm_password: "",
    
    // Page 3: Company and Business Details
    company_name: "",
    company_type: "", // NBFC/Bank/Fintech/Other
    organisation_type: "", // Private Limited/LLP/Proprietorship/Partnership
    company_pan: "",
    owner_pan: "",
    gst_number: "",
    number_of_users: "",
    current_aum: "",
    loan_products: [], // Multi-select
    
    // Address
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    
    // Branches
    require_branches: "", // Yes/No
    number_of_branches: "",
  });

  // State for loading, error, and step management
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentStep, setCurrentStep] = useState(1); // 1, 2, 3, or 4 (OTP verification)
  const [emailOtp, setEmailOtp] = useState("");
  const [phoneOtp, setPhoneOtp] = useState("");

  // State for loan products dropdown
  const [loanProductsDropdownOpen, setLoanProductsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Available loan products
  const loanProductsOptions = [
    "Working Capital",
    "Equipment Financing",
    "Line of Credit",
    "Merchant Cash Advance",
    "Term Loan",
    "Invoice Financing",
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
    if (name === "company_pan" || name === "owner_pan" || name === "gst_number") {
      newValue = value.toUpperCase();
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
    
    // Clear error when user types
    if (error) setError("");
  };

  // Handler for loan products multi-select
  const handleLoanProductToggle = (product) => {
    setFormData((prevState) => {
      const loanProducts = [...prevState.loan_products];
      const index = loanProducts.indexOf(product);

      if (index > -1) {
        loanProducts.splice(index, 1);
      } else {
        loanProducts.push(product);
      }

      return {
        ...prevState,
        loan_products: loanProducts,
      };
    });
  };

  // Toggle dropdown open/close
  const toggleLoanProductsDropdown = () => {
    setLoanProductsDropdownOpen(!loanProductsDropdownOpen);
  };

  // Validation functions
  const validateStep1 = () => {
    const errors = [];
    if (!formData.full_name || formData.full_name.trim() === "") {
      errors.push("Full name is required.");
    }
    if (!formData.email || formData.email.trim() === "") {
      errors.push("Email is required.");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.push("Please enter a valid email address.");
    }
    if (!formData.phone_number || formData.phone_number.trim() === "") {
      errors.push("Phone number is required.");
    } else if (!/^\d{10}$|^\+\d{10,}$|^\+91\d{10}$/.test(formData.phone_number.replace(/\s+/g, ""))) {
      errors.push("Phone number must be 10 digits or include country code (e.g., +919876543210).");
    }
    return errors;
  };

  const validateStep2 = () => {
    const errors = [];
    if (!formData.password || formData.password.trim() === "") {
      errors.push("Password is required.");
    } else if (formData.password.length < 8) {
      errors.push("Password must be at least 8 characters long.");
    }
    if (!formData.confirm_password || formData.confirm_password.trim() === "") {
      errors.push("Please confirm your password.");
    }
    if (formData.password !== formData.confirm_password) {
      errors.push("Passwords do not match.");
    }
    return errors;
  };

  const validateStep3 = () => {
    const errors = [];
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/i;
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/i;

    if (!formData.company_name || formData.company_name.trim() === "") {
      errors.push("Company name is required.");
    }
    if (!formData.company_type || formData.company_type.trim() === "") {
      errors.push("Company type is required.");
    }
    if (!formData.organisation_type || formData.organisation_type.trim() === "") {
      errors.push("Organisation type is required.");
    }

    // PAN validation based on organisation type
    if (formData.organisation_type === "Proprietorship") {
      if (!formData.owner_pan || formData.owner_pan.trim() === "") {
        errors.push("Owner PAN is required for Proprietorship.");
      } else if (!panRegex.test(formData.owner_pan.toUpperCase())) {
        errors.push("Owner PAN format is invalid (expected: 5 letters, 4 digits, 1 letter).");
      }
    } else {
      if (!formData.company_pan || formData.company_pan.trim() === "") {
        errors.push("Company PAN is required.");
      } else if (!panRegex.test(formData.company_pan.toUpperCase())) {
        errors.push("Company PAN format is invalid (expected: 5 letters, 4 digits, 1 letter).");
      }
    }

    if (!formData.gst_number || formData.gst_number.trim() === "") {
      errors.push("GST Number is required.");
    } else if (!gstRegex.test(formData.gst_number.toUpperCase())) {
      errors.push("GST Number format is invalid (expected 15 characters, e.g., 27AAAAA0000A1Z5).");
    }

    if (!formData.number_of_users || formData.number_of_users.trim() === "") {
      errors.push("Number of users required is mandatory.");
    }
    if (!formData.current_aum || formData.current_aum.trim() === "") {
      errors.push("Current AUM is required.");
    }
    if (!formData.loan_products || formData.loan_products.length === 0) {
      errors.push("Please select at least one loan product.");
    }

    // Address validation
    if (!formData.address_line1 || formData.address_line1.trim() === "") {
      errors.push("Address Line 1 is required.");
    }
    if (!formData.city || formData.city.trim() === "") {
      errors.push("City is required.");
    }
    if (!formData.state || formData.state.trim() === "") {
      errors.push("State is required.");
    }
    if (!formData.pincode || formData.pincode.trim() === "") {
      errors.push("Pincode is required.");
    }
    if (!formData.country || formData.country.trim() === "") {
      errors.push("Country is required.");
    }

    // Branches validation
    if (!formData.require_branches || formData.require_branches.trim() === "") {
      errors.push("Please specify if you require branches.");
    }
    if (formData.require_branches === "Yes") {
      if (!formData.number_of_branches || formData.number_of_branches.trim() === "") {
        errors.push("Number of branches is required.");
      }
    }

    return errors;
  };

  const validateOtp = () => {
    const errors = [];
    if (!emailOtp || emailOtp.trim() === "") {
      errors.push("Email OTP is required.");
    }
    if (!phoneOtp || phoneOtp.trim() === "") {
      errors.push("Phone OTP is required.");
    }
    return errors;
  };

  // Handle Step 1 submission (move to step 2)
  const handleStep1Submit = (e) => {
    e.preventDefault();
    setError("");

    const validationErrors = validateStep1();
    if (validationErrors.length > 0) {
      setError(validationErrors.join(" "));
      return;
    }

    setCurrentStep(2);
  };

  // Handle Step 2 (Password) submission (move to step 3)
  const handleStep2Submit = (e) => {
    e.preventDefault();
    setError("");

    const validationErrors = validateStep2();
    if (validationErrors.length > 0) {
      setError(validationErrors.join(" "));
      return;
    }

    setCurrentStep(3);
  };

  // Handle Step 3 submission (validate and move to OTP step)
  const handleStep3Submit = (e) => {
    e.preventDefault();
    setError("");

    const validationErrors = validateStep3();
    if (validationErrors.length > 0) {
      setError(validationErrors.join(" "));
      return;
    }

    // Move to OTP verification step
    setCurrentStep(4);
  };

  // Handle sending OTP
  const handleSendOtp = async () => {
    setLoading(true);
    setError("");

    try {
      // Format phone number for backend
      let formattedPhone = formData.phone_number.replace(/\s+/g, "").replace(/[^+\d]/g, "");
      if (!formattedPhone.startsWith("+")) {
        formattedPhone = formattedPhone.length === 10 ? `+91${formattedPhone}` : `+${formattedPhone}`;
      }

      const payload = {
        email: formData.email,
        mobile_no: formattedPhone,
      };

      console.log("Sending OTP request with:", payload);

      const response = await fetch("http://localhost:8000/auth/send-otp/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Failed to send OTP (Status: ${response.status})`);
      }

      alert("OTP sent successfully to your email and phone!");
      console.log("OTP sent successfully");
    } catch (err) {
      console.error("Send OTP error:", err);
      setError(err.message || "Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP verification and final registration
  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const validationErrors = validateOtp();
    if (validationErrors.length > 0) {
      setError(validationErrors.join(" "));
      setLoading(false);
      return;
    }

    try {
      // Format phone number
      let formattedPhone = formData.phone_number.replace(/\s+/g, "").replace(/[^+\d]/g, "");
      if (!formattedPhone.startsWith("+")) {
        formattedPhone = formattedPhone.length === 10 ? `+91${formattedPhone}` : `+${formattedPhone}`;
      }

      // Step 1: Verify OTP
      const verifyResponse = await fetch("http://localhost:8000/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mobile: formattedPhone,
          otp: phoneOtp,
        }),
      });

      const verifyData = await verifyResponse.json();

      if (!verifyResponse.ok) {
        throw new Error(verifyData.error || "Invalid OTP");
      }

      console.log("OTP verified successfully");

      // Step 2: Register user
      const payload = {
        contact_person: formData.full_name,
        email: formData.email,
        mobile_no: formattedPhone,
        business_name: formData.company_name,
        business_type: formData.organisation_type,
        business_pan: formData.organisation_type !== "Proprietorship" ? formData.company_pan : "",
        owner_pan: formData.organisation_type === "Proprietorship" ? formData.owner_pan : "",
        gst_number: formData.gst_number,
        password: formData.password,
        address_line1: formData.address_line1,
        address_line2: formData.address_line2,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        country: formData.country,
        loan_product: formData.loan_products,
        status: "Active",
        // Additional fields
        company_type: formData.company_type,
        number_of_users: formData.number_of_users,
        current_aum: formData.current_aum,
        require_branches: formData.require_branches,
        number_of_branches: formData.require_branches === "Yes" ? formData.number_of_branches : "0",
      };

      console.log("Final registration payload:", payload);

      const registerResponse = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const registerData = await registerResponse.json();

      if (!registerResponse.ok) {
        throw new Error(registerData.error || "Registration failed");
      }

      // Registration successful
      alert("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle resend OTP
  const handleResendOtp = async () => {
    await handleSendOtp();
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #dbeafe 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "1rem",
      marginTop: "65px"
    }}>
      <div style={{
        maxWidth: "680px",
        width: "100%",
        background: "white",
        borderRadius: "24px",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
        padding: "2.5rem",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Decorative Elements */}
        <div style={{
          position: "absolute",
          top: "-50px",
          right: "-50px",
          width: "150px",
          height: "150px",
          background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 197, 253, 0.1) 100%)",
          borderRadius: "50%",
          filter: "blur(40px)",
        }}></div>
        <div style={{
          position: "absolute",
          bottom: "-30px",
          left: "-30px",
          width: "120px",
          height: "120px",
          background: "linear-gradient(135deg, rgba(29, 78, 216, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)",
          borderRadius: "50%",
          filter: "blur(30px)",
        }}></div>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem", position: "relative", zIndex: 1 }}>
          <h1 style={{
            fontSize: "clamp(1.75rem, 5vw, 2.25rem)",
            fontWeight: "800",
            background: "linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "0.75rem",
            letterSpacing: "-0.02em",
          }}>
            Create Your Account
          </h1>
          <p style={{ 
            color: "#64748b", 
            fontSize: "clamp(0.9rem, 2vw, 1rem)",
            fontWeight: "500",
          }}>
            Register your organization to get started
          </p>
        </div>

        {/* Step Progress Indicator */}
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          margin: "2rem auto",
          maxWidth: "500px",
          position: "relative",
          padding: "0 10px",
        }}>
          {/* Progress Line Background */}
          <div style={{
            position: "absolute",
            top: "18px",
            left: "10px",
            right: "10px",
            height: "4px",
            background: "#e2e8f0",
            zIndex: "0",
            borderRadius: "2px",
          }}></div>
          
          {/* Active Progress Line */}
          <div style={{
            position: "absolute",
            top: "18px",
            left: "10px",
            width: `calc(${((currentStep - 1) / 3) * 100}% - ${((currentStep - 1) / 3) * 20}px)`,
            height: "4px",
            background: "linear-gradient(90deg, #1e40af 0%, #3b82f6 100%)",
            transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            zIndex: "1",
            borderRadius: "2px",
          }}></div>

          {[1, 2, 3, 4].map((step) => (
            <div key={step} style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              zIndex: "2",
              position: "relative",
              flex: 1,
            }}>
              <div style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: currentStep >= step 
                  ? "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)" 
                  : "white",
                border: currentStep >= step ? "none" : "3px solid #e2e8f0",
                color: currentStep >= step ? "white" : "#94a3b8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "700",
                fontSize: "0.95rem",
                boxShadow: currentStep >= step 
                  ? "0 4px 12px rgba(30, 64, 175, 0.3)" 
                  : "none",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                transform: currentStep === step ? "scale(1.1)" : "scale(1)",
              }}>
                {currentStep > step ? (
                  <i className="fas fa-check" style={{ fontSize: "1rem" }}></i>
                ) : (
                  step
                )}
              </div>
              <span style={{ 
                fontSize: "clamp(0.7rem, 2vw, 0.8rem)", 
                color: currentStep >= step ? "#1e40af" : "#94a3b8",
                fontWeight: currentStep === step ? "700" : "600",
                marginTop: "0.6rem",
                textAlign: "center",
                transition: "all 0.3s ease",
                whiteSpace: "nowrap",
              }}>
                {step === 1 && "Contact"}
                {step === 2 && "Password"}
                {step === 3 && "Details"}
                {step === 4 && "Verify"}
              </span>
            </div>
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            background: "linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)",
            border: "1px solid #fca5a5",
            color: "#dc2626",
            padding: "1rem 1.25rem",
            borderRadius: "12px",
            marginBottom: "1.5rem",
            fontSize: "0.9rem",
            display: "flex",
            alignItems: "flex-start",
            gap: "0.75rem",
            boxShadow: "0 2px 8px rgba(220, 38, 38, 0.1)",
          }}>
            <i className="fas fa-exclamation-circle" style={{ marginTop: "2px", fontSize: "1.1rem" }}></i>
            <span style={{ lineHeight: "1.5" }}>{error}</span>
          </div>
        )}

        {/* Step 1: Basic Contact Information */}
        {currentStep === 1 && (
          <form onSubmit={handleStep1Submit}>
            <div style={{ marginBottom: "1.5rem" }}>
              <h2 style={{
                fontSize: "clamp(1.1rem, 3vw, 1.3rem)",
                fontWeight: "700",
                marginBottom: "1.5rem",
                color: "#1e293b",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}>
                <div style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <i className="fas fa-user" style={{ color: "#1e40af", fontSize: "1rem" }}></i>
                </div>
                Basic Contact Information
              </h2>
              
              <div style={{ marginBottom: "1.25rem" }}>
                <label style={{
                  display: "block",
                  fontWeight: "600",
                  marginBottom: "0.6rem",
                  color: "#334155",
                  fontSize: "0.9rem",
                }}>
                  Full Name <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  style={{
                    width: "100%",
                    padding: "0.875rem 1.125rem",
                    border: "2px solid #e2e8f0",
                    borderRadius: "12px",
                    fontSize: "0.95rem",
                    transition: "all 0.2s ease",
                    outline: "none",
                    boxSizing: "border-box",
                    fontFamily: "inherit",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#3b82f6";
                    e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e2e8f0";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              <div style={{ marginBottom: "1.25rem" }}>
                <label style={{
                  display: "block",
                  fontWeight: "600",
                  marginBottom: "0.6rem",
                  color: "#334155",
                  fontSize: "0.9rem",
                }}>
                  Email Address <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@company.com"
                  required
                  style={{
                    width: "100%",
                    padding: "0.875rem 1.125rem",
                    border: "2px solid #e2e8f0",
                    borderRadius: "12px",
                    fontSize: "0.95rem",
                    transition: "all 0.2s ease",
                    outline: "none",
                    boxSizing: "border-box",
                    fontFamily: "inherit",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#3b82f6";
                    e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e2e8f0";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              <div style={{ marginBottom: "1.25rem" }}>
                <label style={{
                  display: "block",
                  fontWeight: "600",
                  marginBottom: "0.6rem",
                  color: "#334155",
                  fontSize: "0.9rem",
                }}>
                  Phone Number <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  type="tel"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  placeholder="+91 9876543210"
                  required
                  style={{
                    width: "100%",
                    padding: "0.875rem 1.125rem",
                    border: "2px solid #e2e8f0",
                    borderRadius: "12px",
                    fontSize: "0.95rem",
                    transition: "all 0.2s ease",
                    outline: "none",
                    boxSizing: "border-box",
                    fontFamily: "inherit",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#3b82f6";
                    e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e2e8f0";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
            </div>

            <button 
              type="submit" 
              style={{
                width: "100%",
                padding: "1rem",
                background: "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)",
                color: "white",
                border: "none",
                borderRadius: "12px",
                fontSize: "1rem",
                fontWeight: "700",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: "0 4px 12px rgba(30, 64, 175, 0.3)",
                letterSpacing: "0.02em",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 8px 20px rgba(30, 64, 175, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 12px rgba(30, 64, 175, 0.3)";
              }}
            >
              Continue to Password
            </button>
            
            <div style={{ textAlign: "center", marginTop: "1.75rem" }}>
              <p style={{ color: "#64748b", fontSize: "0.9rem" }}>
                Already have an account?{" "}
                <Link to="/login" style={{ 
                  color: "#1e40af", 
                  fontWeight: "700",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}>
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        )}

        {/* Step 2: Create Password */}
        {currentStep === 2 && (
          <form onSubmit={handleStep2Submit}>
            <div style={{ marginBottom: "1.5rem" }}>
              <h2 style={{
                fontSize: "clamp(1.1rem, 3vw, 1.3rem)",
                fontWeight: "700",
                marginBottom: "1.5rem",
                color: "#1e293b",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}>
                <div style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <i className="fas fa-lock" style={{ color: "#1e40af", fontSize: "1rem" }}></i>
                </div>
                Create Password
              </h2>

              <div style={{ marginBottom: "1.25rem" }}>
                <label style={{
                  display: "block",
                  fontWeight: "600",
                  marginBottom: "0.6rem",
                  color: "#334155",
                  fontSize: "0.9rem",
                }}>
                  Password <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter a strong password (min. 8 characters)"
                  required
                  style={{
                    width: "100%",
                    padding: "0.875rem 1.125rem",
                    border: "2px solid #e2e8f0",
                    borderRadius: "12px",
                    fontSize: "0.95rem",
                    transition: "all 0.2s ease",
                    outline: "none",
                    boxSizing: "border-box",
                    fontFamily: "inherit",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#3b82f6";
                    e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e2e8f0";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              <div style={{ marginBottom: "1.25rem" }}>
                <label style={{
                  display: "block",
                  fontWeight: "600",
                  marginBottom: "0.6rem",
                  color: "#334155",
                  fontSize: "0.9rem",
                }}>
                  Confirm Password <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  type="password"
                  name="confirm_password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  required
                  style={{
                    width: "100%",
                    padding: "0.875rem 1.125rem",
                    border: "2px solid #e2e8f0",
                    borderRadius: "12px",
                    fontSize: "0.95rem",
                    transition: "all 0.2s ease",
                    outline: "none",
                    boxSizing: "border-box",
                    fontFamily: "inherit",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#3b82f6";
                    e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e2e8f0";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
            </div>

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                style={{
                  flex: "1 1 140px",
                  padding: "1rem",
                  border: "2px solid #e2e8f0",
                  borderRadius: "12px",
                  background: "white",
                  color: "#64748b",
                  fontSize: "1rem",
                  fontWeight: "700",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#cbd5e1";
                  e.target.style.background = "#f8fafc";
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#e2e8f0";
                  e.target.style.background = "white";
                }}
              >
                Back
              </button>
              <button 
                type="submit"
                style={{
                  flex: "1 1 200px",
                  padding: "1rem",
                  background: "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)",
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  fontSize: "1rem",
                  fontWeight: "700",
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  boxShadow: "0 4px 12px rgba(30, 64, 175, 0.3)",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 8px 20px rgba(30, 64, 175, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 4px 12px rgba(30, 64, 175, 0.3)";
                }}
              >
                Continue to Details
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Company and Business Details */}
        {currentStep === 3 && (
          <form onSubmit={handleStep3Submit} style={{ maxHeight: "520px", overflowY: "auto", paddingRight: "10px" }}>
            <div style={{ marginBottom: "1.5rem" }}>
              <h2 style={{
                fontSize: "clamp(1.1rem, 3vw, 1.3rem)",
                fontWeight: "700",
                marginBottom: "1.5rem",
                color: "#1e293b",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}>
                <div style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <i className="fas fa-building" style={{ color: "#1e40af", fontSize: "1rem" }}></i>
                </div>
                Company Details
              </h2>

              <div style={{ marginBottom: "1.25rem" }}>
                <label style={{
                  display: "block",
                  fontWeight: "600",
                  marginBottom: "0.6rem",
                  color: "#334155",
                  fontSize: "0.9rem",
                }}>
                  Company Name <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  type="text"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleChange}
                  placeholder="Enter your company name"
                  required
                  style={{
                    width: "100%",
                    padding: "0.875rem 1.125rem",
                    border: "2px solid #e2e8f0",
                    borderRadius: "12px",
                    fontSize: "0.95rem",
                    transition: "all 0.2s ease",
                    outline: "none",
                    boxSizing: "border-box",
                    fontFamily: "inherit",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#3b82f6";
                    e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e2e8f0";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "1.25rem" }}>
                <div>
                  <label style={{
                    display: "block",
                    fontWeight: "600",
                    marginBottom: "0.6rem",
                    color: "#334155",
                    fontSize: "0.9rem",
                  }}>
                    Company Type <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <select
                    name="company_type"
                    value={formData.company_type}
                    onChange={handleChange}
                    required
                    style={{
                      width: "100%",
                      padding: "0.875rem 1.125rem",
                      border: "2px solid #e2e8f0",
                      borderRadius: "12px",
                      fontSize: "0.95rem",
                      transition: "all 0.2s ease",
                      outline: "none",
                      boxSizing: "border-box",
                      background: "white",
                      fontFamily: "inherit",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#3b82f6";
                      e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#e2e8f0";
                      e.target.style.boxShadow = "none";
                    }}
                  >
                    <option value="">Select Type</option>
                    <option value="NBFC">NBFC</option>
                    <option value="Bank">Bank</option>
                    <option value="Fintech">Fintech</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label style={{
                    display: "block",
                    fontWeight: "600",
                    marginBottom: "0.6rem",
                    color: "#334155",
                    fontSize: "0.9rem",
                  }}>
                    Organisation Type <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <select
                    name="organisation_type"
                    value={formData.organisation_type}
                    onChange={handleChange}
                    required
                    style={{
                      width: "100%",
                      padding: "0.875rem 1.125rem",
                      border: "2px solid #e2e8f0",
                      borderRadius: "12px",
                      fontSize: "0.95rem",
                      transition: "all 0.2s ease",
                      outline: "none",
                      boxSizing: "border-box",
                      background: "white",
                      fontFamily: "inherit",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#3b82f6";
                      e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#e2e8f0";
                      e.target.style.boxShadow = "none";
                    }}
                  >
                    <option value="">Select Type</option>
                    <option value="Private Limited">Private Limited</option>
                    <option value="LLP">LLP</option>
                    <option value="Proprietorship">Proprietorship</option>
                    <option value="Partnership">Partnership</option>
                  </select>
                </div>
              </div>

              {formData.organisation_type === "Proprietorship" ? (
                <div style={{ marginBottom: "1.25rem" }}>
                  <label style={{
                    display: "block",
                    fontWeight: "600",
                    marginBottom: "0.6rem",
                    color: "#334155",
                    fontSize: "0.9rem",
                  }}>
                    Owner PAN <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="owner_pan"
                    value={formData.owner_pan}
                    onChange={handleChange}
                    placeholder="ABCDE1234F"
                    maxLength={10}
                    required
                    style={{
                      width: "100%",
                      padding: "0.875rem 1.125rem",
                      border: "2px solid #e2e8f0",
                      borderRadius: "12px",
                      fontSize: "0.95rem",
                      transition: "all 0.2s ease",
                      outline: "none",
                      boxSizing: "border-box",
                      fontFamily: "inherit",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#3b82f6";
                      e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#e2e8f0";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>
              ) : (
                <div style={{ marginBottom: "1.25rem" }}>
                  <label style={{
                    display: "block",
                    fontWeight: "600",
                    marginBottom: "0.6rem",
                    color: "#334155",
                    fontSize: "0.9rem",
                  }}>
                    Company PAN <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="company_pan"
                    value={formData.company_pan}
                    onChange={handleChange}
                    placeholder="ABCDE1234F"
                    maxLength={10}
                    required
                    style={{
                      width: "100%",
                      padding: "0.875rem 1.125rem",
                      border: "2px solid #e2e8f0",
                      borderRadius: "12px",
                      fontSize: "0.95rem",
                      transition: "all 0.2s ease",
                      outline: "none",
                      boxSizing: "border-box",
                      fontFamily: "inherit",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#3b82f6";
                      e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#e2e8f0";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>
              )}

              <div style={{ marginBottom: "1.25rem" }}>
                <label style={{
                  display: "block",
                  fontWeight: "600",
                  marginBottom: "0.6rem",
                  color: "#334155",
                  fontSize: "0.9rem",
                }}>
                  GST Number <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  type="text"
                  name="gst_number"
                  value={formData.gst_number}
                  onChange={handleChange}
                  placeholder="27AAAAA0000A1Z5"
                  maxLength={15}
                  required
                  style={{
                    width: "100%",
                    padding: "0.875rem 1.125rem",
                    border: "2px solid #e2e8f0",
                    borderRadius: "12px",
                    fontSize: "0.95rem",
                    transition: "all 0.2s ease",
                    outline: "none",
                    boxSizing: "border-box",
                    fontFamily: "inherit",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#3b82f6";
                    e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e2e8f0";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "1.25rem" }}>
                <div>
                  <label style={{
                    display: "block",
                    fontWeight: "600",
                    marginBottom: "0.6rem",
                    color: "#334155",
                    fontSize: "0.9rem",
                  }}>
                    Number of Users <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <input
                    type="number"
                    name="number_of_users"
                    value={formData.number_of_users}
                    onChange={handleChange}
                    placeholder="e.g., 10"
                    min="1"
                    required
                    style={{
                      width: "100%",
                      padding: "0.875rem 1.125rem",
                      border: "2px solid #e2e8f0",
                      borderRadius: "12px",
                      fontSize: "0.95rem",
                      transition: "all 0.2s ease",
                      outline: "none",
                      boxSizing: "border-box",
                      fontFamily: "inherit",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#3b82f6";
                      e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#e2e8f0";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: "block",
                    fontWeight: "600",
                    marginBottom: "0.6rem",
                    color: "#334155",
                    fontSize: "0.9rem",
                  }}>
                    Current AUM <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="current_aum"
                    value={formData.current_aum}
                    onChange={handleChange}
                    placeholder="e.g., 50 Crores"
                    required
                    style={{
                      width: "100%",
                      padding: "0.875rem 1.125rem",
                      border: "2px solid #e2e8f0",
                      borderRadius: "12px",
                      fontSize: "0.95rem",
                      transition: "all 0.2s ease",
                      outline: "none",
                      boxSizing: "border-box",
                      fontFamily: "inherit",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#3b82f6";
                      e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#e2e8f0";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: "1.25rem" }} ref={dropdownRef}>
                <label style={{
                  display: "block",
                  fontWeight: "600",
                  marginBottom: "0.6rem",
                  color: "#334155",
                  fontSize: "0.9rem",
                }}>
                  Loan Products <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <div style={{ position: "relative" }}>
                  <div
                    onClick={toggleLoanProductsDropdown}
                    style={{
                      width: "100%",
                      padding: "0.875rem 1.125rem",
                      border: "2px solid #e2e8f0",
                      borderRadius: "12px",
                      fontSize: "0.95rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: "0.5rem",
                      minHeight: "52px",
                      boxSizing: "border-box",
                      background: "white",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {formData.loan_products.length > 0 ? (
                      formData.loan_products.map((product, index) => (
                        <span key={index} style={{
                          background: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
                          color: "#1e40af",
                          borderRadius: "20px",
                          padding: "0.35rem 0.85rem",
                          fontSize: "0.85rem",
                          fontWeight: "600",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                        }}>
                          {product}
                          <i
                            className="fas fa-times"
                            style={{ cursor: "pointer", fontSize: "0.75rem" }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleLoanProductToggle(product);
                            }}
                          ></i>
                        </span>
                      ))
                    ) : (
                      <span style={{ color: "#94a3b8" }}>Select loan products...</span>
                    )}
                    <i
                      className={`fas fa-chevron-${loanProductsDropdownOpen ? "up" : "down"}`}
                      style={{
                        position: "absolute",
                        right: "1.125rem",
                        color: "#64748b",
                        pointerEvents: "none",
                      }}
                    ></i>
                  </div>
                  {loanProductsDropdownOpen && (
                    <div style={{
                      position: "absolute",
                      top: "calc(100% + 0.5rem)",
                      left: "0",
                      right: "0",
                      background: "white",
                      border: "2px solid #e2e8f0",
                      borderRadius: "12px",
                      maxHeight: "200px",
                      overflowY: "auto",
                      zIndex: "10",
                      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                    }}>
                      {loanProductsOptions.map((product, index) => (
                        <div
                          key={index}
                          onClick={() => handleLoanProductToggle(product)}
                          style={{
                            padding: "0.875rem 1.125rem",
                            cursor: "pointer",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            background: formData.loan_products.includes(product) 
                              ? "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)" 
                              : "white",
                            color: formData.loan_products.includes(product) ? "#1e40af" : "#334155",
                            fontWeight: formData.loan_products.includes(product) ? "600" : "normal",
                            transition: "all 0.2s ease",
                          }}
                          onMouseEnter={(e) => {
                            if (!formData.loan_products.includes(product)) {
                              e.target.style.background = "#f8fafc";
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!formData.loan_products.includes(product)) {
                              e.target.style.background = "white";
                            }
                          }}
                        >
                          {product}
                          {formData.loan_products.includes(product) && (
                            <i className="fas fa-check"></i>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Address Section */}
              <h3 style={{
                fontSize: "clamp(1rem, 2.5vw, 1.15rem)",
                fontWeight: "700",
                marginTop: "2rem",
                marginBottom: "1rem",
                color: "#1e293b",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}>
                <div style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  background: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <i className="fas fa-map-marker-alt" style={{ color: "#1e40af", fontSize: "0.9rem" }}></i>
                </div>
                Business Address
              </h3>

              <div style={{ marginBottom: "1.25rem" }}>
                <label style={{
                  display: "block",
                  fontWeight: "600",
                  marginBottom: "0.6rem",
                  color: "#334155",
                  fontSize: "0.9rem",
                }}>
                  Address Line 1 <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  type="text"
                  name="address_line1"
                  value={formData.address_line1}
                  onChange={handleChange}
                  placeholder="Street address"
                  required
                  style={{
                    width: "100%",
                    padding: "0.875rem 1.125rem",
                    border: "2px solid #e2e8f0",
                    borderRadius: "12px",
                    fontSize: "0.95rem",
                    transition: "all 0.2s ease",
                    outline: "none",
                    boxSizing: "border-box",
                    fontFamily: "inherit",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#3b82f6";
                    e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e2e8f0";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              <div style={{ marginBottom: "1.25rem" }}>
                <label style={{
                  display: "block",
                  fontWeight: "600",
                  marginBottom: "0.6rem",
                  color: "#334155",
                  fontSize: "0.9rem",
                }}>
                  Address Line 2
                </label>
                <input
                  type="text"
                  name="address_line2"
                  value={formData.address_line2}
                  onChange={handleChange}
                  placeholder="Apartment, suite, etc. (optional)"
                  style={{
                    width: "100%",
                    padding: "0.875rem 1.125rem",
                    border: "2px solid #e2e8f0",
                    borderRadius: "12px",
                    fontSize: "0.95rem",
                    transition: "all 0.2s ease",
                    outline: "none",
                    boxSizing: "border-box",
                    fontFamily: "inherit",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#3b82f6";
                    e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e2e8f0";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "1.25rem" }}>
                <div>
                  <label style={{
                    display: "block",
                    fontWeight: "600",
                    marginBottom: "0.6rem",
                    color: "#334155",
                    fontSize: "0.9rem",
                  }}>
                    City <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    required
                    style={{
                      width: "100%",
                      padding: "0.875rem 1.125rem",
                      border: "2px solid #e2e8f0",
                      borderRadius: "12px",
                      fontSize: "0.95rem",
                      transition: "all 0.2s ease",
                      outline: "none",
                      boxSizing: "border-box",
                      fontFamily: "inherit",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#3b82f6";
                      e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#e2e8f0";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: "block",
                    fontWeight: "600",
                    marginBottom: "0.6rem",
                    color: "#334155",
                    fontSize: "0.9rem",
                  }}>
                    State <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                    required
                    style={{
                      width: "100%",
                      padding: "0.875rem 1.125rem",
                      border: "2px solid #e2e8f0",
                      borderRadius: "12px",
                      fontSize: "0.95rem",
                      transition: "all 0.2s ease",
                      outline: "none",
                      boxSizing: "border-box",
                      fontFamily: "inherit",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#3b82f6";
                      e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#e2e8f0";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "1.25rem" }}>
                <div>
                  <label style={{
                    display: "block",
                    fontWeight: "600",
                    marginBottom: "0.6rem",
                    color: "#334155",
                    fontSize: "0.9rem",
                  }}>
                    Pincode <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="Postal code"
                    required
                    style={{
                      width: "100%",
                      padding: "0.875rem 1.125rem",
                      border: "2px solid #e2e8f0",
                      borderRadius: "12px",
                      fontSize: "0.95rem",
                      transition: "all 0.2s ease",
                      outline: "none",
                      boxSizing: "border-box",
                      fontFamily: "inherit",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#3b82f6";
                      e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#e2e8f0";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: "block",
                    fontWeight: "600",
                    marginBottom: "0.6rem",
                    color: "#334155",
                    fontSize: "0.9rem",
                  }}>
                    Country <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Country"
                    required
                    style={{
                      width: "100%",
                      padding: "0.875rem 1.125rem",
                      border: "2px solid #e2e8f0",
                      borderRadius: "12px",
                      fontSize: "0.95rem",
                      transition: "all 0.2s ease",
                      outline: "none",
                      boxSizing: "border-box",
                      fontFamily: "inherit",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#3b82f6";
                      e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#e2e8f0";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>
              </div>

              {/* Branch Requirements */}
              <h3 style={{
                fontSize: "clamp(1rem, 2.5vw, 1.15rem)",
                fontWeight: "700",
                marginTop: "2rem",
                marginBottom: "1rem",
                color: "#1e293b",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}>
                <div style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  background: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <i className="fas fa-code-branch" style={{ color: "#1e40af", fontSize: "0.9rem" }}></i>
                </div>
                Branch Requirements
              </h3>

              <div style={{ marginBottom: "1.25rem" }}>
                <label style={{
                  display: "block",
                  fontWeight: "600",
                  marginBottom: "0.6rem",
                  color: "#334155",
                  fontSize: "0.9rem",
                }}>
                  Do you require branches? <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <select
                  name="require_branches"
                  value={formData.require_branches}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    padding: "0.875rem 1.125rem",
                    border: "2px solid #e2e8f0",
                    borderRadius: "12px",
                    fontSize: "0.95rem",
                    transition: "all 0.2s ease",
                    outline: "none",
                    boxSizing: "border-box",
                    background: "white",
                    fontFamily: "inherit",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#3b82f6";
                    e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e2e8f0";
                    e.target.style.boxShadow = "none";
                  }}
                >
                  <option value="">Select...</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              {formData.require_branches === "Yes" && (
                <div style={{ marginBottom: "1.25rem" }}>
                  <label style={{
                    display: "block",
                    fontWeight: "600",
                    marginBottom: "0.6rem",
                    color: "#334155",
                    fontSize: "0.9rem",
                  }}>
                    Number of Branches <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <input
                    type="number"
                    name="number_of_branches"
                    value={formData.number_of_branches}
                    onChange={handleChange}
                    placeholder="e.g., 5"
                    min="1"
                    required
                    style={{
                      width: "100%",
                      padding: "0.875rem 1.125rem",
                      border: "2px solid #e2e8f0",
                      borderRadius: "12px",
                      fontSize: "0.95rem",
                      transition: "all 0.2s ease",
                      outline: "none",
                      boxSizing: "border-box",
                      fontFamily: "inherit",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#3b82f6";
                      e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#e2e8f0";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>
              )}
            </div>

            <div style={{ display: "flex", gap: "1rem", position: "sticky", bottom: 0, background: "white", paddingTop: "1rem", flexWrap: "wrap" }}>
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                style={{
                  flex: "1 1 140px",
                  padding: "1rem",
                  border: "2px solid #e2e8f0",
                  borderRadius: "12px",
                  background: "white",
                  color: "#64748b",
                  fontSize: "1rem",
                  fontWeight: "700",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#cbd5e1";
                  e.target.style.background = "#f8fafc";
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#e2e8f0";
                  e.target.style.background = "white";
                }}
              >
                Back
              </button>
              <button 
                type="submit"
                style={{
                  flex: "1 1 200px",
                  padding: "1rem",
                  background: "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)",
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  fontSize: "1rem",
                  fontWeight: "700",
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  boxShadow: "0 4px 12px rgba(30, 64, 175, 0.3)",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 8px 20px rgba(30, 64, 175, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 4px 12px rgba(30, 64, 175, 0.3)";
                }}
              >
                Continue to Verification
              </button>
            </div>
          </form>
        )}

        {/* Step 4: OTP Verification */}
        {currentStep === 4 && (
          <form onSubmit={handleFinalSubmit}>
            <div style={{ marginBottom: "1.5rem" }}>
              <h2 style={{
                fontSize: "clamp(1.1rem, 3vw, 1.3rem)",
                fontWeight: "700",
                marginBottom: "1rem",
                color: "#1e293b",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}>
                <div style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <i className="fas fa-shield-alt" style={{ color: "#1e40af", fontSize: "1rem" }}></i>
                </div>
                Verify Your Contact
              </h2>
              <p style={{ 
                color: "#64748b", 
                marginBottom: "1.5rem",
                fontSize: "0.95rem",
                lineHeight: "1.6",
              }}>
                Click "Send OTP" to receive verification codes on your email and phone number.
              </p>

              <button
                type="button"
                onClick={handleSendOtp}
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "1rem",
                  border: "2px solid #1e40af",
                  borderRadius: "12px",
                  background: "white",
                  color: "#1e40af",
                  fontSize: "1rem",
                  fontWeight: "700",
                  cursor: loading ? "not-allowed" : "pointer",
                  marginBottom: "1.5rem",
                  transition: "all 0.2s ease",
                  opacity: loading ? 0.6 : 1,
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.target.style.background = "#eff6ff";
                  }
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "white";
                }}
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>

              <div style={{ marginBottom: "1.25rem" }}>
                <label style={{
                  display: "block",
                  fontWeight: "600",
                  marginBottom: "0.6rem",
                  color: "#334155",
                  fontSize: "0.9rem",
                }}>
                  Email OTP <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  type="text"
                  value={emailOtp}
                  onChange={(e) => setEmailOtp(e.target.value)}
                  placeholder="Enter 6-digit email OTP"
                  maxLength={6}
                  required
                  style={{
                    width: "100%",
                    padding: "0.875rem 1.125rem",
                    border: "2px solid #e2e8f0",
                    borderRadius: "12px",
                    fontSize: "0.95rem",
                    transition: "all 0.2s ease",
                    outline: "none",
                    boxSizing: "border-box",
                    textAlign: "center",
                    letterSpacing: "0.5rem",
                    fontWeight: "700",
                    fontFamily: "inherit",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#3b82f6";
                    e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e2e8f0";
                    e.target.style.boxShadow = "none";
                  }}
                />
                <div style={{ 
                  fontSize: "0.85rem", 
                  color: "#64748b", 
                  marginTop: "0.6rem",
                }}>
                  Sent to: <strong style={{ color: "#1e40af" }}>{formData.email}</strong>
                </div>
              </div>

              <div style={{ marginBottom: "1.25rem" }}>
                <label style={{
                  display: "block",
                  fontWeight: "600",
                  marginBottom: "0.6rem",
                  color: "#334155",
                  fontSize: "0.9rem",
                }}>
                  Phone OTP <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  type="text"
                  value={phoneOtp}
                  onChange={(e) => setPhoneOtp(e.target.value)}
                  placeholder="Enter 6-digit phone OTP"
                  maxLength={6}
                  required
                  style={{
                    width: "100%",
                    padding: "0.875rem 1.125rem",
                    border: "2px solid #e2e8f0",
                    borderRadius: "12px",
                    fontSize: "0.95rem",
                    transition: "all 0.2s ease",
                    outline: "none",
                    boxSizing: "border-box",
                    textAlign: "center",
                    letterSpacing: "0.5rem",
                    fontWeight: "700",
                    fontFamily: "inherit",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#3b82f6";
                    e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e2e8f0";
                    e.target.style.boxShadow = "none";
                  }}
                />
                <div style={{ 
                  fontSize: "0.85rem", 
                  color: "#64748b", 
                  marginTop: "0.6rem",
                }}>
                  Sent to: <strong style={{ color: "#1e40af" }}>{formData.phone_number}</strong>
                </div>
              </div>

              <button
                type="button"
                onClick={handleResendOtp}
                disabled={loading}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#1e40af",
                  cursor: loading ? "not-allowed" : "pointer",
                  padding: "0.5rem 0",
                  fontSize: "0.9rem",
                  textDecoration: "underline",
                  fontWeight: "600",
                  opacity: loading ? 0.6 : 1,
                }}
              >
                Resend OTP
              </button>
            </div>

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                style={{
                  flex: "1 1 140px",
                  padding: "1rem",
                  border: "2px solid #e2e8f0",
                  borderRadius: "12px",
                  background: "white",
                  color: "#64748b",
                  fontSize: "1rem",
                  fontWeight: "700",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#cbd5e1";
                  e.target.style.background = "#f8fafc";
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#e2e8f0";
                  e.target.style.background = "white";
                }}
              >
                Back
              </button>
              <button 
                type="submit"
                disabled={loading}
                style={{
                  flex: "1 1 200px",
                  padding: "1rem",
                  background: loading 
                    ? "#94a3b8" 
                    : "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)",
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  fontSize: "1rem",
                  fontWeight: "700",
                  cursor: loading ? "not-allowed" : "pointer",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  boxShadow: loading ? "none" : "0 4px 12px rgba(30, 64, 175, 0.3)",
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow = "0 8px 20px rgba(30, 64, 175, 0.4)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "0 4px 12px rgba(30, 64, 175, 0.3)";
                  }
                }}
              >
                {loading ? "Submitting..." : "Verify & Create Account"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignUp;




// import React, { useState, useRef, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";

// const SignUp = () => {
//   const navigate = useNavigate();
  
//   // State to manage all form fields
//   const [formData, setFormData] = useState({
//     // Page 1: Basic Contact Information
//     full_name: "",
//     email: "",
//     phone_number: "",
    
//     // Page 2: Password
//     password: "",
//     confirm_password: "",
    
//     // Page 3: Company and Business Details
//     company_name: "",
//     company_type: "", // NBFC/Bank/Fintech/Other
//     organisation_type: "", // Private Limited/LLP/Proprietorship/Partnership
//     company_pan: "",
//     owner_pan: "",
//     gst_number: "",
//     number_of_users: "",
//     current_aum: "",
//     loan_products: [], // Multi-select
    
//     // Address
//     address_line1: "",
//     address_line2: "",
//     city: "",
//     state: "",
//     pincode: "",
//     country: "",
    
//     // Branches
//     require_branches: "", // Yes/No
//     number_of_branches: "",
//   });

//   // State for loading, error, and step management
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [currentStep, setCurrentStep] = useState(1); // 1, 2, 3, or 4 (OTP verification)
//   const [emailOtp, setEmailOtp] = useState("");
//   const [phoneOtp, setPhoneOtp] = useState("");

//   // State for loan products dropdown
//   const [loanProductsDropdownOpen, setLoanProductsDropdownOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   // Available loan products
//   const loanProductsOptions = [
//     "Working Capital",
//     "Equipment Financing",
//     "Line of Credit",
//     "Merchant Cash Advance",
//     "Term Loan",
//     "Invoice Financing",
//   ];

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setLoanProductsDropdownOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   // Generic handler for input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     let newValue = value;
    
//     // Normalize certain identifier fields
//     if (name === "company_pan" || name === "owner_pan" || name === "gst_number") {
//       newValue = value.toUpperCase();
//     }

//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: newValue,
//     }));
    
//     // Clear error when user types
//     if (error) setError("");
//   };

//   // Handler for loan products multi-select
//   const handleLoanProductToggle = (product) => {
//     setFormData((prevState) => {
//       const loanProducts = [...prevState.loan_products];
//       const index = loanProducts.indexOf(product);

//       if (index > -1) {
//         loanProducts.splice(index, 1);
//       } else {
//         loanProducts.push(product);
//       }

//       return {
//         ...prevState,
//         loan_products: loanProducts,
//       };
//     });
//   };

//   // Toggle dropdown open/close
//   const toggleLoanProductsDropdown = () => {
//     setLoanProductsDropdownOpen(!loanProductsDropdownOpen);
//   };

//   // Validation functions
//   const validateStep1 = () => {
//     const errors = [];
//     if (!formData.full_name || formData.full_name.trim() === "") {
//       errors.push("Full name is required.");
//     }
//     if (!formData.email || formData.email.trim() === "") {
//       errors.push("Email is required.");
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       errors.push("Please enter a valid email address.");
//     }
//     if (!formData.phone_number || formData.phone_number.trim() === "") {
//       errors.push("Phone number is required.");
//     } else if (!/^\d{10}$|^\+\d{10,}$|^\+91\d{10}$/.test(formData.phone_number.replace(/\s+/g, ""))) {
//       errors.push("Phone number must be 10 digits or include country code (e.g., +919876543210).");
//     }
//     return errors;
//   };

//   const validateStep2 = () => {
//     const errors = [];
//     if (!formData.password || formData.password.trim() === "") {
//       errors.push("Password is required.");
//     } else if (formData.password.length < 8) {
//       errors.push("Password must be at least 8 characters long.");
//     }
//     if (!formData.confirm_password || formData.confirm_password.trim() === "") {
//       errors.push("Please confirm your password.");
//     }
//     if (formData.password !== formData.confirm_password) {
//       errors.push("Passwords do not match.");
//     }
//     return errors;
//   };

//   const validateStep3 = () => {
//     const errors = [];
//     const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/i;
//     const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/i;

//     if (!formData.company_name || formData.company_name.trim() === "") {
//       errors.push("Company name is required.");
//     }
//     if (!formData.company_type || formData.company_type.trim() === "") {
//       errors.push("Company type is required.");
//     }
//     if (!formData.organisation_type || formData.organisation_type.trim() === "") {
//       errors.push("Organisation type is required.");
//     }

//     // PAN validation based on organisation type
//     if (formData.organisation_type === "Proprietorship") {
//       if (!formData.owner_pan || formData.owner_pan.trim() === "") {
//         errors.push("Owner PAN is required for Proprietorship.");
//       } else if (!panRegex.test(formData.owner_pan.toUpperCase())) {
//         errors.push("Owner PAN format is invalid (expected: 5 letters, 4 digits, 1 letter).");
//       }
//     } else {
//       if (!formData.company_pan || formData.company_pan.trim() === "") {
//         errors.push("Company PAN is required.");
//       } else if (!panRegex.test(formData.company_pan.toUpperCase())) {
//         errors.push("Company PAN format is invalid (expected: 5 letters, 4 digits, 1 letter).");
//       }
//     }

//     if (!formData.gst_number || formData.gst_number.trim() === "") {
//       errors.push("GST Number is required.");
//     } else if (!gstRegex.test(formData.gst_number.toUpperCase())) {
//       errors.push("GST Number format is invalid (expected 15 characters, e.g., 27AAAAA0000A1Z5).");
//     }

//     if (!formData.number_of_users || formData.number_of_users.trim() === "") {
//       errors.push("Number of users required is mandatory.");
//     }
//     if (!formData.current_aum || formData.current_aum.trim() === "") {
//       errors.push("Current AUM is required.");
//     }
//     if (!formData.loan_products || formData.loan_products.length === 0) {
//       errors.push("Please select at least one loan product.");
//     }

//     // Address validation
//     if (!formData.address_line1 || formData.address_line1.trim() === "") {
//       errors.push("Address Line 1 is required.");
//     }
//     if (!formData.city || formData.city.trim() === "") {
//       errors.push("City is required.");
//     }
//     if (!formData.state || formData.state.trim() === "") {
//       errors.push("State is required.");
//     }
//     if (!formData.pincode || formData.pincode.trim() === "") {
//       errors.push("Pincode is required.");
//     }
//     if (!formData.country || formData.country.trim() === "") {
//       errors.push("Country is required.");
//     }

//     // Branches validation
//     if (!formData.require_branches || formData.require_branches.trim() === "") {
//       errors.push("Please specify if you require branches.");
//     }
//     if (formData.require_branches === "Yes") {
//       if (!formData.number_of_branches || formData.number_of_branches.trim() === "") {
//         errors.push("Number of branches is required.");
//       }
//     }

//     return errors;
//   };

//   const validateOtp = () => {
//     const errors = [];
//     if (!emailOtp || emailOtp.trim() === "") {
//       errors.push("Email OTP is required.");
//     }
//     if (!phoneOtp || phoneOtp.trim() === "") {
//       errors.push("Phone OTP is required.");
//     }
//     return errors;
//   };

//   // Handle Step 1 submission (move to step 2)
//   const handleStep1Submit = (e) => {
//     e.preventDefault();
//     setError("");

//     const validationErrors = validateStep1();
//     if (validationErrors.length > 0) {
//       setError(validationErrors.join(" "));
//       return;
//     }

//     setCurrentStep(2);
//   };

//   // Handle Step 2 (Password) submission (move to step 3)
//   const handleStep2Submit = (e) => {
//     e.preventDefault();
//     setError("");

//     const validationErrors = validateStep2();
//     if (validationErrors.length > 0) {
//       setError(validationErrors.join(" "));
//       return;
//     }

//     setCurrentStep(3);
//   };

//   // Handle Step 3 submission (validate and move to OTP step)
//   const handleStep3Submit = (e) => {
//     e.preventDefault();
//     setError("");

//     const validationErrors = validateStep3();
//     if (validationErrors.length > 0) {
//       setError(validationErrors.join(" "));
//       return;
//     }

//     // Move to OTP verification step
//     setCurrentStep(4);
//   };

//   // Handle sending OTP
//   const handleSendOtp = async () => {
//     setLoading(true);
//     setError("");

//     try {
//       // Format phone number for backend
//       let formattedPhone = formData.phone_number.replace(/\s+/g, "").replace(/[^+\d]/g, "");
//       if (!formattedPhone.startsWith("+")) {
//         formattedPhone = formattedPhone.length === 10 ? `+91${formattedPhone}` : `+${formattedPhone}`;
//       }

//       const payload = {
//         email: formData.email,
//         mobile_no: formattedPhone,
//       };

//       console.log("Sending OTP request with:", payload);

//       const response = await fetch("http://localhost:8000/auth/send-otp/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.error || `Failed to send OTP (Status: ${response.status})`);
//       }

//       alert("OTP sent successfully to your email and phone!");
//       console.log("OTP sent successfully");
//     } catch (err) {
//       console.error("Send OTP error:", err);
//       setError(err.message || "Failed to send OTP. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle OTP verification and final registration
//   const handleFinalSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     const validationErrors = validateOtp();
//     if (validationErrors.length > 0) {
//       setError(validationErrors.join(" "));
//       setLoading(false);
//       return;
//     }

//     try {
//       // Format phone number
//       let formattedPhone = formData.phone_number.replace(/\s+/g, "").replace(/[^+\d]/g, "");
//       if (!formattedPhone.startsWith("+")) {
//         formattedPhone = formattedPhone.length === 10 ? `+91${formattedPhone}` : `+${formattedPhone}`;
//       }

//       // Step 1: Verify OTP
//       const verifyResponse = await fetch("http://localhost:8000/auth/verify-otp", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           mobile: formattedPhone,
//           otp: phoneOtp,
//         }),
//       });

//       const verifyData = await verifyResponse.json();

//       if (!verifyResponse.ok) {
//         throw new Error(verifyData.error || "Invalid OTP");
//       }

//       console.log("OTP verified successfully");

//       // Step 2: Register user
//       const payload = {
//         contact_person: formData.full_name,
//         email: formData.email,
//         mobile_no: formattedPhone,
//         business_name: formData.company_name,
//         business_type: formData.organisation_type,
//         business_pan: formData.organisation_type !== "Proprietorship" ? formData.company_pan : "",
//         owner_pan: formData.organisation_type === "Proprietorship" ? formData.owner_pan : "",
//         gst_number: formData.gst_number,
//         password: formData.password,
//         address_line1: formData.address_line1,
//         address_line2: formData.address_line2,
//         city: formData.city,
//         state: formData.state,
//         pincode: formData.pincode,
//         country: formData.country,
//         loan_product: formData.loan_products,
//         status: "Active",
//         // Additional fields
//         company_type: formData.company_type,
//         number_of_users: formData.number_of_users,
//         current_aum: formData.current_aum,
//         require_branches: formData.require_branches,
//         number_of_branches: formData.require_branches === "Yes" ? formData.number_of_branches : "0",
//       };

//       console.log("Final registration payload:", payload);

//       const registerResponse = await fetch("http://localhost:8000/auth/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const registerData = await registerResponse.json();

//       if (!registerResponse.ok) {
//         throw new Error(registerData.error || "Registration failed");
//       }

//       // Registration successful
//       alert("Registration successful! Redirecting to login...");
//       setTimeout(() => navigate("/login"), 1500);
//     } catch (err) {
//       console.error("Registration error:", err);
//       setError(err.message || "Registration failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle resend OTP
//   const handleResendOtp = async () => {
//     await handleSendOtp();
//   };

//   return (
//     <div style={{
//       minHeight: "100vh",
//       background: "linear-gradient(135deg, #f8fbff 0%, #e0e7ff 100%)",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       padding: "2rem 1rem",
//     }}>
//       <div style={{
//         maxWidth: "600px",
//         width: "100%",
//         background: "white",
//         borderRadius: "20px",
//         boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
//         padding: "2.5rem",
//       }}>
//         {/* Header */}
//         <div style={{ textAlign: "center", marginBottom: "2rem" }}>
//           <div style={{
//             width: "70px",
//             height: "70px",
//             background: "linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)",
//             borderRadius: "50%",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             margin: "0 auto 1.5rem",
//             boxShadow: "0 4px 15px rgba(29, 78, 216, 0.4)",
//           }}>
//             <i className="fas fa-user-plus" style={{ fontSize: "2rem", color: "white" }}></i>
//           </div>
//           <h1 style={{
//             fontSize: "2rem",
//             fontWeight: "700",
//             background: "linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)",
//             WebkitBackgroundClip: "text",
//             WebkitTextFillColor: "transparent",
//             marginBottom: "0.5rem",
//           }}>
//             Create Your Account
//           </h1>
//           <p style={{ color: "#6b7280", fontSize: "0.95rem" }}>
//             Register your organization to get started
//           </p>
//         </div>

//         {/* Step Progress Indicator */}
//         <div style={{ 
//           display: "flex", 
//           justifyContent: "space-between", 
//           alignItems: "center", 
//           margin: "2rem 0",
//           position: "relative",
//         }}>
//           {/* Progress Line Background */}
//           <div style={{
//             position: "absolute",
//             top: "16px",
//             left: "0",
//             right: "0",
//             height: "3px",
//             background: "#e5e7eb",
//             zIndex: "0",
//           }}></div>
          
//           {/* Active Progress Line */}
//           <div style={{
//             position: "absolute",
//             top: "16px",
//             left: "0",
//             width: `${((currentStep - 1) / 3) * 100}%`,
//             height: "3px",
//             background: "linear-gradient(90deg, #1d4ed8 0%, #3b82f6 100%)",
//             transition: "width 0.3s ease",
//             zIndex: "1",
//           }}></div>

//           {[1, 2, 3, 4].map((step) => (
//             <div key={step} style={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               zIndex: "2",
//               position: "relative",
//             }}>
//               <div style={{
//                 width: "36px",
//                 height: "36px",
//                 borderRadius: "50%",
//                 background: currentStep >= step 
//                   ? "linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)" 
//                   : "#e5e7eb",
//                 color: currentStep >= step ? "white" : "#9ca3af",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontWeight: "bold",
//                 fontSize: "0.9rem",
//                 boxShadow: currentStep >= step ? "0 4px 10px rgba(29, 78, 216, 0.3)" : "none",
//                 transition: "all 0.3s ease",
//               }}>
//                 {step}
//               </div>
//               <span style={{ 
//                 fontSize: "0.75rem", 
//                 color: currentStep >= step ? "#1d4ed8" : "#9ca3af",
//                 fontWeight: currentStep === step ? "600" : "normal",
//                 marginTop: "0.5rem",
//                 textAlign: "center",
//               }}>
//                 {step === 1 && "Contact"}
//                 {step === 2 && "Password"}
//                 {step === 3 && "Details"}
//                 {step === 4 && "Verify"}
//               </span>
//             </div>
//           ))}
//         </div>

//         {/* Error Message */}
//         {error && (
//           <div style={{
//             background: "#fef2f2",
//             border: "1px solid #fecaca",
//             color: "#dc2626",
//             padding: "1rem",
//             borderRadius: "10px",
//             marginBottom: "1.5rem",
//             fontSize: "0.9rem",
//             display: "flex",
//             alignItems: "flex-start",
//             gap: "0.5rem",
//           }}>
//             <i className="fas fa-exclamation-circle" style={{ marginTop: "2px" }}></i>
//             <span>{error}</span>
//           </div>
//         )}

//         {/* Step 1: Basic Contact Information */}
//         {currentStep === 1 && (
//           <form onSubmit={handleStep1Submit}>
//             <div style={{ marginBottom: "1.5rem" }}>
//               <h2 style={{
//                 fontSize: "1.2rem",
//                 fontWeight: "600",
//                 marginBottom: "1.5rem",
//                 color: "#1f2937",
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "0.5rem",
//               }}>
//                 <i className="fas fa-user" style={{ color: "#1d4ed8" }}></i>
//                 Basic Contact Information
//               </h2>
              
//               <div style={{ marginBottom: "1.25rem" }}>
//                 <label style={{
//                   display: "block",
//                   fontWeight: "500",
//                   marginBottom: "0.5rem",
//                   color: "#374151",
//                   fontSize: "0.9rem",
//                 }}>
//                   Full Name <span style={{ color: "#dc2626" }}>*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="full_name"
//                   value={formData.full_name}
//                   onChange={handleChange}
//                   placeholder="Enter your full name"
//                   required
//                   style={{
//                     width: "100%",
//                     padding: "0.75rem 1rem",
//                     border: "2px solid #e5e7eb",
//                     borderRadius: "10px",
//                     fontSize: "0.95rem",
//                     transition: "all 0.2s ease",
//                     outline: "none",
//                     boxSizing: "border-box",
//                   }}
//                   onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
//                   onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
//                 />
//               </div>

//               <div style={{ marginBottom: "1.25rem" }}>
//                 <label style={{
//                   display: "block",
//                   fontWeight: "500",
//                   marginBottom: "0.5rem",
//                   color: "#374151",
//                   fontSize: "0.9rem",
//                 }}>
//                   Email Address <span style={{ color: "#dc2626" }}>*</span>
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="your.email@company.com"
//                   required
//                   style={{
//                     width: "100%",
//                     padding: "0.75rem 1rem",
//                     border: "2px solid #e5e7eb",
//                     borderRadius: "10px",
//                     fontSize: "0.95rem",
//                     transition: "all 0.2s ease",
//                     outline: "none",
//                     boxSizing: "border-box",
//                   }}
//                   onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
//                   onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
//                 />
//               </div>

//               <div style={{ marginBottom: "1.25rem" }}>
//                 <label style={{
//                   display: "block",
//                   fontWeight: "500",
//                   marginBottom: "0.5rem",
//                   color: "#374151",
//                   fontSize: "0.9rem",
//                 }}>
//                   Phone Number <span style={{ color: "#dc2626" }}>*</span>
//                 </label>
//                 <input
//                   type="tel"
//                   name="phone_number"
//                   value={formData.phone_number}
//                   onChange={handleChange}
//                   placeholder="+91 9876543210"
//                   required
//                   style={{
//                     width: "100%",
//                     padding: "0.75rem 1rem",
//                     border: "2px solid #e5e7eb",
//                     borderRadius: "10px",
//                     fontSize: "0.95rem",
//                     transition: "all 0.2s ease",
//                     outline: "none",
//                     boxSizing: "border-box",
//                   }}
//                   onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
//                   onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
//                 />
//               </div>
//             </div>

//             <button 
//               type="submit" 
//               className="bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
//               style={{
//                 width: "100%",
//                 padding: "0.875rem",
//                 background: "linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)",
//                 color: "white",
//                 border: "none",
//                 borderRadius: "10px",
//                 fontSize: "1rem",
//                 fontWeight: "600",
//                 cursor: "pointer",
//                 transition: "all 0.3s ease",
//                 boxShadow: "0 4px 15px rgba(29, 78, 216, 0.3)",
//               }}
//               onMouseEnter={(e) => {
//                 e.target.style.transform = "translateY(-2px)";
//                 e.target.style.boxShadow = "0 6px 20px rgba(29, 78, 216, 0.4)";
//               }}
//               onMouseLeave={(e) => {
//                 e.target.style.transform = "translateY(0)";
//                 e.target.style.boxShadow = "0 4px 15px rgba(29, 78, 216, 0.3)";
//               }}
//             >
//               Continue to Password
//             </button>
            
//             <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
//               <p style={{ color: "#6b7280", fontSize: "0.9rem" }}>
//                 Already have an account?{" "}
//                 <Link to="/login" style={{ 
//                   color: "#1d4ed8", 
//                   fontWeight: "600",
//                   textDecoration: "none",
//                 }}>
//                   Sign In
//                 </Link>
//               </p>
//             </div>
//           </form>
//         )}

//         {/* Step 2: Create Password */}
//         {currentStep === 2 && (
//           <form onSubmit={handleStep2Submit}>
//             <div style={{ marginBottom: "1.5rem" }}>
//               <h2 style={{
//                 fontSize: "1.2rem",
//                 fontWeight: "600",
//                 marginBottom: "1.5rem",
//                 color: "#1f2937",
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "0.5rem",
//               }}>
//                 <i className="fas fa-lock" style={{ color: "#1d4ed8" }}></i>
//                 Create Password
//               </h2>

//               <div style={{ marginBottom: "1.25rem" }}>
//                 <label style={{
//                   display: "block",
//                   fontWeight: "500",
//                   marginBottom: "0.5rem",
//                   color: "#374151",
//                   fontSize: "0.9rem",
//                 }}>
//                   Password <span style={{ color: "#dc2626" }}>*</span>
//                 </label>
//                 <input
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   placeholder="Enter a strong password (min. 8 characters)"
//                   required
//                   style={{
//                     width: "100%",
//                     padding: "0.75rem 1rem",
//                     border: "2px solid #e5e7eb",
//                     borderRadius: "10px",
//                     fontSize: "0.95rem",
//                     transition: "all 0.2s ease",
//                     outline: "none",
//                     boxSizing: "border-box",
//                   }}
//                   onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
//                   onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
//                 />
//               </div>

//               <div style={{ marginBottom: "1.25rem" }}>
//                 <label style={{
//                   display: "block",
//                   fontWeight: "500",
//                   marginBottom: "0.5rem",
//                   color: "#374151",
//                   fontSize: "0.9rem",
//                 }}>
//                   Confirm Password <span style={{ color: "#dc2626" }}>*</span>
//                 </label>
//                 <input
//                   type="password"
//                   name="confirm_password"
//                   value={formData.confirm_password}
//                   onChange={handleChange}
//                   placeholder="Re-enter your password"
//                   required
//                   style={{
//                     width: "100%",
//                     padding: "0.75rem 1rem",
//                     border: "2px solid #e5e7eb",
//                     borderRadius: "10px",
//                     fontSize: "0.95rem",
//                     transition: "all 0.2s ease",
//                     outline: "none",
//                     boxSizing: "border-box",
//                   }}
//                   onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
//                   onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
//                 />
//               </div>
//             </div>

//             <div style={{ display: "flex", gap: "1rem" }}>
//               <button
//                 type="button"
//                 onClick={() => setCurrentStep(1)}
//                 style={{
//                   flex: 1,
//                   padding: "0.875rem",
//                   border: "2px solid #e5e7eb",
//                   borderRadius: "10px",
//                   background: "white",
//                   color: "#6b7280",
//                   fontSize: "1rem",
//                   fontWeight: "600",
//                   cursor: "pointer",
//                   transition: "all 0.2s ease",
//                 }}
//                 onMouseEnter={(e) => {
//                   e.target.style.borderColor = "#d1d5db";
//                   e.target.style.background = "#f9fafb";
//                 }}
//                 onMouseLeave={(e) => {
//                   e.target.style.borderColor = "#e5e7eb";
//                   e.target.style.background = "white";
//                 }}
//               >
//                 Back
//               </button>
//               <button 
//                 type="submit"
//                 style={{
//                   flex: 1,
//                   padding: "0.875rem",
//                   background: "linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)",
//                   color: "white",
//                   border: "none",
//                   borderRadius: "10px",
//                   fontSize: "1rem",
//                   fontWeight: "600",
//                   cursor: "pointer",
//                   transition: "all 0.3s ease",
//                   boxShadow: "0 4px 15px rgba(29, 78, 216, 0.3)",
//                 }}
//                 onMouseEnter={(e) => {
//                   e.target.style.transform = "translateY(-2px)";
//                   e.target.style.boxShadow = "0 6px 20px rgba(29, 78, 216, 0.4)";
//                 }}
//                 onMouseLeave={(e) => {
//                   e.target.style.transform = "translateY(0)";
//                   e.target.style.boxShadow = "0 4px 15px rgba(29, 78, 216, 0.3)";
//                 }}
//               >
//                 Continue to Company Details
//               </button>
//             </div>
//           </form>
//         )}

//         {/* Step 3: Company and Business Details */}
//         {currentStep === 3 && (
//           <form onSubmit={handleStep3Submit} style={{ maxHeight: "500px", overflowY: "auto", paddingRight: "10px" }}>
//             <div style={{ marginBottom: "1.5rem" }}>
//               <h2 style={{
//                 fontSize: "1.2rem",
//                 fontWeight: "600",
//                 marginBottom: "1.5rem",
//                 color: "#1f2937",
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "0.5rem",
//               }}>
//                 <i className="fas fa-building" style={{ color: "#1d4ed8" }}></i>
//                 Company Details
//               </h2>

//               <div style={{ marginBottom: "1.25rem" }}>
//                 <label style={{
//                   display: "block",
//                   fontWeight: "500",
//                   marginBottom: "0.5rem",
//                   color: "#374151",
//                   fontSize: "0.9rem",
//                 }}>
//                   Company Name <span style={{ color: "#dc2626" }}>*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="company_name"
//                   value={formData.company_name}
//                   onChange={handleChange}
//                   placeholder="Enter your company name"
//                   required
//                   style={{
//                     width: "100%",
//                     padding: "0.75rem 1rem",
//                     border: "2px solid #e5e7eb",
//                     borderRadius: "10px",
//                     fontSize: "0.95rem",
//                     transition: "all 0.2s ease",
//                     outline: "none",
//                     boxSizing: "border-box",
//                   }}
//                   onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
//                   onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
//                 />
//               </div>

//               <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.25rem" }}>
//                 <div>
//                   <label style={{
//                     display: "block",
//                     fontWeight: "500",
//                     marginBottom: "0.5rem",
//                     color: "#374151",
//                     fontSize: "0.9rem",
//                   }}>
//                     Company Type <span style={{ color: "#dc2626" }}>*</span>
//                   </label>
//                   <select
//                     name="company_type"
//                     value={formData.company_type}
//                     onChange={handleChange}
//                     required
//                     style={{
//                       width: "100%",
//                       padding: "0.75rem 1rem",
//                       border: "2px solid #e5e7eb",
//                       borderRadius: "10px",
//                       fontSize: "0.95rem",
//                       transition: "all 0.2s ease",
//                       outline: "none",
//                       boxSizing: "border-box",
//                       background: "white",
//                     }}
//                     onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
//                     onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
//                   >
//                     <option value="">Select Type</option>
//                     <option value="NBFC">NBFC</option>
//                     <option value="Bank">Bank</option>
//                     <option value="Fintech">Fintech</option>
//                     <option value="Other">Other</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label style={{
//                     display: "block",
//                     fontWeight: "500",
//                     marginBottom: "0.5rem",
//                     color: "#374151",
//                     fontSize: "0.9rem",
//                   }}>
//                     Organisation Type <span style={{ color: "#dc2626" }}>*</span>
//                   </label>
//                   <select
//                     name="organisation_type"
//                     value={formData.organisation_type}
//                     onChange={handleChange}
//                     required
//                     style={{
//                       width: "100%",
//                       padding: "0.75rem 1rem",
//                       border: "2px solid #e5e7eb",
//                       borderRadius: "10px",
//                       fontSize: "0.95rem",
//                       transition: "all 0.2s ease",
//                       outline: "none",
//                       boxSizing: "border-box",
//                       background: "white",
//                     }}
//                     onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
//                     onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
//                   >
//                     <option value="">Select Type</option>
//                     <option value="Private Limited">Private Limited</option>
//                     <option value="LLP">LLP</option>
//                     <option value="Proprietorship">Proprietorship</option>
//                     <option value="Partnership">Partnership</option>
//                   </select>
//                 </div>
//               </div>

//               {formData.organisation_type === "Proprietorship" ? (
//                 <div style={{ marginBottom: "1.25rem" }}>
//                   <label style={{
//                     display: "block",
//                     fontWeight: "500",
//                     marginBottom: "0.5rem",
//                     color: "#374151",
//                     fontSize: "0.9rem",
//                   }}>
//                     Owner PAN <span style={{ color: "#dc2626" }}>*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="owner_pan"
//                     value={formData.owner_pan}
//                     onChange={handleChange}
//                     placeholder="ABCDE1234F"
//                     maxLength={10}
//                     required
//                     style={{
//                       width: "100%",
//                       padding: "0.75rem 1rem",
//                       border: "2px solid #e5e7eb",
//                       borderRadius: "10px",
//                       fontSize: "0.95rem",
//                       transition: "all 0.2s ease",
//                       outline: "none",
//                       boxSizing: "border-box",
//                     }}
//                     onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
//                     onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
//                   />
//                 </div>
//               ) : (
//                 <div style={{ marginBottom: "1.25rem" }}>
//                   <label style={{
//                     display: "block",
//                     fontWeight: "500",
//                     marginBottom: "0.5rem",
//                     color: "#374151",
//                     fontSize: "0.9rem",
//                   }}>
//                     Company PAN <span style={{ color: "#dc2626" }}>*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="company_pan"
//                     value={formData.company_pan}
//                     onChange={handleChange}
//                     placeholder="ABCDE1234F"
//                     maxLength={10}
//                     required
//                     style={{
//                       width: "100%",
//                       padding: "0.75rem 1rem",
//                       border: "2px solid #e5e7eb",
//                       borderRadius: "10px",
//                       fontSize: "0.95rem",
//                       transition: "all 0.2s ease",
//                       outline: "none",
//                       boxSizing: "border-box",
//                     }}
//                     onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
//                     onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
//                   />
//                 </div>
//               )}

//               <div style={{ marginBottom: "1.25rem" }}>
//                 <label style={{
//                   display: "block",
//                   fontWeight: "500",
//                   marginBottom: "0.5rem",
//                   color: "#374151",
//                   fontSize: "0.9rem",
//                 }}>
//                   GST Number <span style={{ color: "#dc2626" }}>*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="gst_number"
//                   value={formData.gst_number}
//                   onChange={handleChange}
//                   placeholder="27AAAAA0000A1Z5"
//                   maxLength={15}
//                   required
//                   style={{
//                     width: "100%",
//                     padding: "0.75rem 1rem",
//                     border: "2px solid #e5e7eb",
//                     borderRadius: "10px",
//                     fontSize: "0.95rem",
//                     transition: "all 0.2s ease",
//                     outline: "none",
//                     boxSizing: "border-box",
//                   }}
//                   onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
//                   onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
//                 />
//               </div>

//               <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.25rem" }}>
//                 <div>
//                   <label style={{
//                     display: "block",
//                     fontWeight: "500",
//                     marginBottom: "0.5rem",
//                     color: "#374151",
//                     fontSize: "0.9rem",
//                   }}>
//                     Number of Users <span style={{ color: "#dc2626" }}>*</span>
//                   </label>
//                   <input
//                     type="number"
//                     name="number_of_users"
//                     value={formData.number_of_users}
//                     onChange={handleChange}
//                     placeholder="e.g., 10"
//                     min="1"
//                     required
//                     style={{
//                       width: "100%",
//                       padding: "0.75rem 1rem",
//                       border: "2px solid #e5e7eb",
//                       borderRadius: "10px",
//                       fontSize: "0.95rem",
//                       transition: "all 0.2s ease",
//                       outline: "none",
//                       boxSizing: "border-box",
//                     }}
//                     onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
//                     onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
//                   />
//                 </div>

//                 <div>
//                   <label style={{
//                     display: "block",
//                     fontWeight: "500",
//                     marginBottom: "0.5rem",
//                     color: "#374151",
//                     fontSize: "0.9rem",
//                   }}>
//                     Current AUM <span style={{ color: "#dc2626" }}>*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="current_aum"
//                     value={formData.current_aum}
//                     onChange={handleChange}
//                     placeholder="e.g., 50 Crores"
//                     required
//                     style={{
//                       width: "100%",
//                       padding: "0.75rem 1rem",
//                       border: "2px solid #e5e7eb",
//                       borderRadius: "10px",
//                       fontSize: "0.95rem",
//                       transition: "all 0.2s ease",
//                       outline: "none",
//                       boxSizing: "border-box",
//                     }}
//                     onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
//                     onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
//                   />
//                 </div>
//               </div>

//               <div style={{ marginBottom: "1.25rem" }} ref={dropdownRef}>
//                 <label style={{
//                   display: "block",
//                   fontWeight: "500",
//                   marginBottom: "0.5rem",
//                   color: "#374151",
//                   fontSize: "0.9rem",
//                 }}>
//                   Loan Products <span style={{ color: "#dc2626" }}>*</span>
//                 </label>
//                 <div style={{ position: "relative" }}>
//                   <div
//                     onClick={toggleLoanProductsDropdown}
//                     style={{
//                       width: "100%",
//                       padding: "0.75rem 1rem",
//                       border: "2px solid #e5e7eb",
//                       borderRadius: "10px",
//                       fontSize: "0.95rem",
//                       cursor: "pointer",
//                       display: "flex",
//                       alignItems: "center",
//                       flexWrap: "wrap",
//                       gap: "0.5rem",
//                       minHeight: "48px",
//                       boxSizing: "border-box",
//                       background: "white",
//                     }}
//                   >
//                     {formData.loan_products.length > 0 ? (
//                       formData.loan_products.map((product, index) => (
//                         <span key={index} style={{
//                           background: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
//                           color: "#1d4ed8",
//                           borderRadius: "20px",
//                           padding: "0.25rem 0.75rem",
//                           fontSize: "0.85rem",
//                           fontWeight: "500",
//                           display: "flex",
//                           alignItems: "center",
//                           gap: "0.5rem",
//                         }}>
//                           {product}
//                           <i
//                             className="fas fa-times"
//                             style={{ cursor: "pointer", fontSize: "0.75rem" }}
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               handleLoanProductToggle(product);
//                             }}
//                           ></i>
//                         </span>
//                       ))
//                     ) : (
//                       <span style={{ color: "#9ca3af" }}>Select loan products...</span>
//                     )}
//                     <i
//                       className={`fas fa-chevron-${loanProductsDropdownOpen ? "up" : "down"}`}
//                       style={{
//                         position: "absolute",
//                         right: "1rem",
//                         color: "#6b7280",
//                         pointerEvents: "none",
//                       }}
//                     ></i>
//                   </div>
//                   {loanProductsDropdownOpen && (
//                     <div style={{
//                       position: "absolute",
//                       top: "100%",
//                       left: "0",
//                       right: "0",
//                       background: "white",
//                       border: "2px solid #e5e7eb",
//                       borderRadius: "10px",
//                       maxHeight: "200px",
//                       overflowY: "auto",
//                       zIndex: "10",
//                       boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
//                       marginTop: "0.5rem",
//                     }}>
//                       {loanProductsOptions.map((product, index) => (
//                         <div
//                           key={index}
//                           onClick={() => handleLoanProductToggle(product)}
//                           style={{
//                             padding: "0.75rem 1rem",
//                             cursor: "pointer",
//                             display: "flex",
//                             justifyContent: "space-between",
//                             alignItems: "center",
//                             background: formData.loan_products.includes(product) 
//                               ? "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)" 
//                               : "white",
//                             color: formData.loan_products.includes(product) ? "#1d4ed8" : "#374151",
//                             fontWeight: formData.loan_products.includes(product) ? "500" : "normal",
//                             transition: "all 0.2s ease",
//                           }}
//                           onMouseEnter={(e) => {
//                             if (!formData.loan_products.includes(product)) {
//                               e.target.style.background = "#f9fafb";
//                             }
//                           }}
//                           onMouseLeave={(e) => {
//                             if (!formData.loan_products.includes(product)) {
//                               e.target.style.background = "white";
//                             }
//                           }}
//                         >
//                           {product}
//                           {formData.loan_products.includes(product) && (
//                             <i className="fas fa-check"></i>
//                           )}
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Address Section */}
//               <h3 style={{
//                 fontSize: "1.1rem",
//                 fontWeight: "600",
//                 marginTop: "2rem",
//                 marginBottom: "1rem",
//                 color: "#1f2937",
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "0.5rem",
//               }}>
//                 <i className="fas fa-map-marker-alt" style={{ color: "#1d4ed8" }}></i>
//                 Business Address
//               </h3>

//               <div style={{ marginBottom: "1.25rem" }}>
//                 <label style={{
//                   display: "block",
//                   fontWeight: "500",
//                   marginBottom: "0.5rem",
//                   color: "#374151",
//                   fontSize: "0.9rem",
//                 }}>
//                   Address Line 1 <span style={{ color: "#dc2626" }}>*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="address_line1"
//                   value={formData.address_line1}
//                   onChange={handleChange}
//                   placeholder="Street address"
//                   required
//                   style={{
//                     width: "100%",
//                     padding: "0.75rem 1rem",
//                     border: "2px solid #e5e7eb",
//                     borderRadius: "10px",
//                     fontSize: "0.95rem",
//                     transition: "all 0.2s ease",
//                     outline: "none",
//                     boxSizing: "border-box",
//                   }}
//                   onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
//                   onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
//                 />
//               </div>

//               <div style={{ marginBottom: "1.25rem" }}>
//                 <label style={{
//                   display: "block",
//                   fontWeight: "500",
//                   marginBottom: "0.5rem",
//                   color: "#374151",
//                   fontSize: "0.9rem",
//                 }}>
//                   Address Line 2
//                 </label>
//                 <input
//                   type="text"
//                   name="address_line2"
//                   value={formData.address_line2}
//                   onChange={handleChange}
//                   placeholder="Apartment, suite, etc. (optional)"
//                   style={{
//                     width: "100%",
//                     padding: "0.75rem 1rem",
//                     border: "2px solid #e5e7eb",
//                     borderRadius: "10px",
//                     fontSize: "0.95rem",
//                     transition: "all 0.2s ease",
//                     outline: "none",
//                     boxSizing: "border-box",
//                   }}
//                   onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
//                   onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
//                 />
//               </div>

//               <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.25rem" }}>
//                 <div>
//                   <label style={{
//                     display: "block",
//                     fontWeight: "500",
//                     marginBottom: "0.5rem",
//                     color: "#374151",
//                     fontSize: "0.9rem",
//                   }}>
//                     City <span style={{ color: "#dc2626" }}>*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="city"
//                     value={formData.city}
//                     onChange={handleChange}
//                     placeholder="City"
//                     required
//                     style={{
//                       width: "100%",
//                       padding: "0.75rem 1rem",
//                       border: "2px solid #e5e7eb",
//                       borderRadius: "10px",
//                       fontSize: "0.95rem",
//                       transition: "all 0.2s ease",
//                       outline: "none",
//                       boxSizing: "border-box",
//                     }}
//                     onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
//                     onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
//                   />
//                 </div>

//                 <div>
//                   <label style={{
//                     display: "block",
//                     fontWeight: "500",
//                     marginBottom: "0.5rem",
//                     color: "#374151",
//                     fontSize: "0.9rem",
//                   }}>
//                     State <span style={{ color: "#dc2626" }}>*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="state"
//                     value={formData.state}
//                     onChange={handleChange}
//                     placeholder="State"
//                     required
//                     style={{
//                       width: "100%",
//                       padding: "0.75rem 1rem",
//                       border: "2px solid #e5e7eb",
//                       borderRadius: "10px",
//                       fontSize: "0.95rem",
//                       transition: "all 0.2s ease",
//                       outline: "none",
//                       boxSizing: "border-box",
//                     }}
//                     onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
//                     onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
//                   />
//                 </div>
//               </div>

//               <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.25rem" }}>
//                 <div>
//                   <label style={{
//                     display: "block",
//                     fontWeight: "500",
//                     marginBottom: "0.5rem",
//                     color: "#374151",
//                     fontSize: "0.9rem",
//                   }}>
//                     Pincode <span style={{ color: "#dc2626" }}>*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="pincode"
//                     value={formData.pincode}
//                     onChange={handleChange}
//                     placeholder="Postal code"
//                     required
//                     style={{
//                       width: "100%",
//                       padding: "0.75rem 1rem",
//                       border: "2px solid #e5e7eb",
//                       borderRadius: "10px",
//                       fontSize: "0.95rem",
//                       transition: "all 0.2s ease",
//                       outline: "none",
//                       boxSizing: "border-box",
//                     }}
//                     onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
//                     onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
//                   />
//                 </div>

//                 <div>
//                   <label style={{
//                     display: "block",
//                     fontWeight: "500",
//                     marginBottom: "0.5rem",
//                     color: "#374151",
//                     fontSize: "0.9rem",
//                   }}>
//                     Country <span style={{ color: "#dc2626" }}>*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="country"
//                     value={formData.country}
//                     onChange={handleChange}
//                     placeholder="Country"
//                     required
//                     style={{
//                       width: "100%",
//                       padding: "0.75rem 1rem",
//                       border: "2px solid #e5e7eb",
//                       borderRadius: "10px",
//                       fontSize: "0.95rem",
//                       transition: "all 0.2s ease",
//                       outline: "none",
//                       boxSizing: "border-box",
//                     }}
//                     onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
//                     onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
//                   />
//                 </div>
//               </div>

//               {/* Branch Requirements */}
//               <h3 style={{
//                 fontSize: "1.1rem",
//                 fontWeight: "600",
//                 marginTop: "2rem",
//                 marginBottom: "1rem",
//                 color: "#1f2937",
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "0.5rem",
//               }}>
//                 <i className="fas fa-code-branch" style={{ color: "#1d4ed8" }}></i>
//                 Branch Requirements
//               </h3>

//               <div style={{ marginBottom: "1.25rem" }}>
//                 <label style={{
//                   display: "block",
//                   fontWeight: "500",
//                   marginBottom: "0.5rem",
//                   color: "#374151",
//                   fontSize: "0.9rem",
//                 }}>
//                   Do you require branches? <span style={{ color: "#dc2626" }}>*</span>
//                 </label>
//                 <select
//                   name="require_branches"
//                   value={formData.require_branches}
//                   onChange={handleChange}
//                   required
//                   style={{
//                     width: "100%",
//                     padding: "0.75rem 1rem",
//                     border: "2px solid #e5e7eb",
//                     borderRadius: "10px",
//                     fontSize: "0.95rem",
//                     transition: "all 0.2s ease",
//                     outline: "none",
//                     boxSizing: "border-box",
//                     background: "white",
//                   }}
//                   onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
//                   onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
//                 >
//                   <option value="">Select...</option>
//                   <option value="Yes">Yes</option>
//                   <option value="No">No</option>
//                 </select>
//               </div>

//               {formData.require_branches === "Yes" && (
//                 <div style={{ marginBottom: "1.25rem" }}>
//                   <label style={{
//                     display: "block",
//                     fontWeight: "500",
//                     marginBottom: "0.5rem",
//                     color: "#374151",
//                     fontSize: "0.9rem",
//                   }}>
//                     Number of Branches <span style={{ color: "#dc2626" }}>*</span>
//                   </label>
//                   <input
//                     type="number"
//                     name="number_of_branches"
//                     value={formData.number_of_branches}
//                     onChange={handleChange}
//                     placeholder="e.g., 5"
//                     min="1"
//                     required
//                     style={{
//                       width: "100%",
//                       padding: "0.75rem 1rem",
//                       border: "2px solid #e5e7eb",
//                       borderRadius: "10px",
//                       fontSize: "0.95rem",
//                       transition: "all 0.2s ease",
//                       outline: "none",
//                       boxSizing: "border-box",
//                     }}
//                     onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
//                     onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
//                   />
//                 </div>
//               )}
//             </div>

//             <div style={{ display: "flex", gap: "1rem", position: "sticky", bottom: 0, background: "white", paddingTop: "1rem" }}>
//               <button
//                 type="button"
//                 onClick={() => setCurrentStep(2)}
//                 style={{
//                   flex: 1,
//                   padding: "0.875rem",
//                   border: "2px solid #e5e7eb",
//                   borderRadius: "10px",
//                   background: "white",
//                   color: "#6b7280",
//                   fontSize: "1rem",
//                   fontWeight: "600",
//                   cursor: "pointer",
//                   transition: "all 0.2s ease",
//                 }}
//                 onMouseEnter={(e) => {
//                   e.target.style.borderColor = "#d1d5db";
//                   e.target.style.background = "#f9fafb";
//                 }}
//                 onMouseLeave={(e) => {
//                   e.target.style.borderColor = "#e5e7eb";
//                   e.target.style.background = "white";
//                 }}
//               >
//                 Back
//               </button>
//               <button 
//                 type="submit"
//                 style={{
//                   flex: 1,
//                   padding: "0.875rem",
//                   background: "linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)",
//                   color: "white",
//                   border: "none",
//                   borderRadius: "10px",
//                   fontSize: "1rem",
//                   fontWeight: "600",
//                   cursor: "pointer",
//                   transition: "all 0.3s ease",
//                   boxShadow: "0 4px 15px rgba(29, 78, 216, 0.3)",
//                 }}
//                 onMouseEnter={(e) => {
//                   e.target.style.transform = "translateY(-2px)";
//                   e.target.style.boxShadow = "0 6px 20px rgba(29, 78, 216, 0.4)";
//                 }}
//                 onMouseLeave={(e) => {
//                   e.target.style.transform = "translateY(0)";
//                   e.target.style.boxShadow = "0 4px 15px rgba(29, 78, 216, 0.3)";
//                 }}
//               >
//                 Continue to Verification
//               </button>
//             </div>
//           </form>
//         )}

//         {/* Step 4: OTP Verification */}
//         {currentStep === 4 && (
//           <form onSubmit={handleFinalSubmit}>
//             <div style={{ marginBottom: "1.5rem" }}>
//               <h2 style={{
//                 fontSize: "1.2rem",
//                 fontWeight: "600",
//                 marginBottom: "1rem",
//                 color: "#1f2937",
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "0.5rem",
//               }}>
//                 <i className="fas fa-shield-alt" style={{ color: "#1d4ed8" }}></i>
//                 Verify Your Contact
//               </h2>
//               <p style={{ 
//                 color: "#6b7280", 
//                 marginBottom: "1.5rem",
//                 fontSize: "0.95rem",
//                 lineHeight: "1.6",
//               }}>
//                 Click "Send OTP" to receive verification codes on your email and phone number.
//               </p>

//               <button
//                 type="button"
//                 onClick={handleSendOtp}
//                 disabled={loading}
//                 style={{
//                   width: "100%",
//                   padding: "0.875rem",
//                   border: "2px solid #1d4ed8",
//                   borderRadius: "10px",
//                   background: "white",
//                   color: "#1d4ed8",
//                   fontSize: "1rem",
//                   fontWeight: "600",
//                   cursor: loading ? "not-allowed" : "pointer",
//                   marginBottom: "1.5rem",
//                   transition: "all 0.2s ease",
//                   opacity: loading ? 0.6 : 1,
//                 }}
//                 onMouseEnter={(e) => {
//                   if (!loading) {
//                     e.target.style.background = "#eff6ff";
//                   }
//                 }}
//                 onMouseLeave={(e) => {
//                   e.target.style.background = "white";
//                 }}
//               >
//                 {loading ? "Sending OTP..." : "Send OTP"}
//               </button>

//               <div style={{ marginBottom: "1.25rem" }}>
//                 <label style={{
//                   display: "block",
//                   fontWeight: "500",
//                   marginBottom: "0.5rem",
//                   color: "#374151",
//                   fontSize: "0.9rem",
//                 }}>
//                   Email OTP <span style={{ color: "#dc2626" }}>*</span>
//                 </label>
//                 <input
//                   type="text"
//                   value={emailOtp}
//                   onChange={(e) => setEmailOtp(e.target.value)}
//                   placeholder="Enter 6-digit email OTP"
//                   maxLength={6}
//                   required
//                   style={{
//                     width: "100%",
//                     padding: "0.75rem 1rem",
//                     border: "2px solid #e5e7eb",
//                     borderRadius: "10px",
//                     fontSize: "0.95rem",
//                     transition: "all 0.2s ease",
//                     outline: "none",
//                     boxSizing: "border-box",
//                     textAlign: "center",
//                     letterSpacing: "0.5rem",
//                     fontWeight: "600",
//                   }}
//                   onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
//                   onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
//                 />
//                 <div style={{ 
//                   fontSize: "0.85rem", 
//                   color: "#6b7280", 
//                   marginTop: "0.5rem",
//                 }}>
//                   Sent to: <strong style={{ color: "#1d4ed8" }}>{formData.email}</strong>
//                 </div>
//               </div>

//               <div style={{ marginBottom: "1.25rem" }}>
//                 <label style={{
//                   display: "block",
//                   fontWeight: "500",
//                   marginBottom: "0.5rem",
//                   color: "#374151",
//                   fontSize: "0.9rem",
//                 }}>
//                   Phone OTP <span style={{ color: "#dc2626" }}>*</span>
//                 </label>
//                 <input
//                   type="text"
//                   value={phoneOtp}
//                   onChange={(e) => setPhoneOtp(e.target.value)}
//                   placeholder="Enter 6-digit phone OTP"
//                   maxLength={6}
//                   required
//                   style={{
//                     width: "100%",
//                     padding: "0.75rem 1rem",
//                     border: "2px solid #e5e7eb",
//                     borderRadius: "10px",
//                     fontSize: "0.95rem",
//                     transition: "all 0.2s ease",
//                     outline: "none",
//                     boxSizing: "border-box",
//                     textAlign: "center",
//                     letterSpacing: "0.5rem",
//                     fontWeight: "600",
//                   }}
//                   onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
//                   onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
//                 />
//                 <div style={{ 
//                   fontSize: "0.85rem", 
//                   color: "#6b7280", 
//                   marginTop: "0.5rem",
//                 }}>
//                   Sent to: <strong style={{ color: "#1d4ed8" }}>{formData.phone_number}</strong>
//                 </div>
//               </div>

//               <button
//                 type="button"
//                 onClick={handleResendOtp}
//                 disabled={loading}
//                 style={{
//                   background: "transparent",
//                   border: "none",
//                   color: "#1d4ed8",
//                   cursor: loading ? "not-allowed" : "pointer",
//                   padding: "0.5rem 0",
//                   fontSize: "0.9rem",
//                   textDecoration: "underline",
//                   fontWeight: "500",
//                   opacity: loading ? 0.6 : 1,
//                 }}
//               >
//                 Resend OTP
//               </button>
//             </div>

//             <div style={{ display: "flex", gap: "1rem" }}>
//               <button
//                 type="button"
//                 onClick={() => setCurrentStep(3)}
//                 style={{
//                   flex: 1,
//                   padding: "0.875rem",
//                   border: "2px solid #e5e7eb",
//                   borderRadius: "10px",
//                   background: "white",
//                   color: "#6b7280",
//                   fontSize: "1rem",
//                   fontWeight: "600",
//                   cursor: "pointer",
//                   transition: "all 0.2s ease",
//                 }}
//                 onMouseEnter={(e) => {
//                   e.target.style.borderColor = "#d1d5db";
//                   e.target.style.background = "#f9fafb";
//                 }}
//                 onMouseLeave={(e) => {
//                   e.target.style.borderColor = "#e5e7eb";
//                   e.target.style.background = "white";
//                 }}
//               >
//                 Back
//               </button>
//               <button 
//                 type="submit"
//                 disabled={loading}
//                 style={{
//                   flex: 1,
//                   padding: "0.875rem",
//                   background: loading 
//                     ? "#9ca3af" 
//                     : "linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)",
//                   color: "white",
//                   border: "none",
//                   borderRadius: "10px",
//                   fontSize: "1rem",
//                   fontWeight: "600",
//                   cursor: loading ? "not-allowed" : "pointer",
//                   transition: "all 0.3s ease",
//                   boxShadow: loading ? "none" : "0 4px 15px rgba(29, 78, 216, 0.3)",
//                 }}
//                 onMouseEnter={(e) => {
//                   if (!loading) {
//                     e.target.style.transform = "translateY(-2px)";
//                     e.target.style.boxShadow = "0 6px 20px rgba(29, 78, 216, 0.4)";
//                   }
//                 }}
//                 onMouseLeave={(e) => {
//                   if (!loading) {
//                     e.target.style.transform = "translateY(0)";
//                     e.target.style.boxShadow = "0 4px 15px rgba(29, 78, 216, 0.3)";
//                   }
//                 }}
//               >
//                 {loading ? "Submitting..." : "Verify & Create Account"}
//               </button>
//             </div>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SignUp;

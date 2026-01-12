import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Features from "./pages/Feature";
import About from "./pages/About";
import Footer from "./components/Footer";
import TermsConditions from "./pages/TermsConditions";

import Contact from "./pages/Contact";
import DashboardLinks from "./pages/DashboardLinks";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import ScrollToTop from "./components/ScrollToTop";
import Payments from "./pages/Payments";
import Careers from "./pages/Careers";

export default function App() {
  return (
    <Router>
      <div className="relative">
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/dashboards" element={<DashboardLinks />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />

          <Route path="/payments" element={<Payments />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

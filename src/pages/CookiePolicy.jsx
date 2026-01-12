import React from "react";

export default function CookiePolicy() {
  return (
    <section className="py-16 md:py-24 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6 text-left">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Cookie Policy
        </h1>

        <p className="text-gray-700 mb-8 leading-relaxed">
          This Cookie Policy explains how [Your Company Name] uses cookies and
          similar technologies when you visit our website [www.example.com].
          Cookies help us enhance your browsing experience, analyze site usage,
          and support essential website functions.
        </p>

        <div className="space-y-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              What Are Cookies
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Cookies are small text files stored on your device when you access
              a website. They allow the website to recognize your device,
              remember preferences, and provide a smoother and more personalized
              experience.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Types of Cookies We Use
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use essential cookies to ensure basic website functionality
              such as secure login and session management. Performance and
              analytics cookies help us understand how users interact with our
              website by collecting anonymous usage data. Functional cookies
              remember user preferences like language and theme selection, while
              advertising and marketing cookies are used to display relevant ads
              and measure campaign performance.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Third-Party Cookies
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Our website may include cookies from trusted third-party services
              such as analytics providers, payment gateways, and marketing
              platforms. These third parties may collect information according
              to their own privacy and cookie policies.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Cookie Management
            </h2>
            <p className="text-gray-700 leading-relaxed">
              You can manage or disable cookies through your browser settings at
              any time. Please note that restricting certain cookies may impact
              the functionality and performance of the website.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Updates to This Policy
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Cookie Policy periodically to reflect changes
              in technology, legal requirements, or our practices. Any updates
              will be posted on this page with a revised effective date.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

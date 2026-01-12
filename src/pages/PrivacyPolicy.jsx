import React from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function PrivacyPolicy() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-br from-[#f8fbff] via-[#eef3ff] to-[#e0e7ff]">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-20 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Header */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-4xl md:text-5xl font-bold text-gray-800 mb-6"
        >
          Privacy Policy
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Your privacy matters. This policy explains how XpertLand CRM collects,
          uses, protects, and manages your personal and business data.
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "60%" }}
          transition={{ duration: 0.8 }}
          className="h-[2px] mx-auto mb-14 bg-gradient-to-r from-blue-400 via-indigo-500 to-transparent rounded-full"
        />

        {/* Sections */}
        <div className="space-y-12 text-left">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            className="bg-white p-6 rounded-2xl shadow-md"
          >
            <h2 className="text-xl font-semibold mb-3 text-gray-800">
              1. Information We Collect
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We collect data you provide directly such as account details,
              customer information, uploaded documents, and communication logs.
              We may also collect technical metadata for security and analytics.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            className="bg-white p-6 rounded-2xl shadow-md"
          >
            <h2 className="text-xl font-semibold mb-3 text-gray-800">
              2. How Your Data is Used
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We use your data to operate the CRM, process workflows, provide
              analytics, enhance AI automation, and improve platform
              performance.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            className="bg-white p-6 rounded-2xl shadow-md"
          >
            <h2 className="text-xl font-semibold mb-3 text-gray-800">
              3. Data Protection & Security
            </h2>
            <p className="text-gray-600 leading-relaxed">
              XpertLand CRM uses encryption, role-based access, secure servers,
              and periodic audits to ensure complete information security.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            className="bg-white p-6 rounded-2xl shadow-md"
          >
            <h2 className="text-xl font-semibold mb-3 text-gray-800">
              4. Data Sharing
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We never sell your data. Information is shared only with trusted
              service providers when necessary to operate platform features.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            className="bg-white p-6 rounded-2xl shadow-md"
          >
            <h2 className="text-xl font-semibold mb-3 text-gray-800">
              5. Your Rights
            </h2>
            <p className="text-gray-600 leading-relaxed">
              You can request data access, deletion, corrections, or export of
              your stored information at any time.
            </p>
          </motion.div>
        </div>

        {/* Bottom Divider */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "50%" }}
          transition={{ duration: 0.8 }}
          className="h-[2px] mx-auto mt-16 bg-gradient-to-r from-blue-400 via-indigo-500 to-transparent rounded-full"
        />
      </div>
    </section>
  );
}

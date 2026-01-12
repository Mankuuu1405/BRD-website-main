import React from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function TermsConditions() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-left">
        {/* Header */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
        >
          Terms & Conditions
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="text-gray-700 mb-8 leading-relaxed"
        >
          These Terms govern your use of the XpertLand CRM platform. By
          accessing or using our service, you agree to these conditions.
        </motion.p>

        <div className="space-y-8 text-left">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <ol className="list-decimal pl-6 space-y-6 text-gray-700">
              <li>
                <strong>Use of the Platform</strong>
                <p className="mt-2">
                  You may use XpertLand CRM solely for lawful business
                  activities. Any attempt to disrupt services, misuse features,
                  or gain unauthorized access is strictly prohibited.
                </p>
              </li>

              <li>
                <strong>User Responsibilities</strong>
                <p className="mt-2">
                  Users must maintain the confidentiality of login credentials
                  and ensure that all data entered into the platform is accurate
                  and authorized.
                </p>
              </li>

              <li>
                <strong>Data Ownership</strong>
                <p className="mt-2">
                  You retain full ownership of your data. XpertLand CRM
                  processes data strictly to operate and enhance platform
                  functionality—never for third-party sales.
                </p>
              </li>

              <li>
                <strong>Service Availability</strong>
                <p className="mt-2">
                  While we aim for uninterrupted performance, occasional
                  maintenance or updates may temporarily impact accessibility.
                </p>
              </li>

              <li>
                <strong>Updates to These Terms</strong>
                <p className="mt-2">
                  We may update these Terms when necessary. Continued use of the
                  platform constitutes acceptance of any revised terms.
                </p>
              </li>
            </ol>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

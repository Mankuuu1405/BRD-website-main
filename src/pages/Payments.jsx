import React from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Payments() {
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
          Payment & Billing Policy
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="text-gray-700 mb-8 leading-relaxed"
        >
          This policy outlines how payments, subscriptions, refunds, and billing
          are handled for XpertLand CRM.
        </motion.p>

        <div className="space-y-8 text-left">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              1. Subscription Payments
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              All subscription purchases must be completed through approved
              payment gateways. Pricing may vary based on plan, usage, and
              additional integrations selected by your team.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              2. Billing Cycles
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Billing occurs monthly or annually, depending on your chosen plan.
              Invoices are automatically generated and available in your
              dashboard.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. Refund Policy
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Refunds are issued only for eligible cases within the permitted
              timeframe. Pro-rated refunds for partially used subscription
              periods are not provided.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              4. Payment Security
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              All payments are processed through secure, PCI-compliant payment
              providers. XpertLand CRM does not store your card or banking
              details at any time.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              5. Failed Payments
            </h2>
            <p className="text-gray-700 leading-relaxed">
              If a payment fails, your account may be temporarily suspended
              until billing issues are resolved. We notify users before any
              action.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

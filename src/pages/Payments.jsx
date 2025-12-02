import React from "react";
import { motion } from "framer-motion";

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Payments() {
    return (
        <section className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-br from-[#f8fbff] via-[#eef3ff] to-[#e0e7ff]">

            {/* Background Glow */}
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
                    Payment & Billing Policy
                </motion.h1>

                <motion.p
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.2 }}
                    className="text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed"
                >
                    This policy outlines how payments, subscriptions, refunds, and billing 
                    are handled for XpertLand CRM.
                </motion.p>

                {/* Divider */}
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "60%" }}
                    transition={{ duration: 0.8 }}
                    className="h-[2px] mx-auto mb-14 bg-gradient-to-r from-blue-400 via-indigo-500 to-transparent rounded-full"
                />

                {/* Payment Sections */}
                <div className="space-y-12 text-left">

                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        className="bg-white p-6 rounded-2xl shadow-md"
                    >
                        <h2 className="text-xl font-semibold mb-3 text-gray-800">
                            1. Subscription Payments
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            All subscription purchases must be completed through approved 
                            payment gateways. Pricing may vary based on plan, usage, and 
                            additional integrations selected by your team.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        className="bg-white p-6 rounded-2xl shadow-md"
                    >
                        <h2 className="text-xl font-semibold mb-3 text-gray-800">
                            2. Billing Cycles
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            Billing occurs monthly or annually, depending on your chosen plan. 
                            Invoices are automatically generated and available in your dashboard.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        className="bg-white p-6 rounded-2xl shadow-md"
                    >
                        <h2 className="text-xl font-semibold mb-3 text-gray-800">
                            3. Refund Policy
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            Refunds are issued only for eligible cases within the permitted timeframe.  
                            Pro-rated refunds for partially used subscription periods are not provided.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        className="bg-white p-6 rounded-2xl shadow-md"
                    >
                        <h2 className="text-xl font-semibold mb-3 text-gray-800">
                            4. Payment Security
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            All payments are processed through secure, PCI-compliant payment providers.  
                            XpertLand CRM does not store your card or banking details at any time.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        className="bg-white p-6 rounded-2xl shadow-md"
                    >
                        <h2 className="text-xl font-semibold mb-3 text-gray-800">
                            5. Failed Payments
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            If a payment fails, your account may be temporarily suspended until 
                            billing issues are resolved. We notify users before any action.
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

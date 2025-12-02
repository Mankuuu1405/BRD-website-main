import React from "react";
import { motion } from "framer-motion";

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function TermsConditions() {
    return (
        <section className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-br from-[#f8fbff] via-[#eef3ff] to-[#e0e7ff]">
            
            {/* Background Blur Elements */}
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
                    Terms & Conditions
                </motion.h1>

                <motion.p
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.2 }}
                    className="text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed"
                >
                    These Terms govern your use of the XpertLand CRM platform.  
                    By accessing or using our service, you agree to these conditions.
                </motion.p>

                {/* Divider */}
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "90%" }}
                    transition={{ duration: 0.8 }}
                    className="h-[2px] mx-auto mb-14 bg-gradient-to-r from-blue-400 via-indigo-500 to-transparent rounded-full"
                />

                {/* Content Sections */}
                <div className="space-y-12 text-left">

                    {/* Section 1 */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="bg-white p-6 rounded-2xl shadow-md"
                    >
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">
                            1. Use of the Platform
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            You may use XpertLand CRM solely for lawful business activities.
                            Any attempt to disrupt services, misuse features, or gain unauthorized 
                            access is strictly prohibited.
                        </p>
                    </motion.div>

                    {/* Section 2 */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="bg-white p-6 rounded-2xl shadow-md"
                    >
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">
                            2. User Responsibilities
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            Users must maintain the confidentiality of login credentials 
                            and ensure that all data entered into the platform is accurate and authorized.
                        </p>
                    </motion.div>

                    {/* Section 3 */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="bg-white p-6 rounded-2xl shadow-md"
                    >
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">
                            3. Data Ownership
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            You retain full ownership of your data.  
                            XpertLand CRM processes data strictly to operate and enhance 
                            platform functionality—never for third-party sales.
                        </p>
                    </motion.div>

                    {/* Section 4 */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="bg-white p-6 rounded-2xl shadow-md"
                    >
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">
                            4. Service Availability
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            While we aim for uninterrupted performance, occasional 
                            maintenance or updates may temporarily impact accessibility.
                        </p>
                    </motion.div>

                    {/* Section 5 */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="bg-white p-6 rounded-2xl shadow-md"
                    >
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">
                            5. Updates to These Terms
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            We may update these Terms when necessary. Continued use of the 
                            platform constitutes acceptance of any revised terms.
                        </p>
                    </motion.div>
                </div>

                {/* Footer Divider */}
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "80%" }}
                    transition={{ duration: 0.8 }}
                    className="h-[2px] mx-auto mt-16 bg-gradient-to-r from-blue-400 via-indigo-500 to-transparent rounded-full"
                />
            </div>
        </section>
    );
}

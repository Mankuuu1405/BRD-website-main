import React from "react";
import { motion } from "framer-motion";

const InfoCard = ({ image, title, description, highlight = false }) => {
  return (
    <motion.div
      className={`p-6 rounded-2xl shadow-md hover:shadow-lg transition-transform ${
        highlight ? "bg-zinc-100" : "bg-white"
      }`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <img
        src={image}
        alt={title}
        className="w-full h-60 object-cover rounded-xl mb-4"
   
      />
      <h3
        className={`text-xl font-semibold mb-2 ${
          highlight ? "text-blue-600" : "text-gray-800"
        }`}
      >
        {title}
      </h3>
      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
  );
};

export default InfoCard;

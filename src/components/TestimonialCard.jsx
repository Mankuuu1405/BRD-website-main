import React from "react";
import { motion } from "framer-motion";

const TestimonialCard = ({ image, name, handle, quote }) => {
  return (
    <motion.div
      className="bg-zinc-200 rounded-2xl p-8 shadow-sm relative transition-transform"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="text-[8vw] md:text-[5vw] text-blue-600 absolute top-2 left-6">
        “
      </div>

      <p className="text-gray-700 text-base font-medium mt-20 leading-relaxed text-center md:text-left">
        {quote}
      </p>

      <div className="flex flex-col md:flex-row items-center justify-center mt-10 gap-3">
        <img
          src={image}
          alt={name}
          className="w-20 h-20 rounded-full object-cover"
        />
        <div className="text-center md:text-left">
          <h4 className="text-blue-600 text-xl font-semibold">{name}</h4>
          <p className="text-sm text-gray-500">{handle}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;

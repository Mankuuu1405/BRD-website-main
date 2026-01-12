import React from "react";
import { motion } from "framer-motion";

const Card = ({ icon, title, text, onClick, hoverEffect = true }) => {
  return (
    <motion.div
      onClick={onClick}
      whileHover={hoverEffect ? { scale: 1.05 } : {}}
      className="relative group p-6 rounded-2xl shadow-sm border border-gray-200 overflow-hidden cursor-pointer bg-white"
    >
      {hoverEffect && (
        <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
      )}

      <div className="relative z-10 flex flex-col items-center text-center">
        {icon && (
          <div
            className={`w-12 h-12 flex items-center justify-center rounded-full transition-colors duration-300 ${
              hoverEffect
                ? "bg-blue-100 text-blue-100 group-hover:bg-white group-hover:text-blue-100"
                : "bg-transparent text-blue-100"
            }`}
          >
            {icon}
          </div>
        )}

        {title && (
          <h3
            className={`mt-4 text-lg font-semibold transition-colors duration-300 ${
              hoverEffect ? "group-hover:text-white" : "text-gray-700"
            }`}
          >
            {title}
          </h3>
        )}

        {text && (
          <p
            className={`mt-1 text-sm transition-colors duration-300 ${
              hoverEffect
                ? "text-gray-600 group-hover:text-gray-100"
                : "text-gray-600"
            }`}
          >
            {text}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default Card;

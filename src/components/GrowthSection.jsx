import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import arrow from "../assets/img/arrow-image.png";

const GrowthSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "center center"],
  });

  // Transform scroll progress for bars
  const bar1Y = useTransform(scrollYProgress, [0, 0.4], [150, 0]);
  const bar1Opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const bar2Y = useTransform(scrollYProgress, [0.2, 0.6], [150, 0]);
  const bar2Opacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);

  const bar3Y = useTransform(scrollYProgress, [0.4, 0.8], [150, 0]);
  const bar3Opacity = useTransform(scrollYProgress, [0.4, 0.7], [0, 1]);

  return (
    <section ref={sectionRef} className="bg-white py-24 relative overflow-hidden  ">
      {/* Header */}
      <div className="text-center mb-20 px-6 absolute left-[20%] top-10 ">
        <h2 className="text-3xl md:text-5xl font-bold text-[#1E3A8A] leading-snug">
          Grow with <span className="text-[#3B82F6]">Xpertland.ai</span>
        </h2>
        <img
          src={arrow}
          alt="arrow"
          className="w-32 md:w-40 h-24 md:h-32 rotate-45 mx-auto opacity-90 mt-4"
        />
      </div>

      {/* Bars Container */}
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-end justify-center gap-10 md:gap-8 text-center">
        {/* Bar 1 */}
        <motion.div
          style={{ y: bar1Y, opacity: bar1Opacity }}
          className="bg-[#DBEAFE] rounded-t-[2rem] hover:scale-110 px-4 pt-8 pb-6 w-48 sm:w-56 md:w-64 lg:w-72 h-64 sm:h-72 flex flex-col justify-between shadow-md"
        >
          <div>
            <h3 className="text-3xl md:text-4xl font-bold text-[#1E3A8A] mb-2">40%</h3>
            <p className="text-base md:text-lg font-semibold text-[#1E3A8A]">
              Faster Approvals
            </p>
            <p className="text-sm text-[#4A4A4A] mt-2">
              Automated workflows speed up loan decisions.
            </p>
          </div>
        </motion.div>

        {/* Bar 2 */}
        <motion.div
          style={{ y: bar2Y, opacity: bar2Opacity }}
          className="bg-[#BFDBFE] rounded-t-[2rem] hover:scale-110 px-4 pt-8 pb-6 w-48 sm:w-56 md:w-64 lg:w-72 h-80 sm:h-96 flex flex-col justify-between shadow-md"
        >
          <div>
            <h3 className="text-3xl md:text-4xl font-bold text-[#1E3A8A] mb-2">60%</h3>
            <p className="text-base md:text-lg font-semibold text-[#1E3A8A]">
              Smarter Management
            </p>
            <p className="text-sm text-[#4A4A4A] mt-2">
              Centralized customer tracking and team access.
            </p>
          </div>
        </motion.div>

        {/* Bar 3 */}
        <motion.div
          style={{ y: bar3Y, opacity: bar3Opacity }}
          className="bg-[#93C5FD] rounded-t-[2rem] hover:scale-110 px-4 pt-8 pb-6 w-48 sm:w-56 md:w-64 lg:w-72 h-[22rem] sm:h-[28rem] flex flex-col justify-between shadow-md"
        >
          <div>
            <h3 className="text-3xl md:text-4xl font-bold text-[#1E3A8A] mb-2">85%</h3>
            <p className="text-base md:text-lg font-semibold text-[#1E3A8A]">
              Higher Productivity
            </p>
            <p className="text-sm text-[#4A4A4A] mt-2">
              Save hours weekly with full loan automation.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Footer Note */}
      <p className="text-center text-xs sm:text-sm text-[#4A4A4A] mt-10 px-6">
        *Growth results reported by our clients using LoanCRM’s automation tools.
      </p>
    </section>
  );
};

export default GrowthSection;

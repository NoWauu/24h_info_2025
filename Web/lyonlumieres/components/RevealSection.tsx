"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface RevealSectionProps {
  children: ReactNode;
  delay?: number;
}

export default function RevealSection({
  children,
  delay = 0,
}: RevealSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true, amount: 0.3 }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}

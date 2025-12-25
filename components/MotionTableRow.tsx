"use client";

import { motion } from "framer-motion";

export default function MotionTableRow({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.tr
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
      className="border-t border-white/10"
    >
      {children}
    </motion.tr>
  );
}

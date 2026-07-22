"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/5521973199886?text=Ol%C3%A1!%20Vim%20pelo%20site%20JCGAMER%20e%20quero%20comprar%20um%20perif%C3%A9rico"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-4 md:bottom-6 md:right-6 z-40 w-12 h-12 md:w-14 md:h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-all hover:scale-105"
      style={{
        boxShadow: "0 0 20px rgba(34, 197, 94, 0.4)",
      }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 2, type: "spring", stiffness: 200 }}
    >
      <MessageCircle className="w-6 h-6 md:w-7 md:h-7 text-white" />
    </motion.a>
  );
}

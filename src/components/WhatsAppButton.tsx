"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/5521973199886?text=Ol%C3%A1!%20Vim%20pelo%20site%20JCGAMER%20e%20quero%20comprar%20um%20perif%C3%A9rico"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-all hover:scale-110"
      style={{
        boxShadow: "0 0 20px rgba(34, 197, 94, 0.4)",
      }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 2, type: "spring", stiffness: 200 }}
    >
      <MessageCircle className="w-7 h-7 text-white" />
    </motion.a>
  );
}

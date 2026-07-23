"use client";

import { Toaster } from "react-hot-toast";
import { CartProvider } from "@/lib/cart";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: "#0b1427",
            border: "1px solid rgba(255,255,255,.1)",
            color: "#fff",
            fontSize: "14px",
          },
        }}
      />
    </CartProvider>
  );
}

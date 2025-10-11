// src/components/toaster.tsx
"use client";

import { Toaster } from "react-hot-toast";

export const AppToaster = () => (
  <Toaster
    position="top-right"
    reverseOrder={false}
    toastOptions={{
      duration: 3000,
      style: {
        padding: "16px",
        borderRadius: "8px",
        color: "#fff",
      },
      success: {
        style: {
          background: "#22c55e",
        },
      },
      error: {
        style: {
          background: "#ef4444",
        },
      },
      loading: {
        style: {
          background: "#3b82f6",
        },
      },
    }}
  />
);

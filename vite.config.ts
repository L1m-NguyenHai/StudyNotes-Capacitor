import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Tách React và React-DOM ra chunk riêng
          "react-vendor": ["react", "react-dom"],
          // Tách Capacitor plugins ra chunk riêng
          capacitor: [
            "@capacitor/core",
            "@capacitor/preferences",
            "@capacitor/haptics",
          ],
          // Tách Lucide icons ra chunk riêng
          icons: ["lucide-react"],
        },
      },
    },
    // Tăng giới hạn cảnh báo chunk size lên 1000kb
    chunkSizeWarningLimit: 1000,
  },
});

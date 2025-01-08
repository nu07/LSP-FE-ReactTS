import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; // Plugin React untuk Vite
import AutoImport from "unplugin-auto-import/vite";
import path from "path"; // Untuk mengelola path di Node.js

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Alias untuk folder src
    },
  },
  plugins: [
    react(),
    AutoImport({
      imports: [
        "react", // Auto-import fungsi React (useState, useEffect, dll.)
      ],
      dts: "./src/auto-imports.d.ts", // Lokasi file deklarasi TypeScript
      eslintrc: {
        enabled: true, // Menghasilkan file .eslintrc-auto-import.json
        filepath: "./.eslintrc-auto-import.json", // Lokasi file konfigurasi ESLint
        globalsPropValue: true, // Tambahkan ke global scope
      },
      resolvers: [
        (name) => {
          // Daftar komponen Headless UI untuk auto-import
          const headlessUIComponents = [
            "Menu",
            "Popover",
            "Dialog",
            "Disclosure",
            "Listbox",
            "Switch",
            "RadioGroup",
            "Tab",
            "Transition",
          ];
          if (headlessUIComponents.includes(name)) {
            return { from: "@headlessui/react", name };
          }

          // Auto-import untuk ikon Heroicons
          if (name.endsWith("Icon")) {
            const style = name.includes("Outline") ? "outline" : "solid";
            return {
              from: `@heroicons/react/${style}`,
              name,
            };
          }

          return null; // Pastikan return null jika tidak cocok
        },
      ],
    }),
  ],
});

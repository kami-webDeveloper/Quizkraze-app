import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname, "");

  return {
    plugins: [react()],
    build: {
      outDir: "dist",
      emptyOutDir: true,
    },
    server: {
      proxy: env.VITE_API_TARGET?.includes("localhost")
        ? {
            "/api": {
              target: env.VITE_API_TARGET,
              changeOrigin: true,
              secure: false,
            },
          }
        : undefined,
    },
  };
});

import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";
import { corePlugins } from "../../packages/config/vite.base";

// https://vite.dev/config/
export default defineConfig({
  plugins: [...corePlugins, react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@root": path.resolve(__dirname, "../../"),

      "@dosoul/*": path.resolve(__dirname, "../../packages/*/src"),
    },
  },
  build: {
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  server: {
    // https: {
    //   key: fs.readFileSync(path.resolve(__dirname, "ssl/key.pem")),
    //   cert: fs.readFileSync(path.resolve(__dirname, "ssl/cert.pem")),
    // },
    host: true, // 또는 '0.0.0.0',
  },
});

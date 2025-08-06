import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { createServer } from "./server";

// ✅ Define Vite config
export default defineConfig(({ command }) => {
  const isDev = command === "serve";

  return {
    root: "client", // ✅ So Vite looks for index.html inside /client
    plugins: [react(), isDev ? expressPlugin() : undefined].filter(Boolean),

    build: {
      outDir: "dist", // ✅ This will generate client/dist
      emptyOutDir: true,
    },

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./client"),
        "@shared": path.resolve(__dirname, "./shared"),
      },
    },

    server: {
      host: "::",
      port: 5173,
    },
  };
});

// ✅ Express plugin only for dev
function expressPlugin(): Plugin {
  return {
    name: "express-plugin",
    apply: "serve", // Only apply during dev
    configureServer(server) {
      const app = createServer();
      server.middlewares.use(app);
    },
  };
}

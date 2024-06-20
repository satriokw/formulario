import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), TanStackRouterVite()],

    server: {
			proxy: {
				"/api": {
					target: env.VITE_FLOWABLE_API_HOSTNAME,
					changeOrigin: true,
					secure: false,
					rewrite: (p) => p.replace(/^\/api/, ""),
				},
			},
			cors: false,
		},
		preview: {
			proxy: {
				"/api": {
					target: env.VITE_FLOWABLE_API_HOSTNAME,
					changeOrigin: true,
					secure: false,
					rewrite: (p) => p.replace(/^\/api/, ""),
				},
			},
			cors: false,
		},
  }
});

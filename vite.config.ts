import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import fs from "fs";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
	plugins: [TanStackRouterVite(), react()],
	server: {
		https: {
			key: fs.readFileSync("./certs/localhost-key.pem"),
			cert: fs.readFileSync("./certs/localhost.pem"),
		},
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});

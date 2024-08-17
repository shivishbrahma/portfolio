import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
    base: "/",
    define: {
        "process.env.PUBLIC_URL": JSON.stringify(
            process.env.NODE_ENV === "production" ? "https://shivishbrahma.github.io/" : "http://localhost:5173/"
        ),
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    },
    plugins: [react({})],
    resolve: {
        extensions: [".js", ".jsx", ".json"],
        alias: {
            "@": path.resolve("src")
        }
    }
});

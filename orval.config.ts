import { defineConfig } from "orval";

export default defineConfig({
    api: {
        input: "http://localhost:8000/api/v1/schema",
        output: "./src/module/api.ts",
    },
});


import { defineConfig } from "orval";

export default defineConfig({
    api: {
        input: "http://localhost:8000/api/v1/schema",
        output: {
            target: "./src/module/api.ts",
            override: {
                mutator: {
                    path: "./src/module/axiosClient.ts",
                    name: "customInstance",
                },
            },
        },
    },
});


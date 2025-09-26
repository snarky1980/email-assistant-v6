import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

// We lint browser code by default but also have Node based config/build scripts.
// Provide a lightweight override for those to avoid false positives (process, __dirname, etc.).

export default [
  { ignores: ["dist", "assets", "**/assets/**"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
  // Node specific overrides for build/config scripts
  {
    files: ["vite.config.*.{js,jsx}", "**/scripts/**/*.{js,jsx}"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
    },
    rules: {
      // Allow dev config files to have unused vars for clarity (like command/mode)
      "no-unused-vars": ["warn", { varsIgnorePattern: "^[A-Z_]" }],
    },
  },
];

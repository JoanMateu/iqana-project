// eslint.config.js
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import prettier from "eslint-config-prettier";
import eslintPluginPrettier from "eslint-plugin-prettier";

export default [
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    ignores: [
        "dist/**",
        "node_modules/**",
        "eslint.config.js",
        "vite.config.ts"
      ],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
      parser: tseslint.parser, 
      parserOptions: {
        project: "./tsconfig.app.json",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommendedTypeChecked[0].rules,
      ...react.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "no-undef": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      ...prettier.rules,
      "prettier/prettier": ["error", {
        semi: true,
        singleQuote: false,
        tabWidth: 2,
        useTabs: false,
        trailingComma: "es5",
        bracketSpacing: true,
        arrowParens: "always",
      }],
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      react,
      "react-hooks": reactHooks,
      prettier: eslintPluginPrettier,
    },
  },
];

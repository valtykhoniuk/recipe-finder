import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";

export default tseslint.config(
  // Що ігноруємо
  {
    ignores: ["dist/**", "build/**", "coverage/**", "**/*.js", "**/*.mjs"],
  },

  // Базові JS правила
  eslint.configs.recommended,

  // TypeScript з type-checking
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,

  // Основна конфігурація для проєкту
  {
    files: ["**/*.{ts,tsx}"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        // сучасний підхід від typescript-eslint
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },

    plugins: {
      import: importPlugin,
      "simple-import-sort": simpleImportSort,
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "jsx-a11y": jsxA11yPlugin,
    },

    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        typescript: true,
      },
    },

    rules: {
      // ─── Базові JS / TS правила ─────────────────────
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "error",
      "no-var": "error",
      "prefer-const": "error",
      eqeqeq: ["error", "always"],

      // Вимикаємо базове правило і вмикаємо TS-версію
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],

      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksVoidReturn: {
            attributes: false,
          },
        },
      ],
      "@typescript-eslint/explicit-function-return-type": "off", // не мучимо за кожну функцію
      "@typescript-eslint/no-explicit-any": "warn",

      // ─── Імпорти ─────────────────────────────────────
      "import/order": "off", // замінюємо на simple-import-sort
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",

      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: [
            "**/*.test.*",
            "**/*.spec.*",
            "**/vitest.config.*",
            "**/jest.config.*",
            "**/webpack.config.*",
            "**/vite.config.*",
          ],
        },
      ],
      "import/no-cycle": [
        "warn",
        {
          maxDepth: 3,
        },
      ],

      // ─── React ───────────────────────────────────────
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off", // новий JSX-трансформ
      "react/prop-types": "off", // ми на TS

      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // ─── Accessibility ───────────────────────────────
      "jsx-a11y/alt-text": "warn",
      "jsx-a11y/anchor-is-valid": "warn",

      // ─── Стиль коду ─────────────────────────────────
      semi: ["error", "always"],
      quotes: ["error", "single", { avoidEscape: true }],
      "max-len": [
        "warn",
        {
          code: 120,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
        },
      ],
      "lines-between-class-members": [
        "error",
        "always",
        { exceptAfterSingleLine: true },
      ],
    },
  }
);

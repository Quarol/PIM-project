import globals from "globals";
import tseslint from "typescript-eslint";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx}"],
    plugins: { prettier },
    rules: {
      ...prettierConfig.rules,
      "prettier/prettier": "error"
    },
    languageOptions: {
      globals: globals.browser
    },
  },
  { files: ["**/*.js"], languageOptions: { sourceType: "script" } },
  ...tseslint.configs.recommended,
];

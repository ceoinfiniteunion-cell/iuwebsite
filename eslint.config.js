import html from "@html-eslint/eslint-plugin";
import parser from "@html-eslint/parser";

export default [
  {
    files: ["**/*.html"],
    plugins: { "@html-eslint": html },
    languageOptions: { parser },
    rules: {
      ...html.configs["flat/recommended"].rules,
      "@html-eslint/no-inline-styles": "off",
      "@html-eslint/require-lang": "off",
      "@html-eslint/no-target-blank": "warn"
    }
  }
];

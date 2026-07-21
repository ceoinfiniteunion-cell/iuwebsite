import html from "@html-eslint/eslint-plugin";
import parser from "@html-eslint/parser";

export default [
  {
    files: ["**/*.html"],
    plugins: { "@html-eslint": html },
    languageOptions: { parser },
    rules: {
      ...html.configs["flat/recommended"].rules,
      "@html-eslint/indent": "off",
      "@html-eslint/element-newline": "off",
      "@html-eslint/attrs-newline": "off",
      "@html-eslint/no-inline-styles": "off",
      "@html-eslint/require-lang": "off",
      "@html-eslint/no-target-blank": "warn",
      "@html-eslint/require-closing-tags": "warn",
      "@html-eslint/no-extra-spacing-tags": "warn",
      "@html-eslint/use-baseline": "off"
    }
  }
];

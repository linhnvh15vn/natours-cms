/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  endOfLine: "auto",
  singleQuote: true,
  jsxSingleQuote: false,
  trailingComma: "all",
  semi: true,
  arrowParens: "always",
  quoteProps: "as-needed",
  bracketSpacing: true,
  bracketSameLine: false,
};

export default config;

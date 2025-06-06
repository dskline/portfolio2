/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */
export default {
  "*.{js,jsx,ts,tsx,json,css}": "biome check --staged",
  "*.{ts,tsx}": () => "npm run test:smoke",
};

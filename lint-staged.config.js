/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */
export default {
  // if there's a change to any of these file types, run linting on staged files
  "*.{js,jsx,ts,tsx,json,css}": "biome check --staged",
  // if there's a change to any of these file types, run smoke tests
  "*.{ts,tsx}": () => "npm run test:smoke",
};

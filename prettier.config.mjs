// FlowPilot v1.0.0 — Prettier config.
// Uses prettier-plugin-tailwindcss for automatic class sorting.
// Do NOT modify without running: npx prettier --check .

/** @type {import('prettier').Config} */
const config = {
  plugins: ['prettier-plugin-tailwindcss'],
  semi: false,
  singleQuote: true,
}

export default config

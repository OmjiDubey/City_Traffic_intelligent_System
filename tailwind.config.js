export default {content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
      },
      colors: {
        navy: "#123B6D",
        primary: { DEFAULT: "#1976D2", hover: "#1565C0", light: "#E8F2FC" },
        canvas: "#F7F9FC",
        surface: "#FFFFFF",
        line: { DEFAULT: "#D9E2EC", soft: "#E9EEF4" },
        ink: "#172B4D",
        muted: "#5B6B7F",
        success: { DEFAULT: "#16A34A", ink: "#15803D", bg: "#E7F6EC" },
        warning: { DEFAULT: "#F59E0B", ink: "#B45309", bg: "#FEF4E2" },
        danger: { DEFAULT: "#DC2626", ink: "#B91C1C", bg: "#FDECEC" },
        info: { DEFAULT: "#0284C7", ink: "#0369A1", bg: "#E4F3FA" },
      },
      boxShadow: {
        card: "0 1px 2px rgba(18, 59, 109, 0.05)",
        pop: "0 8px 24px rgba(18, 59, 109, 0.12)",
      },
    },
  },
};

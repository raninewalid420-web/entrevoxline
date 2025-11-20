// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // selon ton projet
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FFFFFF", // Blanc principal
        secondary: "#0B1F3A", // Bleu foncé
        accentBlue: "#3B82F6", // Bleu clair
        accentRed: "#EF4444", // Rouge vif
        textPrimary: "#0B1F3A", // Texte principal
        textSecondary: "#1F2937", // Texte secondaire
        borderLight: "#E5E7EB", // Bordure / séparateur
        success: "#10B981", // Vert
        warning: "#F59E0B", // Jaune
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
// Ce fichier de configuration définit les paramètres pour Vite.
// Pour éviter les conflits de ports lorsque le serveur de développement
// est déjà démarré ailleurs (par ex. port 5173 utilisé par un autre
// projet), nous définissons ici un port alternatif et autorisons Vite
// à basculer automatiquement vers un autre port si nécessaire.
export default defineConfig(({ command, mode }) => {
  // Configuration de base pour GitHub Pages
  const base = mode === "production" ? "/email-assistant-v6/" : "/";

  return {
    base,
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      host: "0.0.0.0",
      // Port 5000 requis pour Replit
      port: 5000,
      // En définissant strictPort à false, Vite passera à un port
      // disponible si 5000 est déjà utilisé.
      strictPort: false,
      // Permettre toutes les origines pour Replit proxy
      allowedHosts: "all",
    },
    // Spécifier un port différent pour l'aperçu de production
    preview: {
      port: 5175,
    },
  };
});

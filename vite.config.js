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
  // Configuration de base pour GitHub Pages - utilise le nom du repo depuis package.json
  const repoName = process.env.GITHUB_REPOSITORY ? 
    process.env.GITHUB_REPOSITORY.split('/')[1] : 
    null; // pas de base path pour développement local
  const base = mode === "production" && repoName ? `/${repoName}/` : "/";
  // Port de développement strict et configurable
  const selectedPort = Number(process.env.VITE_PORT || process.env.PORT || 5173);

  return {
    base,
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      host: process.env.VITE_HOST || process.env.HOST || "0.0.0.0",
      // Utiliser un port strict configurable (par défaut 5173).
      // Vous pouvez surcharger avec `VITE_PORT` ou `PORT`.
      port: selectedPort,
      // strictPort à true empêche Vite de basculer sur un autre port
      strictPort: true,
      // Permettre toutes les origines pour Replit proxy
      allowedHosts: true,
    },
    // Spécifier un port différent pour l'aperçu de production
    preview: {
      port: 5175,
    },
  };
});

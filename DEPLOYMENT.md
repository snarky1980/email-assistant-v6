# 🚀 Guide de Déploiement - Email Assistant v6

Ce guide explique comment déployer Email Assistant v6 sur GitHub Pages et autres plateformes.

## 📋 Prérequis

- Node.js 18 ou supérieur
- npm ou pnpm
- Compte sur la plateforme de déploiement choisie

## 🌐 Options de Déploiement

### 1. GitHub Pages (Recommandé pour v6)

GitHub Pages offre un déploiement gratuit et automatique directement depuis votre repository.

#### Configuration Automatique (Pré-configurée)

Le projet v6 est déjà configuré avec :

- **Workflow GitHub Actions** : `.github/workflows/deploy.yml`
- **Configuration Vite** : Base path automatique pour GitHub Pages
- **Package.json** : Scripts et métadonnées optimisés

#### Étapes de déploiement :

1. **Créer le repository** `email-assistant-v6` sur GitHub
2. **Pousser le code** sur la branche `main`
3. **Activer GitHub Pages** : Settings > Pages > Source: GitHub Actions
4. **URL automatique** : `https://[USERNAME].github.io/email-assistant-v6/`

#### Workflow automatique

```yaml
# Déjà configuré dans .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pages: write
      id-token: write
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "18"
          cache: "npm"
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Deploy to GitHub Pages
        uses: actions/deploy-pages@v4
```

### 2. Vercel

Vercel offre un déploiement gratuit et automatique pour les projets React.

#### Déploiement automatique

1. Connectez votre repository GitHub à Vercel
2. Vercel détecte automatiquement Vite et configure le build
3. Chaque push sur `main` déclenche un redéploiement

#### Déploiement manuel

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter à Vercel
vercel login

# Déployer
vercel --prod
```

#### Configuration Vercel

Créez un fichier `vercel.json` :

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

### 2. Netlify

#### Via GitHub (Automatique)

1. Connectez votre repository à Netlify
2. Configuration de build :
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

#### Via Netlify CLI

```bash
# Installer Netlify CLI
npm install -g netlify-cli

# Se connecter
netlify login

# Déployer
netlify deploy --prod --dir=dist
```

### 3. GitHub Pages

#### Configuration automatique

Créez `.github/workflows/deploy.yml` :

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

#### Configuration manuelle

```bash
# Build du projet
npm run build

# Déployer avec gh-pages
npm install -g gh-pages
gh-pages -d dist
```

### 4. Firebase Hosting

```bash
# Installer Firebase CLI
npm install -g firebase-tools

# Se connecter
firebase login

# Initialiser Firebase
firebase init hosting

# Configuration dans firebase.json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}

# Déployer
firebase deploy
```

### 5. AWS S3 + CloudFront

```bash
# Build du projet
npm run build

# Synchroniser avec S3
aws s3 sync dist/ s3://votre-bucket-name --delete

# Invalider le cache CloudFront
aws cloudfront create-invalidation --distribution-id VOTRE-DISTRIBUTION-ID --paths "/*"
```

## ⚙️ Configuration de Production

### Variables d'environnement

Créez un fichier `.env.production` :

```env
VITE_APP_TITLE=Assistant Modèles de Courriels
VITE_APP_VERSION=2.0.0
VITE_API_URL=https://votre-api.com
```

### Optimisations de build

Dans `vite.config.prod.js` :

```js
export default defineConfig({
  build: {
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          ui: ["@radix-ui/react-select", "@radix-ui/react-dialog"],
        },
      },
    },
  },
});
```

## 🔧 Configuration du Serveur

### Headers de sécurité

Ajoutez ces headers pour la sécurité :

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
```

### Cache

Configuration pour optimiser le cache :

```
# Cache des assets statiques (1 an)
Cache-Control: public, max-age=31536000, immutable

# Cache de l'HTML (1 heure)
Cache-Control: public, max-age=3600
```

## 📊 Monitoring

### Analytics

Ajoutez Google Analytics ou Plausible :

```html
<!-- Dans index.html -->
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
></script>
```

### Performance

Utilisez Lighthouse CI pour surveiller les performances :

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [push]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run Lighthouse CI
        run: |
          npm install -g @lhci/cli@0.12.x
          lhci autorun
```

## 🐛 Dépannage

### Problèmes courants

#### 1. Erreur de build

```bash
# Nettoyer le cache
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### 2. Problème de routing (SPA)

Configurez les redirections pour les SPA :

```
# _redirects (Netlify)
/*    /index.html   200

# .htaccess (Apache)
RewriteEngine On
RewriteRule ^(?!.*\.).*$ /index.html [L]
```

#### 3. Problème de CORS

Configurez les headers CORS sur votre serveur ou utilisez un proxy.

## 📈 Optimisations Post-Déploiement

1. **Compression Gzip/Brotli** activée
2. **CDN** configuré pour les assets statiques
3. **Monitoring** des erreurs avec Sentry
4. **Tests automatisés** sur les déploiements
5. **Backup** régulier des données

---

**Pour toute question sur le déploiement, consultez la documentation de votre plateforme ou ouvrez une issue GitHub.** 🚀

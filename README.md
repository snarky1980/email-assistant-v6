# 📧 Email Assistant v6

[![Deploy to GitHub Pages](https://github.com/snarky1980/email-assistant-v6/actions/workflows/deploy.yml/badge.svg)](https://github.com/snarky1980/email-assistant-v6/actions/workflows/deploy.yml)

> Application React moderne pour la gestion et la génération de modèles de courriels professionnels avec surlignage des variables et typographie moderne

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.16-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 🎯 Fonctionnalités

### ✨ **NOUVEAU : Surlignage des Variables**

- **Variables automatiquement surlignées** dans les champs d'édition (Objet et Corps)
- **Identification visuelle en temps réel** des variables `<<nom_variable>>`
- **Typographie moderne** avec police Inter optimisée
- **Interface claire et professionnelle** sans superposition de texte

### ✅ Interface Moderne

- Design élégant avec gradients et animations fluides
- Interface responsive et optimisée
- Navigation intuitive et ergonomique

### ✅ Gestion Multilingue

- **Interface bilingue** : Français/Anglais
- **Modèles bilingues** : Sélection indépendante de la langue des templates
- Commutation fluide entre les langues

### ✅ Badges de Catégorie Colorés

- **Devis et estimations** : Badge bleu
- **Gestion de projets** : Badge vert
- **Problèmes techniques** : Badge rouge
- **Services spécialisés** : Badge ambre
- **Communications générales** : Badge violet

### ✅ Validation des Variables

- Validation en temps réel des champs
- Codes couleur par type de variable
- Messages de validation avec "OK"
- Bordures colorées selon l'état

### ✅ Surlignement des Variables

- Variables surlignées avec couleurs distinctives
- Identification visuelle par type
- Aperçu avec variables remplacées

### ✅ Copie Granulaire

- **Copier le lien** : Partage direct du template
- **Copier Objet** : Copie uniquement l'objet
- **Copier Corps** : Copie uniquement le corps du message
- **Copier Tout** : Copie objet + corps complet
- **Réinitialiser** : Reset des variables

### ✅ Fonctionnalités Avancées

- Recherche en temps réel dans les templates
- Filtrage par catégorie
- Sauvegarde automatique des préférences
- Support des liens profonds pour partage
- Raccourcis clavier pour une utilisation rapide

## 🚀 Utilisation

1. **Sélectionnez** un modèle dans la liste de gauche
2. **Ajustez** les variables selon vos besoins
3. **Éditez** directement le contenu final
4. **Copiez** l'email vers votre client de messagerie

## 🛠️ Technologies

- **React 18** - Interface utilisateur moderne
- **Vite** - Build tool et serveur de développement
- **Tailwind CSS** - Framework CSS utilitaire
- **shadcn/ui** - Composants UI modernes
- **Lucide React** - Icônes vectorielles
- **Inter Font** - Typographie professionnelle

## 🏗️ Architecture Technique

### Composant VariableEditor

Composant personnalisé pour l'édition avec surlignage des variables :

```jsx
<VariableEditor
  value={text}
  onChange={handleChange}
  placeholder="Votre texte..."
  minHeight="60px"
/>
```

**Fonctionnalités techniques :**

- Système d'overlay pour le surlignage en temps réel
- Synchronisation du scroll entre textarea et overlay
- Détection automatique des variables via regex `/<<([^>]+)>>/g`
- Typographie moderne avec Inter font et optimisations de rendu

### Structure du projet

```
src/
├── components/
│   ├── ui/                 # Composants UI réutilisables (shadcn/ui)
│   └── VariableEditor.jsx  # Éditeur avec surlignage des variables
├── utils/
│   └── storage.js          # Gestion du localStorage
├── App.jsx                 # Composant principal
├── App.css                 # Styles globaux avec typographie moderne
└── main.jsx               # Point d'entrée
```

## 📦 Installation Locale

```bash
# Cloner le repository
git clone https://github.com/VOTRE-USERNAME/email-assistant.git
cd email-assistant

# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Construire pour production
npm run build
```

## ▶️ Démarrage rapide (Dev) + Hôte/Port/LAN

Le serveur de développement Vite est configuré pour utiliser un port strict et peut être lié à un hôte spécifique.

- Port par défaut: `5173` (strict)
- Variables d'environnement supportées: `VITE_PORT` ou `PORT`, `VITE_HOST` ou `HOST`

Exemples (macOS/zsh):

```bash
# 1) Dev local (localhost:5173)
npm run dev

# 2) Dev avec port forcé
VITE_PORT=5173 npm run dev

# 3) Dev accessible sur le réseau local (téléphone/tablette)
VITE_PORT=5173 VITE_HOST=0.0.0.0 npm run dev
# Puis ouvrir l'URL « Network » affichée par Vite (ex.: http://192.168.x.x:5173/)
```

Scripts pratiques:

```bash
# Strict sur 5173 (localhost)
npm run dev:strict

# LAN (liaison 0.0.0.0) sur 5173
npm run dev:lan

# Au besoin: arrêter vite s'il tourne déjà
npm run clean:dev
```

## 🧯 Dépannage dev (macOS)

- Port occupé / serveur déjà lancé:
  - Symptôme: Vite s'arrête ou ne répond pas. Essayez `npm run clean:dev` puis relancez.
- Pas d'accès depuis un autre appareil (LAN):
  - Assurez-vous d'avoir lancé avec `VITE_HOST=0.0.0.0` (ou `npm run dev:lan`).
  - Vérifiez l'IP de votre Mac: Réglages Système > Réseau (ex.: 192.168.x.x) et utilisez l'URL « Network » que Vite affiche.
  - Vérifiez le pare-feu macOS (Sécurité > Pare-feu) et tout VPN/Proxy d'entreprise.
- La page « bouge » légèrement lors de l'ouverture d'un filtre:
  - Nous avons intégré des fix CSS (scrollbar-gutter, contain, isolation des popovers). Si vous voyez encore un micro-shift, rafraîchissez et réessayez; merci de noter le navigateur/version.

Astuce: Vous pouvez définir vos préférences dans un fichier `.env.local` (non commité) d'après `.env.example`.

## 🔧 Modification des Modèles

Les modèles d'email se trouvent dans `src/assets/complete_email_templates.json`.

### Ajouter un nouveau modèle :

```json
{
  "id": "mon_nouveau_modele",
  "category": "Ma Catégorie",
  "title": {
    "fr": "Titre en français",
    "en": "Title in English"
  },
  "description": {
    "fr": "Description en français",
    "en": "Description in English"
  },
  "subject": {
    "fr": "Objet: <<Variable>>",
    "en": "Subject: <<Variable>>"
  },
  "body": {
    "fr": "Corps du message en français...",
    "en": "Message body in English..."
  },
  "variables": ["Variable"]
}
```

## 🌐 Déploiement

Ce projet est configuré pour un déploiement automatique sur GitHub Pages via GitHub Actions.

Chaque push sur la branche `main` déclenche automatiquement :

1. Installation des dépendances
2. Build de production
3. Déploiement sur GitHub Pages

## 📝 Licence

Ce projet est destiné à un usage interne du Bureau de la traduction.

## 🤝 Contribution

Pour ajouter des modèles ou améliorer l'interface :

1. Forkez le repository
2. Créez une branche pour vos modifications
3. Testez vos changements localement
4. Soumettez une Pull Request

## 📞 Support

Pour toute question ou problème, contactez l'équipe de développement.

---

**Bureau de la traduction** - Assistant pour rédaction de courriels aux clients

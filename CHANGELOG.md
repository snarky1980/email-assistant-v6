# Changelog

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [6.0.0] - 2024-09-23

### ✨ Ajouté

- **Surlignage intelligent perfectionné** : Toutes les variables sont maintenant surlignées avec précision
- **Mode lecture/édition** : Interface intuitive pour basculer entre visualisation et édition
- **Scrollbar permanente** : Navigation améliorée dans la liste des modèles avec scrollbar toujours visible
- **Zone d'affichage élargie** : Plus de modèles visibles simultanément (600px de hauteur)
- **Algorithme de correspondance avancé** : Gestion précise des nombres, texte et formatage spécial
- **Support des symboles** : Reconnaissance des variables suivies de "$", "€", espaces, etc.
- **Configuration GitHub Pages** : Déploiement automatique via GitHub Actions

### 🔧 Amélioré

- **Performance de rendu** : Optimisation majeure de l'algorithme de surlignage
- **Interface utilisateur** : Suppression complète des artefacts visuels parasites
- **Expérience utilisateur** : Navigation plus fluide et découverte améliorée des modèles
- **Compatibilité** : Meilleur support des patterns de texte complexes
- **Accessibilité** : Contraste et lisibilité optimisés

### 🐛 Corrigé

- **Surlignage manquant** : Variables courtes (1-2 caractères) maintenant détectées
- **Artefacts visuels** : Suppression des points/ronds parasites dans les champs de saisie
- **Alignement** : Correction du décalage entre surlignage et texte
- **Performance** : Élimination des ralentissements lors de la saisie rapide
- **Formatage spécial** : Gestion correcte des nombres suivis de symboles ($, €)

### 🗑️ Supprimé

- **Validations redondantes** : Suppression des messages "Valide/Requis" encombrants
- **Overlay complexe** : Remplacement par une solution plus simple et fiable
- **Filtres restrictifs** : Suppression des limitations sur les variables courtes

## [2.0.0] - 2024-09-15

### ✨ Ajouté

- **Surlignage des variables en temps réel** dans les champs d'édition (Objet et Corps)
- **Composant VariableEditor personnalisé** avec système d'overlay pour le surlignage
- **Typographie moderne** avec police Inter et optimisations de rendu
- **Détection automatique des variables** via regex `/<<([^>]+)>>/g`
- **Synchronisation du scroll** entre textarea et overlay de surlignage
- **Transitions fluides** et animations améliorées
- **Documentation technique complète** avec exemples de code

### 🎨 Amélioré

- **Police Inter** avec font-feature-settings optimisées
- **Espacement des lettres** et hauteur de ligne améliorés
- **Rendu des polices** avec antialiasing et optimisations
- **Styles des variables** avec ombres subtiles et coins arrondis
- **Lisibilité générale** de l'interface utilisateur
- **Performance** du rendu des composants

### 🔧 Technique

- Remplacement de `@uiw/react-textarea-code-editor` par `VariableEditor` personnalisé
- Amélioration des styles CSS avec typographie moderne
- Optimisation des performances de rendu
- Code mieux documenté et maintenable

### 🐛 Corrigé

- Variables non surlignées dans les champs d'édition
- Problèmes de lisibilité avec l'ancienne typographie
- Incohérences dans le rendu des polices

## [1.0.0] - 2024-09-13

### ✨ Ajouté

- **Interface multilingue** (Français/Anglais)
- **Gestion des templates** avec recherche et filtrage
- **Validation des variables** en temps réel
- **Badges de catégorie colorés** pour l'organisation
- **Copie granulaire** (objet, corps, ou tout)
- **Raccourcis clavier** pour une utilisation rapide
- **Sauvegarde automatique** des préférences
- **Support des liens profonds** pour partage
- **Interface responsive** et moderne
- **Système de variables** avec types et validation

### 🎨 Design

- Interface élégante avec gradients et animations
- Navigation intuitive et ergonomique
- Codes couleur par type de variable
- Messages de validation avec indicateurs visuels

### 🛠️ Technologies

- React 18 avec hooks modernes
- Vite pour le build et développement
- TailwindCSS pour les styles
- shadcn/ui pour les composants
- Lucide React pour les icônes

---

## Types de changements

- `✨ Ajouté` pour les nouvelles fonctionnalités
- `🎨 Amélioré` pour les changements dans les fonctionnalités existantes
- `🐛 Corrigé` pour les corrections de bugs
- `🔧 Technique` pour les changements techniques sans impact utilisateur
- `🗑️ Supprimé` pour les fonctionnalités supprimées

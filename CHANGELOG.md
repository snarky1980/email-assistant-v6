# Changelog

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

_Aucune modification pour le moment._

## [7.2.3] - 2025-09-26

### ✨ Ajouté

- Export HTML du courriel courant (fichier .html téléchargeable et copie HTML dans le presse‑papiers)
- Regroupement des actions d'export dans un menu « Plus » discret (EML, HTML, Copier HTML) pour réduire la charge visuelle

### 🎨 Amélioré

- Barre d’actions sous l’éditeur simplifiée avec un bouton « Plus » et icônes
- Largeur et marges de la zone de travail stabilisées (~1" de chaque côté) pour préserver la lisibilité

### 🐛 Corrigé

- Léger décalage horizontal lors de l’ouverture du filtre de catégories (stabilisation de la scrollbar, Select non‑modal, neutralisation du scroll‑lock)

## [7.1.0] - 2025-09-25

## [7.2.0] - 2025-09-26

### ✨ Ajouté

- Favoris (local uniquement) avec étoile sur chaque modèle et section dédiée en haut de la liste
- Récents (local uniquement) avec logique MRU; exclus des Favoris pour éviter les doublons
- Persistance des Favoris/Récents via localStorage; nettoyage automatique si des modèles disparaissent

### 🎨 Amélioré

- Sélection via lien profond (paramètre `?id=`) met maintenant à jour la liste des Récents
- Icône « étoile » cohérente (remplie quand en favori) dans toutes les sections

### 🐛 Corrigé

- Correction d’un déséquilibre JSX (<CardContent>) introduit lors de l’intégration des sections

## [7.2.1] - 2025-09-26

### ✨ Ajouté

- Catégorie spéciale « Favoris » dans le filtre, affichant uniquement les modèles étoilés

### 🎨 Amélioré

- Recherche plus intelligente et rapide (débounce 200ms) avec tri par pertinence
- Recherche multilingue: analyse les titres/descriptions FR et EN simultanément (léger bonus à la langue affichée)
- Synonymes courants intégrés: EN (quote ↔ estimate ↔ quotation, proposals) et FR (devis ↔ soumission ↔ estimation)
- Résultats robustes pour pluriels, accents et débuts de mots
- Message « Aucun résultat » convivial avec suggestion


### ✨ Ajouté

- Indicateurs de débordement en haut et en bas des listes (fades discrets)
- Auto-redimensionnement des éditeurs (Objet et Corps) pour s’adapter au contenu

### 🎨 Amélioré

- Bannière mise en valeur: séparateur inférieur plus marqué, halo interne doux, sous-lueur au scroll, icône enveloppe 150% plus grande, et couches de « pills » horizontales
- Zone de travail fusionnée avec l’arrière‑plan du site pour une intégration sans couture; suppression des lavis internes
- Motifs latéraux très discrets et asymétriques (capsules verticales), positionnés hors de la zone de travail avec masques de fondu vers l’intérieur
- En‑têtes des cartes unifiés en teal plein (alignés sur « Variables »)
- Titre centré dans l’en‑tête de gauche; poignée de redimensionnement légèrement plus visible mais subtile
- Masques d’auto‑atténuation sur les pilules côté droit pour éviter tout effet de « demi‑pilule »
- Overlays de fondu aux bords droit et bas pour éliminer toute lueur blanche résiduelle

### 🛠️ Technique

- Unification de l’arrière‑plan via variables CSS; clip horizontal (overflow‑x) pour éviter les lignes blanches
- Réorganisation et masquage des SVG décoratifs hors zone de travail
- Sauvegarde d’état plus sûre (catégorie/varsOpen enregistrés seulement après interaction de l’utilisateur)

### 🐛 Corrigé

- Artefacts/halos blancs sur les bords droit et inférieur
- Apparition de « demi‑pilules » sur certains formats d’écran

## [7.2.2] - 2025-09-26

### ✨ Ajouté

- Export .eml (Outlook) du courriel courant (objet RFC 2047, corps UTF‑8, CRLF)

### 🎨 Amélioré

- Boutons sous l’éditeur rendus compacts et responsive; labels courts en mobile
- Largeur par défaut du panneau gauche augmentée pour mieux accueillir l’en‑tête
- Éditeur recentré avec marges latérales ~1" et zone d’édition élargie
- Titre principal agrandi et décalé à droite (~2") avec hiérarchie renforcée

### 🗑️ Supprimé

- Capsules/graphismes décoratifs en arrière‑plan (conserve uniquement le fond bleu)

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

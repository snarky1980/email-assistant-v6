# 🤝 Guide de Contribution - Email Assistant v6

Merci de votre intérêt pour contribuer à Email Assistant v6 ! Ce guide vous aidera à comprendre comment contribuer efficacement au projet.

## 🚀 Démarrage rapide

### Prérequis

- Node.js 18 ou supérieur
- npm ou pnpm
- Git

### Configuration de l'environnement de développement

```bash
# 1. Forker le repository sur GitHub
# 2. Cloner votre fork
git clone https://github.com/VOTRE-USERNAME/email-assistant.git
cd email-assistant

# 3. Installer les dépendances
npm install

# 4. Démarrer le serveur de développement
npm run dev
```

## 📋 Types de contributions

### 🐛 Rapports de bugs

- Utilisez les issues GitHub avec le label `bug`
- Incluez les étapes pour reproduire le problème
- Précisez votre environnement (OS, navigateur, version)

### ✨ Nouvelles fonctionnalités

- Ouvrez d'abord une issue pour discuter de la fonctionnalité
- Attendez l'approbation avant de commencer le développement
- Suivez les conventions de code existantes

### 📝 Amélioration de la documentation

- Corrections de typos
- Clarifications
- Ajout d'exemples

### 🎨 Améliorations UI/UX

- Respectez le design system existant
- Testez sur différentes tailles d'écran
- Maintenez l'accessibilité

## 🔧 Processus de développement

### 1. Créer une branche

```bash
git checkout -b feature/nom-de-la-fonctionnalite
# ou
git checkout -b fix/description-du-bug
```

### 2. Conventions de nommage des branches

- `feature/` : Nouvelles fonctionnalités
- `fix/` : Corrections de bugs
- `docs/` : Documentation
- `style/` : Améliorations visuelles
- `refactor/` : Refactoring de code

### 3. Conventions de commits

Utilisez le format [Conventional Commits](https://www.conventionalcommits.org/) :

```
type(scope): description

feat(editor): add variable highlighting in real-time
fix(ui): resolve scroll synchronization issue
docs(readme): update installation instructions
style(variables): improve visual contrast for variables
```

Types principaux :

- `feat` : Nouvelle fonctionnalité
- `fix` : Correction de bug
- `docs` : Documentation
- `style` : Changements visuels
- `refactor` : Refactoring
- `test` : Tests
- `chore` : Maintenance

### 4. Standards de code

#### JavaScript/React

```jsx
// ✅ Bon
const VariableEditor = ({ value, onChange, placeholder }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = useCallback(
    (e) => {
      onChange(e);
    },
    [onChange]
  );

  return (
    <div className="editor-container">{/* Composant bien structuré */}</div>
  );
};

// ❌ Éviter
function variableEditor(props) {
  // Code non structuré
}
```

#### CSS/Styling

- Utilisez TailwindCSS pour les styles
- Préférez les classes utilitaires aux styles personnalisés
- Maintenez la cohérence avec le design system

```jsx
// ✅ Bon
<div className="bg-white rounded-lg shadow-md p-4 transition-all duration-200">

// ❌ Éviter
<div style={{ backgroundColor: 'white', borderRadius: '8px' }}>
```

### 5. Tests

```bash
# Lancer les tests
npm run test

# Vérifier le linting
npm run lint

# Build de production
npm run build
```

### 6. Pull Request

#### Checklist avant soumission

- [ ] Le code suit les conventions du projet
- [ ] Les tests passent
- [ ] La documentation est mise à jour si nécessaire
- [ ] Les changements sont testés manuellement
- [ ] Le build de production fonctionne

#### Template de Pull Request

```markdown
## Description

Brève description des changements

## Type de changement

- [ ] Bug fix
- [ ] Nouvelle fonctionnalité
- [ ] Breaking change
- [ ] Documentation

## Tests

- [ ] Tests unitaires ajoutés/mis à jour
- [ ] Tests manuels effectués
- [ ] Build de production testé

## Screenshots (si applicable)

[Ajoutez des captures d'écran pour les changements visuels]

## Checklist

- [ ] Code review auto-effectué
- [ ] Documentation mise à jour
- [ ] Changements testés
```

## 🎯 Zones de contribution prioritaires

### 1. Amélioration du VariableEditor

- Performance du surlignage
- Support de nouveaux types de variables
- Amélioration de l'accessibilité

### 2. Templates

- Ajout de nouveaux templates
- Amélioration des catégories
- Support de nouvelles langues

### 3. Interface utilisateur

- Amélioration de l'expérience mobile
- Nouvelles fonctionnalités d'accessibilité
- Optimisations de performance

### 4. Documentation

- Guides d'utilisation
- Documentation technique
- Exemples d'intégration

## 🔍 Review Process

1. **Review automatique** : GitHub Actions vérifie le build et les tests
2. **Review par les pairs** : Au moins une approbation requise
3. **Tests manuels** : Vérification des fonctionnalités
4. **Merge** : Fusion dans la branche principale

## 📞 Support

- **Issues GitHub** : Pour les bugs et demandes de fonctionnalités
- **Discussions** : Pour les questions générales
- **Email** : Pour les questions sensibles

## 🙏 Reconnaissance

Tous les contributeurs sont reconnus dans le fichier [CONTRIBUTORS.md](CONTRIBUTORS.md) et dans les releases notes.

---

**Merci de contribuer à l'amélioration de l'Assistant Modèles de Courriels !** 🎉

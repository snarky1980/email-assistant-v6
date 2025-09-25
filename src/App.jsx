import React, { useState, useEffect, useMemo, useRef } from "react";
import { loadState, saveState } from "@/utils/storage";
import {
  Search,
  FileText,
  Copy,
  RotateCcw,
  Languages,
  Filter,
  Globe,
  Sparkles,
  Mail,
  Edit3,
  Link,
} from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";
import HighlightingEditor from "./components/HighlightingEditor";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.jsx";
import { Separator } from "@/components/ui/separator.jsx";
import { ScrollArea } from "@/components/ui/scroll-area.jsx";
import "./App.css";

// Custom CSS for modern typography and variable highlighting
const customEditorStyles = `
  /* Translation Bureau Brand Colors */
  :root {
    --tb-navy: #1e3a5f;          /* Deep navy blue (primary) */
    --tb-teal: #2dd4bf;          /* Bright teal (accent) */
    --tb-mint: #a7f3d0;          /* Light mint green (secondary) */
    --tb-lime: #bef264;          /* Soft yellow-green (highlight) */
    --tb-cream: #fefefe;         /* Clean white/cream (neutral) */
    --tb-gray: #6b7280;          /* Supporting gray */
    --tb-light-gray: #f8fafc;   /* Very light gray for backgrounds */
  }

  /* Modern typography base */
  * {
    font-feature-settings: "kern" 1, "liga" 1, "calt" 1;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  /* Enhanced variable highlighting styles */
  .variable-highlight {
    background-color: #fef3c7;
    color: #d97706;
    padding: 3px 6px;
    border-radius: 6px;
    font-weight: 600;
    font-size: 15px;
    border: 1px solid #f59e0b;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    letter-spacing: 0.005em;
  }
  
  /* Scrollbar always visible */
  [data-slot="scroll-area-scrollbar"] {
    opacity: 1 !important;
    visibility: visible !important;
  }
  
  [data-slot="scroll-area-thumb"] {
    background-color: #cbd5e1 !important;
    opacity: 1 !important;
  }
  
  [data-slot="scroll-area-scrollbar"]:hover [data-slot="scroll-area-thumb"] {
    background-color: #94a3b8 !important;
  }
  
  /* Supprimer les artefacts visuels dans les inputs */
  input[type="text"], input[type="number"], input {
    list-style: none !important;
    list-style-type: none !important;
    background-image: none !important;
  }
  
  input::before, input::after {
    content: none !important;
    display: none !important;
  }
  
  /* Supprimer les points/ronds parasites */
  input::-webkit-list-button {
    display: none !important;
  }
  
  input::-webkit-calendar-picker-indicator {
    display: none !important;
  }
  
  /* Modern editor typography */
  .editor-container {
    position: relative;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
  }
  
  .editor-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    padding: 16px;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.7;
    letter-spacing: 0.01em;
    white-space: pre-wrap;
    word-wrap: break-word;
    overflow: hidden;
    color: transparent;
    z-index: 1;
  }
  
  .editor-overlay .variable {
    background-color: #fef3c7;
    color: #d97706;
    padding: 3px 6px;
    border-radius: 6px;
    font-weight: 600;
    font-size: 15px;
    border: 1px solid #f59e0b;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    letter-spacing: 0.005em;
  }
  
  .editor-textarea {
    position: relative;
    z-index: 2;
    background: transparent !important;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
    font-weight: 400;
    letter-spacing: 0.01em;
  }
  
  /* Input field typography improvements */
  input, textarea {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif !important;
    font-weight: 400;
    letter-spacing: 0.01em;
  }
`;

function App() {
  // Inject custom styles for variable highlighting
  useEffect(() => {
    const styleElement = document.createElement("style");
    styleElement.textContent = customEditorStyles;
    document.head.appendChild(styleElement);
    return () => document.head.removeChild(styleElement);
  }, []);

  // Charger l'état sauvegardé
  const savedState = loadState();

  // État pour les données des templates
  const [templatesData, setTemplatesData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Séparer la langue de l'interface de la langue des modèles
  const [interfaceLanguage, setInterfaceLanguage] = useState(
    savedState.interfaceLanguage || "fr"
  ); // Langue de l'interface
  const [templateLanguage, setTemplateLanguage] = useState(
    savedState.templateLanguage || "fr"
  ); // Langue des modèles
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [searchQuery, setSearchQuery] = useState(savedState.searchQuery || "");
  const [selectedCategory, setSelectedCategory] = useState(
    savedState.selectedCategory || "all"
  );
  const [finalSubject, setFinalSubject] = useState(""); // Version finale éditable
  const [finalBody, setFinalBody] = useState(""); // Version finale éditable
  const [variables, setVariables] = useState(savedState.variables || {});
  const [copySuccess, setCopySuccess] = useState(false);

  // 🎯 RÉFÉRENCES POUR LES RACCOURCIS CLAVIER
  const searchRef = useRef(null); // Référence pour focus sur la recherche (Ctrl+J)

  // Sauvegarder automatiquement les préférences importantes
  useEffect(() => {
    saveState({
      interfaceLanguage,
      templateLanguage,
      searchQuery,
      selectedCategory,
      variables,
    });
  }, [
    interfaceLanguage,
    templateLanguage,
    searchQuery,
    selectedCategory,
    variables,
  ]);

  // Textes de l'interface selon la langue
  const interfaceTexts = {
    fr: {
      title: "Assistant pour rédaction de courriels aux clients",
      subtitle: "Bureau de la traduction",
      selectTemplate: "Sélectionnez un modèle",
      templatesCount: `modèles disponibles`,
      searchPlaceholder: "🔍 Rechercher un modèle...",
      allCategories: "Toutes les catégories",
      categories: {
        "Devis et estimations": "Devis et estimations",
        "Gestion de projets": "Gestion de projets",
        "Problèmes techniques": "Problèmes techniques",
        "Communications générales": "Communications générales",
        "Services spécialisés": "Services spécialisés",
      },
      templateLanguage: "Langue du modèle:",
      interfaceLanguage: "Langue de l'interface:",
      variables: "Variables",
      editEmail: "Éditez votre courriel",
      subject: "Objet",
      body: "Corps du message",
      reset: "Réinitialiser",
      copy: "Copier",
      copySubject: "Copier Objet",
      copyBody: "Copier Corps",
      copyAll: "Copier Tout",
      copied: "Copié !",
      noTemplate: "Sélectionnez un modèle pour commencer",
    },
    en: {
      title: "Email Writing Assistant for Clients",
      subtitle: "Translation Bureau",
      selectTemplate: "Select a template",
      templatesCount: `templates available`,
      searchPlaceholder: "🔍 Search for a template...",
      allCategories: "All categories",
      categories: {
        "Devis et estimations": "Quotes and estimates",
        "Gestion de projets": "Project management",
        "Problèmes techniques": "Technical issues",
        "Communications générales": "General communications",
        "Services spécialisés": "Specialized services",
      },
      templateLanguage: "Template language:",
      interfaceLanguage: "Interface language:",
      variables: "Variables",
      editEmail: "Edit your email",
      subject: "Subject",
      body: "Message body",
      reset: "Reset",
      copy: "Copy",
      copySubject: "Copy Subject",
      copyBody: "Copy Body",
      copyAll: "Copy All",
      copied: "Copied!",
      noTemplate: "Select a template to get started",
    },
  };

  const t = interfaceTexts[interfaceLanguage];

  // Charger les données des templates au démarrage
  useEffect(() => {
    const loadTemplatesData = async () => {
      try {
        const response = await fetch("./complete_email_templates.json");
        if (!response.ok) {
          throw new Error("Failed to load templates data");
        }
        const data = await response.json();
        setTemplatesData(data);
      } catch (error) {
        console.error("Error loading templates data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTemplatesData();
  }, []);

  /**
   * 🔗 SUPPORT DES PARAMÈTRES URL POUR PARTAGE DE LIENS PROFONDS
   *
   * Permet de partager des liens directs vers un template spécifique :
   * - ?id=devis_avec_approbation : Pré-sélectionne ce template
   * - &lang=en : Force la langue anglaise
   *
   * Exemple d'URL complète :
   * https://monsite.com/email-assistant/?id=devis_avec_approbation&lang=en
   *
   * UX: Idéal pour partager des liens dans Teams/Slack vers un template précis
   */
  useEffect(() => {
    if (!templatesData) return;

    // 📖 Lire les paramètres de l'URL actuelle
    const params = new URLSearchParams(window.location.search);
    const templateId = params.get("id");
    const langParam = params.get("lang");

    // 🌐 Appliquer la langue depuis l'URL si spécifiée et valide
    if (langParam && ["fr", "en"].includes(langParam)) {
      setTemplateLanguage(langParam);
      setInterfaceLanguage(langParam);
    }

    // 🎯 Pré-sélectionner le template depuis l'URL
    if (templateId) {
      const template = templatesData.templates.find((t) => t.id === templateId);
      if (template) {
        setSelectedTemplate(template);
      }
    }
  }, [templatesData]); // Se déclenche quand les templates sont chargés

  /**
   * ⌨️ RACCOURCIS CLAVIER POUR UNE UX PROFESSIONNELLE
   *
   * Raccourcis inspirés des logiciels professionnels pour une utilisation rapide :
   * - Ctrl/Cmd + Enter : Copier tout l'email (action principale)
   * - Ctrl/Cmd + B : Copier le corps seulement (Body)
   * - Ctrl/Cmd + J : Focus sur la recherche (Jump to search)
   *
   * Compatible Mac (Cmd) et PC (Ctrl) pour une expérience universelle
   */
  useEffect(() => {
    const handleKeyDown = (e) => {
      // 🚀 Ctrl/Cmd + Enter : Copier tout (action rapide principale)
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        if (selectedTemplate) {
          copyToClipboard("all");
        }
      }

      // 📝 Ctrl/Cmd + B : Copier le corps seulement (Body)
      if ((e.ctrlKey || e.metaKey) && e.key === "b") {
        e.preventDefault();
        if (selectedTemplate) {
          copyToClipboard("body");
        }
      }

      // 🔍 Ctrl/Cmd + J : Focus sur la recherche (Jump to search)
      if ((e.ctrlKey || e.metaKey) && e.key === "j") {
        e.preventDefault();
        if (searchRef.current) {
          searchRef.current.focus();
        }
      }
    };

    // 🎯 Attacher les événements clavier globalement
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedTemplate]); // Re-bind quand le template change

  // Filtrer les modèles selon la recherche et la catégorie
  const filteredTemplates = useMemo(() => {
    if (!templatesData) return [];
    let filtered = templatesData.templates;

    if (searchQuery) {
      filtered = filtered.filter(
        (template) =>
          template.title[templateLanguage]
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          template.description[templateLanguage]
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          template.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (template) => template.category === selectedCategory
      );
    }

    return filtered;
  }, [templatesData, searchQuery, selectedCategory, templateLanguage]);

  // Obtenir les catégories uniques
  const categories = useMemo(() => {
    if (!templatesData) return [];
    const cats = [...new Set(templatesData.templates.map((t) => t.category))];
    return cats;
  }, [templatesData]);

  // Remplacer les variables dans le texte
  const replaceVariables = (text) => {
    let result = text;
    Object.entries(variables).forEach(([varName, value]) => {
      const regex = new RegExp(`<<${varName}>>`, "g");
      result = result.replace(regex, value || `<<${varName}>>`);
    });
    return result;
  };

  /**
   * 🎨 SURBRILLANCE DES VARIABLES DANS LE TEXTE
   *
   * Convertit le texte avec variables en JSX avec surbrillance colorée
   * - Variables remplies : fond vert clair
   * - Variables vides : fond orange clair avec bordure
   * - Couleurs distinctes pour faciliter l'identification
   */
  /**
   * 🎨 FONCTION DE SURLIGNAGE DES VARIABLES - VERSION DISCRÈTE
   *
   * Applique un surlignage doux et discret aux variables dans le texte
   * Utilise des couleurs pastel pour une meilleure lisibilité
   *
   * @param {string} text - Texte contenant des variables au format <<variable>>
   * @returns {JSX.Element[]} - Tableau d'éléments React avec surlignage
   */
  const highlightVariables = (text) => {
    if (!text) return text;

    /**
     * 🎨 PALETTE DE COULEURS DISCRÈTES
     * Couleurs pastel pour un rendu professionnel et agréable
     */
    const VARIABLE_COLORS = {
      email: "bg-blue-50 text-blue-700 border-blue-200", // Bleu doux pour emails
      phone: "bg-green-50 text-green-700 border-green-200", // Vert doux pour téléphones
      date: "bg-purple-50 text-purple-700 border-purple-200", // Violet doux pour dates
      number: "bg-amber-50 text-amber-700 border-amber-200", // Ambre doux pour nombres
      default: "bg-indigo-50 text-indigo-700 border-indigo-200", // Indigo par défaut
      unknown: "bg-gray-50 text-gray-600 border-gray-200", // Gris pour variables inconnues
    };

    /**
     * 🎯 STYLES DE BASE POUR LE SURLIGNAGE
     * Classes Tailwind pour un rendu discret et élégant
     */
    const BASE_HIGHLIGHT_CLASSES =
      "inline px-1.5 py-0.5 rounded text-xs font-medium border transition-all duration-200";

    // Fonction pour obtenir la couleur selon le type de variable
    const getVariableColor = (variableName) => {
      const variableInfo = templatesData?.variables?.[variableName];

      if (!variableInfo) {
        return VARIABLE_COLORS.unknown;
      }

      // Retourner la couleur selon le type, ou la couleur par défaut
      return VARIABLE_COLORS[variableInfo.type] || VARIABLE_COLORS.default;
    };

    // Diviser le texte en parties pour identifier les variables (format <<variable>>)
    const textParts = text.split(/(<<[^>]+>>)/g);

    return textParts.map((part, index) => {
      // Vérifier si cette partie est une variable
      const variableMatch = part.match(/^<<([^>]+)>>$/);

      if (variableMatch) {
        const variableName = variableMatch[1];
        const variableValue = variables[variableName];
        const colorClasses = getVariableColor(variableName);
        const isEmptyValue = !variableValue || variableValue.trim() === "";

        // Classes pour l'état vide (animation pulse + bordure pointillée)
        const emptyStateClasses = isEmptyValue
          ? "animate-pulse border-dashed"
          : "border-solid";

        // Tooltip informatif
        const tooltipText = `Variable: ${variableName}${
          isEmptyValue ? " (vide)" : ` = ${variableValue}`
        }`;

        return (
          <span
            key={index}
            className={`${BASE_HIGHLIGHT_CLASSES} ${colorClasses} ${emptyStateClasses}`}
            title={tooltipText}
          >
            {variableValue || `<<${variableName}>>`}
          </span>
        );
      }

      // Retourner le texte normal sans modification
      return part;
    });
  };

  // Charger un modèle sélectionné
  useEffect(() => {
    if (selectedTemplate) {
      // Initialiser les variables avec des valeurs par défaut
      const initialVars = {};
      selectedTemplate.variables.forEach((varName) => {
        const varInfo = templatesData.variables[varName];
        if (varInfo) {
          initialVars[varName] = varInfo.example || "";
        }
      });
      setVariables(initialVars);

      // Mettre à jour les versions finales avec les variables remplacées
      const subjectWithVars = replaceVariables(
        selectedTemplate.subject[templateLanguage] || ""
      );
      const bodyWithVars = replaceVariables(
        selectedTemplate.body[templateLanguage] || ""
      );
      setFinalSubject(subjectWithVars);
      setFinalBody(bodyWithVars);
    }
  }, [selectedTemplate, templateLanguage]);

  // Mettre à jour les versions finales quand les variables changent
  useEffect(() => {
    if (selectedTemplate) {
      const subjectWithVars = replaceVariables(
        selectedTemplate.subject[templateLanguage] || ""
      );
      const bodyWithVars = replaceVariables(
        selectedTemplate.body[templateLanguage] || ""
      );
      setFinalSubject(subjectWithVars);
      setFinalBody(bodyWithVars);
    }
  }, [variables, selectedTemplate, templateLanguage]);

  /**
   * 📋 FONCTION DE COPIE GRANULAIRE
   * Permet de copier différentes parties de l'email selon le besoin de l'utilisateur
   *
   * @param {string} type - Type de contenu à copier ('subject', 'body', 'all')
   *
   * UX: Chaque type de copie a son propre bouton avec des couleurs distinctives
   * - Objet (bleu) : Pour coller uniquement dans le champ "Subject" d'Outlook/Teams
   * - Corps (vert) : Pour coller le contenu principal sans l'objet
   * - Tout (gradient) : Copie complète avec objet + corps (comportement original)
   */
  const copyToClipboard = async (type = "all") => {
    let content = "";

    // 🎯 Sélection du contenu selon le type demandé
    switch (type) {
      case "subject":
        content = finalSubject;
        break;
      case "body":
        content = finalBody;
        break;
      case "all":
      default:
        content = `${finalSubject}\n\n${finalBody}`;
        break;
    }

    try {
      // 🔒 Méthode moderne et sécurisée (HTTPS requis)
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(content);
      } else {
        // 🔄 Fallback pour navigateurs anciens ou contextes non-sécurisés
        const textArea = document.createElement("textarea");
        textArea.value = content;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        textArea.remove();
      }

      // ✅ Feedback visuel de succès (2 secondes)
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      console.error("Erreur lors de la copie:", error);
      // 🚨 Gestion d'erreur avec message utilisateur
      alert(
        "Erreur lors de la copie. Veuillez sélectionner le texte manuellement et utiliser Ctrl+C."
      );
    }
  };

  /**
   * 🔗 FONCTION DE COPIE DE LIEN DIRECT
   * Génère et copie l'URL complète pour accéder directement à ce template
   *
   * Format: https://[domaine]/email-assistant/?id=[template_id]&lang=[langue]
   *
   * UX: Permet aux CC de partager facilement des liens directs vers des templates spécifiques
   * - Génération automatique de l'URL complète
   * - Inclut l'ID du template et la langue actuelle
   * - Feedback visuel de succès
   */
  const copyTemplateLink = async () => {
    if (!selectedTemplate) return;

    // 🌐 Construire l'URL complète avec paramètres
    const currentUrl = window.location.origin + window.location.pathname;
    const templateUrl = `${currentUrl}?id=${selectedTemplate.id}&lang=${templateLanguage}`;

    try {
      // 📋 Copier l'URL dans le presse-papiers
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(templateUrl);
      } else {
        // 🔄 Fallback pour navigateurs anciens
        const textArea = document.createElement("textarea");
        textArea.value = templateUrl;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        textArea.remove();
      }

      // ✅ Feedback visuel temporaire
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      console.error("Erreur lors de la copie du lien:", error);
      alert(
        "Erreur lors de la copie du lien. Veuillez copier manuellement l'URL depuis la barre d'adresse."
      );
    }
  };

  // Réinitialiser le formulaire
  const resetForm = () => {
    if (selectedTemplate) {
      const initialVars = {};
      selectedTemplate.variables.forEach((varName) => {
        const varInfo = templatesData.variables[varName];
        if (varInfo) {
          initialVars[varName] = varInfo.example || "";
        }
      });
      setVariables(initialVars);

      // Réinitialiser les versions finales
      const subjectWithVars = replaceVariables(
        selectedTemplate.subject[templateLanguage] || ""
      );
      const bodyWithVars = replaceVariables(
        selectedTemplate.body[templateLanguage] || ""
      );
      setFinalSubject(subjectWithVars);
      setFinalBody(bodyWithVars);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement des modèles...</p>
          </div>
        </div>
      ) : (
        <>
          {/* En-tête avec identité visuelle Bureau de la traduction */}
          <header style={{ backgroundColor: 'var(--tb-navy)' }} className="shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div style={{ backgroundColor: 'var(--tb-teal)' }} className="rounded-full p-3 shadow-md">
                    <Mail className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-semibold text-white">
                      {t.title}
                    </h1>
                    <p style={{ color: 'var(--tb-mint)' }} className="text-sm font-medium">
                      {t.subtitle}
                    </p>
                  </div>
                </div>

                {/* Langue de l'interface avec couleurs Bureau de la traduction */}
                <div style={{ backgroundColor: 'var(--tb-mint)', color: 'var(--tb-navy)' }} className="flex items-center space-x-3 rounded-lg px-4 py-2 shadow-sm">
                  <Globe className="h-5 w-5" style={{ color: 'var(--tb-navy)' }} />
                  <span className="font-medium text-sm">
                    {t.interfaceLanguage}:
                  </span>
                  <div className="flex bg-white rounded-md p-1 shadow-sm">
                    <button
                      onClick={() => setInterfaceLanguage("fr")}
                      className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
                        interfaceLanguage === "fr"
                          ? "text-white shadow-sm"
                          : "hover:bg-gray-100"
                      }`}
                      style={interfaceLanguage === "fr" ? { backgroundColor: 'var(--tb-teal)' } : { color: 'var(--tb-navy)' }}
                    >
                      FR
                    </button>
                    <button
                      onClick={() => setInterfaceLanguage("en")}
                      className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
                        interfaceLanguage === "en"
                          ? "text-white shadow-sm"
                          : "hover:bg-gray-100"
                      }`}
                      style={interfaceLanguage === "en" ? { backgroundColor: 'var(--tb-teal)' } : { color: 'var(--tb-navy)' }}
                    >
                      EN
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Contenu principal */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Panneau de gauche - Liste des modèles */}
              <div className="lg:col-span-1">
                <Card className="h-fit shadow-xl border-0 bg-gradient-to-br from-white to-gray-50 overflow-hidden">
                  <CardHeader className="pb-4 bg-gradient-to-r from-gray-50 to-blue-50">
                    <CardTitle className="text-xl font-bold text-gray-800 flex items-center">
                      <FileText className="h-6 w-6 mr-2 text-blue-600" />
                      {t.selectTemplate}
                    </CardTitle>
                    <p className="text-sm text-gray-600">
                      {filteredTemplates.length} {t.templatesCount}
                    </p>

                    {/* Filtre par catégorie avec style */}
                    <Select
                      value={selectedCategory}
                      onValueChange={setSelectedCategory}
                    >
                      <SelectTrigger className="border-2 border-gray-200 focus:border-purple-400 transition-all duration-300">
                        <Filter className="h-4 w-4 mr-2 text-purple-500" />
                        <SelectValue placeholder={t.allCategories} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t.allCategories}</SelectItem>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {t.categories[category] || category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {/* Recherche avec bouton d'effacement */}
                    <div className="relative group">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                      <Input
                        ref={searchRef}
                        type="text"
                        placeholder={t.searchPlaceholder}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 pr-10 border-2 border-orange-200 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-300"
                      />
                      {/* Bouton X pour effacer la recherche */}
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery("")}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors"
                          title="Effacer la recherche"
                        >
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      )}
                    </div>

                    {/* Langue des modèles avec style moderne */}
                    <div className="flex items-center space-x-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-3">
                      <Languages className="h-5 w-5 text-indigo-600" />
                      <span className="text-sm font-semibold text-gray-700">
                        {t.templateLanguage}:
                      </span>
                      <div className="flex bg-white rounded-lg p-1 shadow-sm">
                        <button
                          onClick={() => setTemplateLanguage("fr")}
                          className={`px-3 py-1 text-sm font-bold rounded-md transition-all duration-300 ${
                            templateLanguage === "fr"
                              ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg transform scale-105"
                              : "text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          FR
                        </button>
                        <button
                          onClick={() => setTemplateLanguage("en")}
                          className={`px-3 py-1 text-sm font-bold rounded-md transition-all duration-300 ${
                            templateLanguage === "en"
                              ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg transform scale-105"
                              : "text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          EN
                        </button>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-0">
                    <ScrollArea
                      className="h-[600px]"
                      style={{ "--scrollbar-width": "8px" }}
                    >
                      <div className="space-y-3 p-4 relative">
                        {/* Indicateur de scroll en bas */}
                        {filteredTemplates.length > 6 && (
                          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-10 flex items-end justify-center pb-1">
                            <div className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full shadow-sm border">
                              ↓ {filteredTemplates.length - 6}+ autres modèles
                            </div>
                          </div>
                        )}
                        {filteredTemplates.map((template) => (
                          <div
                            key={template.id}
                            onClick={() => setSelectedTemplate(template)}
                            className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-102 ${
                              selectedTemplate?.id === template.id
                                ? "border-blue-400 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-lg transform scale-102"
                                : "border-gray-200 hover:border-blue-300 bg-white"
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h3 className="font-bold text-gray-900 text-sm mb-1">
                                  {template.title[templateLanguage]}
                                </h3>
                                <p className="text-xs text-gray-600 mb-2 leading-relaxed">
                                  {template.description[templateLanguage]}
                                </p>
                                <Badge
                                  variant="secondary"
                                  className={`text-xs font-medium ${
                                    template.category === "Devis et estimations"
                                      ? "bg-blue-100 text-blue-700 border-blue-200"
                                      : template.category ===
                                        "Gestion de projets"
                                      ? "bg-green-100 text-green-700 border-green-200"
                                      : template.category ===
                                        "Problèmes techniques"
                                      ? "bg-red-100 text-red-700 border-red-200"
                                      : template.category ===
                                        "Communications générales"
                                      ? "bg-purple-100 text-purple-700 border-purple-200"
                                      : template.category ===
                                        "Services spécialisés"
                                      ? "bg-amber-100 text-amber-700 border-amber-200"
                                      : "bg-gray-100 text-gray-700 border-gray-200"
                                  }`}
                                >
                                  {template.category}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>

              {/* Panneau de droite - Édition */}
              <div className="lg:col-span-2 space-y-6">
                {selectedTemplate ? (
                  <>
                    {/* Variables avec style moderne */}
                    {selectedTemplate.variables &&
                      selectedTemplate.variables.length > 0 && (
                        <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-orange-50 overflow-hidden">
                          <CardHeader className="bg-gradient-to-r from-orange-50 to-yellow-50">
                            <CardTitle className="text-xl font-bold text-gray-800 flex items-center">
                              <Edit3 className="h-6 w-6 mr-2 text-orange-600" />
                              {t.variables}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {selectedTemplate.variables.map((varName) => {
                                const varInfo =
                                  templatesData.variables[varName];
                                if (!varInfo) return null;

                                const currentValue = variables[varName] || "";

                                // Couleur selon le type de variable
                                const getTypeColor = () => {
                                  switch (varInfo.type) {
                                    case "email":
                                      return "border-blue-300 focus:border-blue-500";
                                    case "phone":
                                      return "border-green-300 focus:border-green-500";
                                    case "date":
                                      return "border-purple-300 focus:border-purple-500";
                                    case "number":
                                      return "border-orange-300 focus:border-orange-500";
                                    default:
                                      return "border-gray-300 focus:border-gray-500";
                                  }
                                };

                                return (
                                  <div
                                    key={varName}
                                    className="bg-white rounded-md p-3 border border-gray-200 hover:border-orange-300 transition-all duration-200"
                                  >
                                    {/* En-tête compact */}
                                    <div className="flex items-center justify-between mb-2">
                                      <label className="text-xs font-semibold text-gray-700 flex items-center">
                                        <span
                                          className={`w-2 h-2 rounded-full mr-1.5 ${
                                            varInfo.type === "email"
                                              ? "bg-blue-400"
                                              : varInfo.type === "phone"
                                              ? "bg-green-400"
                                              : varInfo.type === "date"
                                              ? "bg-purple-400"
                                              : varInfo.type === "number"
                                              ? "bg-orange-400"
                                              : "bg-gray-400"
                                          }`}
                                        ></span>
                                        {varInfo.description[interfaceLanguage]}
                                      </label>

                                      {/* Badge du type compact */}
                                      <Badge
                                        variant="outline"
                                        className="text-xs px-1 py-0 h-4"
                                      >
                                        {varInfo.type}
                                      </Badge>
                                    </div>

                                    {/* Champ de saisie */}
                                    <Input
                                      value={currentValue}
                                      onChange={(e) =>
                                        setVariables((prev) => ({
                                          ...prev,
                                          [varName]: e.target.value,
                                        }))
                                      }
                                      placeholder={varInfo.example}
                                      className={`text-sm h-9 border transition-all duration-200 ${getTypeColor()}`}
                                    />

                                    {/* Compteur de caractères pour les champs texte longs */}
                                    {varInfo.type === "text" &&
                                      currentValue.length > 50 && (
                                        <div className="flex justify-end mt-1">
                                          <span className="text-xs text-gray-400">
                                            {currentValue.length} caractères
                                          </span>
                                        </div>
                                      )}
                                  </div>
                                );
                              })}
                            </div>
                          </CardContent>
                        </Card>
                      )}

                    {/* Version éditable - ZONE PRINCIPALE */}
                    <Card className="shadow-2xl border-0 bg-gradient-to-br from-white to-green-50 overflow-hidden">
                      <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                        <CardTitle className="text-2xl font-bold text-gray-800 flex items-center">
                          <Mail className="h-7 w-7 mr-3 text-green-600" />
                          {t.editEmail}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-6 space-y-6">
                        {/* Objet éditable avec aperçu surlignement */}
                        <div className="space-y-3">
                          <label className="text-lg font-bold text-gray-700 flex items-center">
                            <span className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                            {t.subject}
                          </label>
                          <HighlightingEditor
                            value={finalSubject}
                            onChange={(e) => setFinalSubject(e.target.value)}
                            variables={variables}
                            placeholder={t.subject}
                            minHeight="60px"
                          />
                        </div>

                        {/* Corps éditable avec aperçu surlignement */}
                        <div className="space-y-3">
                          <label className="text-lg font-bold text-gray-700 flex items-center">
                            <span className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                            {t.body}
                          </label>
                          <HighlightingEditor
                            value={finalBody}
                            onChange={(e) => setFinalBody(e.target.value)}
                            variables={variables}
                            placeholder={t.body}
                            minHeight="250px"
                          />
                        </div>
                      </CardContent>
                    </Card>

                    {/* Actions avec style moderne */}
                    <div className="flex justify-between items-center">
                      {/* Bouton Copier le lien - Discret à gauche */}
                      <Button
                        variant="ghost"
                        onClick={() => copyTemplateLink()}
                        className="text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 font-medium text-sm"
                        title="Copier le lien direct vers ce template"
                      >
                        <Link className="h-4 w-4 mr-2" />
                        Copier le lien
                      </Button>

                      <div className="flex space-x-4">
                        <Button
                          variant="outline"
                          onClick={resetForm}
                          className="border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 font-semibold"
                        >
                          <RotateCcw className="h-4 w-4 mr-2" />
                          {t.reset}
                        </Button>

                        {/* 
                    🎨 BOUTONS DE COPIE GRANULAIRE - UX AMÉLIORÉE
                    
                    Design pensé pour l'efficacité :
                    - 3 boutons distincts avec codes couleur intuitifs
                    - Tooltips explicatifs avec raccourcis clavier
                    - Animations hover pour feedback visuel
                    - Groupement logique (outline + principal)
                  */}
                        <div className="flex space-x-2">
                          {/* 📧 Bouton Copie Objet - Bleu (associé aux emails) */}
                          <Button
                            onClick={() => copyToClipboard("subject")}
                            variant="outline"
                            className="font-medium px-4 py-2 border-2 border-blue-300 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 group"
                            title="Copier l'objet seulement (Ctrl+J)"
                          >
                            <Mail className="h-4 w-4 mr-2 group-hover:text-blue-600" />
                            {t.copySubject || "Objet"}
                          </Button>

                          {/* 📝 Bouton Copie Corps - Vert (associé au contenu) */}
                          <Button
                            onClick={() => copyToClipboard("body")}
                            variant="outline"
                            className="font-medium px-4 py-2 border-2 border-green-300 hover:border-green-500 hover:bg-green-50 transition-all duration-300 group"
                            title="Copier le corps seulement (Ctrl+B)"
                          >
                            <Edit3 className="h-4 w-4 mr-2 group-hover:text-green-600" />
                            {t.copyBody || "Corps"}
                          </Button>

                          {/* 🚀 Bouton Copie Complète - Gradient (action principale) */}
                          <Button
                            onClick={() => copyToClipboard("all")}
                            className={`font-bold px-6 py-3 transition-all duration-300 shadow-lg ${
                              copySuccess
                                ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 transform scale-105"
                                : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105"
                            }`}
                            title="Copier tout l'email (Ctrl+Enter)"
                          >
                            <Copy className="h-5 w-5 mr-2" />
                            {copySuccess ? t.copied : t.copyAll || "Tout"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
                    <CardContent className="flex items-center justify-center h-80">
                      <div className="text-center">
                        <div className="relative mb-6">
                          <FileText className="h-16 w-16 text-gray-300 mx-auto animate-bounce" />
                          <Sparkles className="h-6 w-6 text-blue-400 absolute -top-2 -right-2 animate-pulse" />
                        </div>
                        <p className="text-gray-500 text-lg font-medium">
                          {t.noTemplate}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </main>
        </>
      )}
    </div>
  );
}

export default App;

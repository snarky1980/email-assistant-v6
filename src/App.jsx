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
import { Switch } from "@/components/ui/switch.jsx";
import { Label } from "@/components/ui/label.jsx";
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
import { Toaster } from "@/components/ui/sonner.jsx";
import { toast } from "sonner";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible.jsx";
import { ChevronDown } from "lucide-react";
import "./App.css";

// Custom CSS for modern typography and variable highlighting
const customEditorStyles = `
  /* Translation Bureau Brand Colors - Exact Match from Brand Identity */
  :root {
    --tb-navy: #1a365d;          /* Deep navy (from image) */
  --tb-teal: #1f8a99;          /* Muted teal */  
  --tb-mint: #bfe7e3;          /* Light bluish mint */
  --tb-lime: #bef264;          /* Soft lime yellow (from image) */
  --tb-sage-muted: #d8e2b0;    /* Muted sage/yellow (requested) */
    --tb-light-blue: #dbeafe;    /* Very light blue (from image) */
    --tb-cream: #fefefe;         /* Clean white */
    --tb-gray: #6b7280;          /* Supporting gray */
  }

  /* Organic Header with Curved Shapes */
  .organic-header {
    background: var(--tb-light-blue);
    position: relative;
    overflow: hidden;
    min-height: 96px;
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

  /* Responsive viewport-fitted panels for better ergonomics on desktop */
  @media (min-width: 1024px) {
    .viewport-panel { height: calc(100vh - 240px); }
    .viewport-scroll { height: calc(100vh - 240px); overflow: auto; }
  }
`;

function App() {
  // Track sticky header shadow state
  const [isHeaderStuck, setIsHeaderStuck] = useState(false);
  // Key to force remount of resizable layout when resetting
  const [remountKey, setRemountKey] = useState(0);
  
  useEffect(() => {
    const onScroll = () => {
      setIsHeaderStuck(window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
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
  // Compact mode and Variables panel open state
  const [compact, setCompact] = useState(savedState.compact || false);
  const [varsOpen, setVarsOpen] = useState(
    savedState.varsOpen !== undefined ? savedState.varsOpen : true
  );

  // Palette-based styles for category badges
  const getCategoryBadgeStyle = (category) => {
    switch (category) {
      case "Devis et estimations":
        return { backgroundColor: 'var(--tb-teal)', borderColor: 'var(--tb-teal)', color: 'white' };
      case "Gestion de projets":
        return { backgroundColor: 'var(--tb-mint)', borderColor: 'var(--tb-mint)', color: 'var(--tb-navy)' };
      case "Problèmes techniques":
        return { backgroundColor: 'var(--tb-navy)', borderColor: 'var(--tb-navy)', color: 'white' };
      case "Communications générales":
        return { backgroundColor: 'var(--tb-sage-muted)', borderColor: 'var(--tb-sage-muted)', color: 'var(--tb-navy)' };
      case "Services spécialisés":
        return { backgroundColor: '#1f2937', borderColor: '#1f2937', color: 'white' };
      default:
        return { backgroundColor: '#f1f5f9', borderColor: '#e2e8f0', color: '#334155' };
    }
  };

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
      compact,
      varsOpen,
    });
  }, [
    interfaceLanguage,
    templateLanguage,
    searchQuery,
    selectedCategory,
    variables,
    compact,
    varsOpen,
  ]);

  // Textes de l'interface selon la langue
  const interfaceTexts = {
    fr: {
      title: "Assistant pour rédaction de courriels aux clients",
      subtitle: "Bureau de la traduction",
      selectTemplate: "Sélectionnez un modèle",
      templatesCount: `modèles disponibles`,
  searchPlaceholder: "Rechercher un modèle...",
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
  searchPlaceholder: "Search for a template...",
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
      const tag = (e.target && e.target.tagName) || "";
      const isTyping = ["INPUT", "TEXTAREA"].includes(tag) || (e.target && e.target.isContentEditable);
      if (isTyping) return; // don't trigger global shortcuts while typing
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

      // ✅ Toast non-intrusif
      const toastMsgs = {
        fr: {
          subject: "Objet copié dans le presse-papiers",
          body: "Corps copié dans le presse-papiers",
          all: "Objet + Corps copiés",
        },
        en: {
          subject: "Subject copied to clipboard",
          body: "Body copied to clipboard",
          all: "Subject + Body copied",
        },
      };
      const lang = interfaceLanguage === "en" ? "en" : "fr";
      toast.success(toastMsgs[lang][type] || toastMsgs[lang].all, {
        duration: 2000,
      });
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
  <div className={`min-h-screen ${compact ? "compact" : ""}`} style={{ backgroundColor: 'var(--tb-light-blue)' }}>
    <Toaster richColors position="top-right" />
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p style={{ color: 'var(--tb-teal)' }}>Chargement des modèles...</p>
          </div>
        </div>
      ) : (
        <>
          {/* En-tête avec formes organiques inspirées de l'identité Bureau de la traduction */}
          <header className="organic-header relative sticky top-0 z-40" style={{ boxShadow: isHeaderStuck ? '0 8px 24px rgba(26,54,93,0.18)' : '0 4px 12px rgba(26,54,93,0.10)' }}>
            {/* Grandes capsules inspirées de l'identité Bureau de la traduction */}
            <div className="absolute inset-0 overflow-hidden">
              {/* Très grande capsule navy verticale à gauche */}
              <div 
                className="absolute -left-12 -top-4 w-28 h-52 opacity-95"
                style={{ 
                  backgroundColor: 'var(--tb-navy)',
                  borderRadius: '56px'
                }}
              ></div>
              
              {/* Grande capsule teal horizontale au centre */}
              <div 
                className="absolute left-24 top-8 w-64 h-24 opacity-85"
                style={{ 
                  backgroundColor: 'var(--tb-teal)',
                  borderRadius: '48px'
                }}
              ></div>
              
              {/* Énorme capsule verticale à droite (muted sage from palette) */}
              <div 
                className="absolute right-8 -top-6 w-32 h-56 opacity-90"
                style={{ 
                  backgroundColor: 'var(--tb-sage-muted)',
                  borderRadius: '64px'
                }}
              ></div>
              
              {/* Grande capsule mint horizontale en bas */}
              <div 
                className="absolute right-20 bottom-4 w-56 h-20 opacity-80"
                style={{ 
                  backgroundColor: 'var(--tb-mint)',
                  borderRadius: '40px'
                }}
              ></div>
            </div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  {/* Icône avec bold impact - solide */}
                  <div className="relative">
                    <div 
                      className="p-6 shadow-2xl transform hover:scale-110 transition-transform duration-300"
                      style={{ 
                        backgroundColor: 'var(--tb-navy)',
                        borderRadius: '40px',
                        boxShadow: '0 25px 50px rgba(26, 54, 93, 0.4)'
                      }}
                    >
                      <Mail className="h-14 w-14 text-white" />
                    </div>
                  </div>
                  
                  {/* Textes avec contraste élevé */}
                  <div>
                    <h1 className="text-3xl font-bold" style={{ color: 'var(--tb-navy)' }}>
                      {t.title}
                    </h1>
                    <p className="text-lg font-medium" style={{ color: 'var(--tb-teal)' }}>
                      {t.subtitle}
                    </p>
                  </div>
                </div>

                {/* Sélecteur de langue avec punch - solide */}
                <div 
                  className="flex items-center space-x-4 px-8 py-5 shadow-2xl"
                  style={{ 
                    backgroundColor: 'var(--tb-teal)',
                    borderRadius: 'calc(var(--radius) + 10px)'
                  }}
                >
                  <Globe className="h-8 w-8 text-white" />
                  <span className="font-bold text-base text-white">
                    {t.interfaceLanguage}
                  </span>
                  <div className="flex bg-white p-2 shadow-lg" style={{ borderRadius: '20px' }}>
                    <button
                      onClick={() => setInterfaceLanguage("fr")}
                      className={`px-6 py-3 text-sm font-bold transition-all duration-200 transform button-ripple teal-focus ${
                        interfaceLanguage === "fr"
                          ? "text-white shadow-xl scale-105"
                          : "hover:scale-105"
                      }`}
                      style={{
                        backgroundColor: interfaceLanguage === "fr" ? 'var(--tb-teal)' : 'transparent',
                        color: interfaceLanguage === "fr" ? 'white' : 'var(--tb-navy)',
                        borderRadius: 'calc(var(--radius) + 6px)'
                      }}
                    >
                      FR
                    </button>
                    <button
                      onClick={() => setInterfaceLanguage("en")}
                      className={`px-6 py-3 text-sm font-bold transition-all duration-200 transform button-ripple teal-focus ${
                        interfaceLanguage === "en"
                          ? "text-white shadow-xl scale-105"
                          : "hover:scale-105"
                      }`}
                      style={{
                        backgroundColor: interfaceLanguage === "en" ? 'var(--tb-teal)' : 'transparent',
                        borderRadius: 'calc(var(--radius) + 6px)'
                      }}
                    >
                      EN
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Contenu principal */}
          <main className={`max-w-7xl mx-auto px-3 sm:px-5 lg:px-6 ${compact ? 'py-4' : 'py-6'}`} style={{ backgroundColor: 'var(--background)', borderRadius: '20px' }}>
            {/* Controls row: Compact + Reset layout */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-[var(--tb-navy)]">
                <Switch id="compact-mode" checked={compact} onCheckedChange={setCompact} />
                <Label htmlFor="compact-mode" className="cursor-pointer select-none">
                  {interfaceLanguage === 'fr' ? 'Mode compact' : 'Compact mode'}
                </Label>
              </div>
              <Button
                variant="ghost"
                className="text-sm text-[var(--tb-navy)] hover:text-[var(--tb-teal)] hover:bg-[var(--tb-light-blue)]"
                onClick={() => {
                  // Clear saved split and remount PanelGroup via key change
                  saveState({ ...loadState(), splitH: undefined });
                  // Force remount by toggling a transient key in state
                  setRemountKey((k) => k + 1);
                }}
                title={interfaceLanguage === 'fr' ? 'Réinitialiser la mise en page' : 'Reset layout'}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                {interfaceLanguage === 'fr' ? 'Réinitialiser la mise en page' : 'Reset layout'}
              </Button>
            </div>
            <div>
              <PanelGroup
                key={remountKey}
                direction="horizontal"
                className={`h-full ${compact ? 'gap-1 lg:gap-2' : 'gap-2 lg:gap-3'}`}
                onLayout={(sizes) => {
                  saveState({
                    ...loadState(),
                    splitH: sizes,
                  });
                }}
                defaultLayout={loadState()?.splitH || [40, 60]}
              >
                {/* Panneau de gauche - Liste des modèles */}
                <Panel minSize={25} maxSize={55} className="min-w-[320px]">
                  <div>
                <Card className="shadow-xl border-0 overflow-hidden relative" style={{ backgroundColor: 'white' }}>
                  {/* Backdrop to fill rounded top corners with teal */}
                  <div className="absolute inset-x-0 top-0" style={{ height: '96px', backgroundColor: 'var(--tb-teal)', zIndex: 0 }}></div>
                  <CardHeader className="pb-4 relative z-10" style={{ backgroundColor: 'transparent' }}>
                    <CardTitle className="text-xl font-bold text-white flex items-center">
                      <FileText className="h-6 w-6 mr-2 text-white" />
                      {t.selectTemplate}
                    </CardTitle>
                    <p className="text-sm text-white/90">
                      {filteredTemplates.length} {t.templatesCount}
                    </p>

                    {/* Filtre par catégorie avec style */}
                    <Select
                      value={selectedCategory}
                      onValueChange={setSelectedCategory}
                    >
                      <SelectTrigger className="border-2 transition-all duration-300" style={{ borderColor: 'var(--tb-teal)', backgroundColor: 'white' }}>
                        <Filter className="h-4 w-4 mr-2" style={{ color: 'var(--tb-teal)' }} />
                        <SelectValue placeholder={t.allCategories} />
                      </SelectTrigger>
                      <SelectContent className="border-2" style={{ borderColor: 'var(--tb-mint)' }}>
                        <SelectItem value="all" className="cursor-pointer data-[highlighted]:bg-[var(--tb-light-blue)] data-[highlighted]:text-[var(--tb-navy)] focus:bg-[var(--tb-light-blue)] focus:text-[var(--tb-navy)]">
                          {t.allCategories}
                        </SelectItem>
                        {categories.map((category) => (
                          <SelectItem
                            key={category}
                            value={category}
                            className="cursor-pointer data-[highlighted]:bg-[var(--tb-light-blue)] data-[highlighted]:text-[var(--tb-navy)] focus:bg-[var(--tb-light-blue)] focus:text-[var(--tb-navy)]"
                          >
                            {t.categories[category] || category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {/* Recherche avec bouton d'effacement */}
                    <div className="relative group w-full">
                      <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center search-adornment">
                        <Search className="h-4 w-4 transition-colors" style={{ color: 'var(--tb-teal)' }} />
                      </div>
                      <Input
                        ref={searchRef}
                        type="text"
                        placeholder={t.searchPlaceholder}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="h-10 pl-10 pr-10 border-2 transition-all duration-300 teal-focus"
                        aria-label={t.searchPlaceholder}
                        role="searchbox"
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="none"
                        spellCheck={false}
                        inputMode="search"
                        style={{ borderColor: 'var(--tb-mint)', backgroundColor: 'white' }}
                        onFocus={(e) => {
                          e.target.style.borderColor = 'var(--tb-teal)';
                          e.target.style.boxShadow = '0 0 0 3px rgba(45, 212, 191, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'var(--tb-mint)';
                          e.target.style.boxShadow = 'none';
                        }}
                        onKeyDown={(e) => {
                          // Avoid global shortcuts while in the search box
                          if ((e.ctrlKey || e.metaKey) && (e.key === 'Enter' || e.key.toLowerCase() === 'b')) {
                            e.stopPropagation();
                          }
                          // Escape clears the search
                          if (e.key === 'Escape' && searchQuery) {
                            e.preventDefault();
                            setSearchQuery('');
                          }
                        }}
                      />
                      {/* Bouton X pour effacer la recherche */}
                      {searchQuery && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                          <button
                            type="button"
                            onClick={() => setSearchQuery("")}
                            className="h-5 w-5 transition-colors button-ripple search-clear-btn"
                            style={{ color: 'var(--tb-teal)' }}
                            title="Effacer la recherche"
                            aria-label="Effacer la recherche"
                            onMouseDown={(e) => { e.preventDefault(); }}
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
                        </div>
                      )}
                    </div>

                    {/* Langue des modèles avec style moderne */}
                    <div className="flex items-center space-x-3 rounded-lg p-3" style={{ backgroundColor: 'var(--tb-light-blue)' }}>
                      <Languages className="h-5 w-5" style={{ color: 'var(--tb-teal)' }} />
                      <span className="text-sm font-semibold" style={{ color: 'var(--tb-navy)' }}>
                        {t.templateLanguage}:
                      </span>
                      <div className="flex bg-white rounded-lg p-1 shadow-sm">
                        <button
                          onClick={() => setTemplateLanguage("fr")}
                          className={`px-3 py-1 text-sm font-bold rounded-md transition-all duration-300 button-ripple teal-focus`}
                          style={{
                            backgroundColor: templateLanguage === "fr" ? 'var(--tb-teal)' : 'transparent',
                            color: templateLanguage === "fr" ? 'white' : 'var(--tb-navy)',
                            transform: templateLanguage === "fr" ? 'scale(1.05)' : 'scale(1)'
                          }}
                        >
                          FR
                        </button>
                        <button
                          onClick={() => setTemplateLanguage("en")}
                          className={`px-3 py-1 text-sm font-bold rounded-md transition-all duration-300 button-ripple teal-focus`}
                          style={{
                            backgroundColor: templateLanguage === "en" ? 'var(--tb-teal)' : 'transparent',
                            color: templateLanguage === "en" ? 'white' : 'var(--tb-navy)',
                            transform: templateLanguage === "en" ? 'scale(1.05)' : 'scale(1)'
                          }}
                        >
                          EN
                        </button>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-0">
                    <ScrollArea className="h-[55vh] sm:h-[60vh] md:h-[65vh] lg:h-[70vh]" style={{ "--scrollbar-width": "8px" }}>
                      <div className={`relative ${compact ? 'space-y-2 p-3' : 'space-y-3 p-4'}`}>
                        {/* Indicateur de scroll en bas */}
                        {filteredTemplates.length > 6 && (
                          <div className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none z-10 flex items-end justify-center pb-1" style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}>
                            <div className="text-xs px-2 py-1 rounded-full shadow-sm border-2" style={{ color: 'var(--tb-navy)', backgroundColor: 'var(--tb-light-blue)', borderColor: 'var(--tb-mint)' }}>
                              ↓ {filteredTemplates.length - 6}+ autres modèles
                            </div>
                          </div>
                        )}
                        {filteredTemplates.map((template) => (
                          <div
                            key={template.id}
                            onClick={() => setSelectedTemplate(template)}
                            className={`${compact ? 'p-3' : 'p-4'} rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-102`}
                            style={{
                              borderColor: selectedTemplate?.id === template.id ? 'var(--tb-teal)' : 'var(--tb-mint)',
                              backgroundColor: selectedTemplate?.id === template.id ? 'var(--tb-light-blue)' : 'white'
                            }}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h3 className="font-bold text-sm mb-1" style={{ color: 'var(--tb-navy)' }}>
                                  {template.title[templateLanguage]}
                                </h3>
                                <p className="text-xs mb-2 leading-relaxed" style={{ color: 'var(--tb-teal)' }}>
                                  {template.description[templateLanguage]}
                                </p>
                                <Badge
                                  variant="secondary"
                                  className={`text-xs font-medium border-2`}
                                  style={getCategoryBadgeStyle(template.category)}
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
                </Panel>
                <PanelResizeHandle className="ResizeHandleX" />

              {/* Panneau de droite - Édition */}
              <Panel minSize={45} className="min-w-[420px]">
                <div className="space-y-5 lg:space-y-6">
                {selectedTemplate ? (
                  <>
                    {/* Variables avec style moderne */}
                    {selectedTemplate.variables &&
                      selectedTemplate.variables.length > 0 && (
                        <Card className="shadow-xl border-0 overflow-hidden relative" style={{ backgroundColor: 'white' }}>
                          {/* Fill header gap with teal to match editors */}
                          <div className="absolute inset-x-0 top-0" style={{ height: '68px', backgroundColor: 'var(--tb-teal)', zIndex: 0 }}></div>
                          <Collapsible open={varsOpen} onOpenChange={(v) => { setVarsOpen(v); }}>
                            <CardHeader className={`relative z-10 ${compact ? 'py-3' : ''}`} style={{ backgroundColor: 'transparent' }}>
                              <CollapsibleTrigger asChild>
                                <button className="w-full flex items-center justify-between group text-left">
                                  <CardTitle className="text-xl font-bold text-white flex items-center">
                                    <Edit3 className="h-6 w-6 mr-2 text-white" />
                                    {t.variables}
                                  </CardTitle>
                                  <ChevronDown className={`h-5 w-5 text-white transition-transform duration-200 ${varsOpen ? '' : '-rotate-90'}`} />
                                </button>
                              </CollapsibleTrigger>
                            </CardHeader>
                <CollapsibleContent>
                  <CardContent className={`p-4 ${compact ? 'pt-2' : ''}`}>
                                <div className={`grid grid-cols-1 md:grid-cols-2 ${compact ? 'gap-2' : 'gap-3'}`}>
                              {selectedTemplate.variables.map((varName) => {
                                const varInfo =
                                  templatesData.variables[varName];
                                if (!varInfo) return null;

                                const currentValue = variables[varName] || "";

                                // Couleur selon le type de variable
                                const getInputStyle = () => {
                                  return {
                                    borderColor: 'var(--tb-mint)',
                                    backgroundColor: 'white'
                                  };
                                };

                                return (
                                  <div
                                    key={varName}
                                    className={`rounded-md ${compact ? 'p-2' : 'p-3'} border-2 transition-all duration-200`}
                                    style={{ backgroundColor: 'var(--tb-light-blue)', borderColor: 'var(--tb-mint)' }}
                                  >
                                    {/* En-tête compact */}
                                    <div className="flex items-center justify-between mb-2">
                                      <label className="text-xs font-semibold" style={{ color: 'var(--tb-navy)' }}>
                                        {varInfo.description[interfaceLanguage]}
                                      </label>

                                      {/* Badge du type compact */}
                                      <Badge
                                        variant="outline"
                                        className="text-xs px-1.5 py-0 h-4 border-2"
                                        style={{ borderColor: 'var(--tb-sage-muted)', color: 'var(--tb-navy)' }}
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
                                      className="text-sm h-9 border-2 transition-all duration-200"
                                      style={getInputStyle()}
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
                            </CollapsibleContent>
                          </Collapsible>
                        </Card>
                      )}

                    {/* Version éditable - ZONE PRINCIPALE */}
                        <Card className="shadow-2xl border-0 overflow-hidden relative" style={{ backgroundColor: 'white' }}>
                      {/* Fill header gap on editors card */}
                      <div className="absolute inset-x-0 top-0" style={{ height: '76px', backgroundColor: 'var(--tb-teal)', zIndex: 0 }}></div>
                      <CardHeader className={`relative z-10 ${compact ? 'py-3' : ''}`} style={{ backgroundColor: 'transparent' }}>
                        <CardTitle className={`font-bold text-white flex items-center ${compact ? 'text-xl' : 'text-2xl'}`}>
                          <Mail className="h-7 w-7 mr-3 text-white" />
                          {t.editEmail}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className={`space-y-5 lg:space-y-6 ${compact ? 'p-4' : 'p-6'}`}>
                        {/* Objet éditable avec aperçu surlignement */}
                        <div className="space-y-3">
                          <label className={`${compact ? 'text-base' : 'text-lg'} font-bold text-[var(--tb-navy)]`}>
                            {t.subject}
                          </label>
                          <HighlightingEditor
                            value={finalSubject}
                            onChange={(e) => setFinalSubject(e.target.value)}
                            variables={variables}
                            placeholder={t.subject}
                            minHeight={compact ? "48px" : "60px"}
                            style={{ border: '1.5px solid var(--tb-mint)', borderRadius: 'var(--radius)' }}
                          />
                        </div>

                        {/* Corps éditable avec aperçu surlignement */}
                        <div className="space-y-3">
                          <label className={`${compact ? 'text-base' : 'text-lg'} font-bold text-[var(--tb-navy)]`}>
                            {t.body}
                          </label>
                          <HighlightingEditor
                            value={finalBody}
                            onChange={(e) => setFinalBody(e.target.value)}
                            variables={variables}
                            placeholder={t.body}
                            minHeight={compact ? "200px" : "260px"}
                            style={{ border: '1.5px solid var(--tb-mint)', borderRadius: 'var(--radius)' }}
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
                          className="border-2 transition-all duration-300 font-semibold"
                          style={{ borderColor: 'var(--tb-teal)', color: 'var(--tb-navy)' }}
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
                className="font-medium px-4 py-2 border-2 transition-all duration-300 group"
                style={{ borderColor: 'var(--tb-sage-muted)', backgroundColor: 'var(--tb-sage-muted)', color: 'var(--tb-navy)' }}
                            onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#8f9d49';
                  e.target.style.borderColor = '#8f9d49';
                            }}
                            onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'var(--tb-sage-muted)';
                  e.target.style.borderColor = 'var(--tb-sage-muted)';
                            }}
                            title="Copier l'objet seulement (Ctrl+J)"
                          >
                              <Mail className="h-4 w-4 mr-2" />
                            {t.copySubject || "Objet"}
                          </Button>

                          {/* 📝 Bouton Copie Corps - Vert (associé au contenu) */}
                          <Button
                            onClick={() => copyToClipboard("body")}
                            variant="outline"
                            className="font-medium px-4 py-2 border-2 transition-all duration-300 group"
                            style={{ borderColor: 'var(--tb-sage-muted)', backgroundColor: 'var(--tb-sage-muted)', color: 'var(--tb-navy)' }}
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = '#8f9d49';
                              e.target.style.borderColor = '#8f9d49';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = 'var(--tb-sage-muted)';
                              e.target.style.borderColor = 'var(--tb-sage-muted)';
                            }}
                            title="Copier le corps seulement (Ctrl+B)"
                          >
                            <Edit3 className="h-4 w-4 mr-2" />
                            {t.copyBody || "Corps"}
                          </Button>

                          {/* 🚀 Bouton Copie Complète - Gradient (action principale) */}
                          <Button
                            onClick={() => copyToClipboard("all")}
                            className="font-bold px-6 py-3 transition-all duration-300 shadow-lg transform"
                            style={{
                              backgroundColor: copySuccess ? 'var(--tb-sage-muted)' : 'var(--tb-teal)',
                              color: copySuccess ? '#1e3a5f' : 'white'
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = copySuccess ? 'var(--tb-mint)' : '#176b77';
                              e.target.style.transform = 'scale(1.05)';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = copySuccess ? 'var(--tb-sage-muted)' : 'var(--tb-teal)';
                              e.target.style.transform = 'scale(1)';
                            }}
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
                  <Card className="shadow-xl border-0" style={{ backgroundColor: '#f8fafc' }}>
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
              </Panel>
              </PanelGroup>
            </div>
          </main>
        </>
      )}
    </div>
  );
}

export default App;

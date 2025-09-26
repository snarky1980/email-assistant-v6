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
  Star,
  MoreHorizontal,
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
import { Toaster } from "@/components/ui/sonner.jsx";
import { toast } from "sonner";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible.jsx";
import { ChevronDown } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu.jsx";
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
    min-height: 120px;
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
  // Initial layout preference (uncontrolled PanelGroup for reliable defaults)
  // Right pane should start wide
  
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
  // Ref to templates list viewport for programmatic scrolling
  const listViewportRef = useRef(null);

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
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [finalSubject, setFinalSubject] = useState(""); // Version finale éditable
  const [finalBody, setFinalBody] = useState(""); // Version finale éditable
  const [variables, setVariables] = useState(savedState.variables || {});
  const [copySuccess, setCopySuccess] = useState(false);
  const [varsOpen, setVarsOpen] = useState(false);
  // Debounced query to avoid filtering on every keystroke
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
  // NEW: Favorites and Recents (local-only)
  const [favorites, setFavorites] = useState(savedState.favorites || []); // array of template ids
  const [recents, setRecents] = useState(savedState.recents || []); // MRU array of template ids
  const [favoritesOpen, setFavoritesOpen] = useState(true);
  const [recentsOpen, setRecentsOpen] = useState(true);

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
  // Ne pas écraser les nouveaux défauts au tout premier rendu
  const hasInteractedRef = useRef({ varsOpen: false, categoryChanged: false });

  useEffect(() => {
    const toSave = {
      interfaceLanguage,
      templateLanguage,
      searchQuery,
      variables,
      favorites,
      recents,
    };
    if (hasInteractedRef.current.categoryChanged) {
      toSave.selectedCategory = selectedCategory;
    }
    if (hasInteractedRef.current.varsOpen) {
      toSave.varsOpen = varsOpen;
    }
    saveState(toSave);
  }, [interfaceLanguage, templateLanguage, searchQuery, selectedCategory, variables, varsOpen, favorites, recents]);

  // Debounce search input to improve responsiveness
  useEffect(() => {
    const id = setTimeout(() => setDebouncedQuery(searchQuery), 200);
    return () => clearTimeout(id);
  }, [searchQuery]);

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
        favorites: "Favoris",
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
      favorites: "Favoris",
      recents: "Récents",
      noResults: "Aucun résultat",
      tryDifferentSearch: "Essayez d'autres mots-clés ou effacez la recherche.",
      exportEml: "Exporter .eml (Outlook)",
      exportEmlShort: "Exporter .eml",
      exportHtml: "Exporter HTML",
      exportHtmlShort: "HTML",
      copyHtml: "Copier HTML",
      more: "Plus",
      moreActions: "Plus d’actions",
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
        favorites: "Favorites",
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
      favorites: "Favorites",
      recents: "Recents",
      noResults: "No results",
      tryDifferentSearch: "Try different keywords or clear the search.",
      exportEml: "Export .eml (Outlook)",
      exportEmlShort: "Export .eml",
      exportHtml: "Export HTML",
      exportHtmlShort: "HTML",
      copyHtml: "Copy HTML",
      more: "More",
      moreActions: "More actions",
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
        // Prune favorites/recents to existing template IDs
        try {
          const ids = new Set(data.templates.map((t) => t.id));
          const prunedFav = (savedState.favorites || []).filter((id) => ids.has(id));
          const prunedRec = (savedState.recents || []).filter((id) => ids.has(id));
          if (JSON.stringify(prunedFav) !== JSON.stringify(favorites)) setFavorites(prunedFav);
          if (JSON.stringify(prunedRec) !== JSON.stringify(recents)) setRecents(prunedRec);
        } catch {}
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
    const params = new URLSearchParams(window.location.search);
    const templateId = params.get("id");
    const langParam = params.get("lang");
    if (langParam && ["fr", "en"].includes(langParam)) {
      setTemplateLanguage(langParam);
      setInterfaceLanguage(langParam);
    }
    if (templateId) {
      const template = templatesData.templates.find((t) => t.id === templateId);
      if (template) {
        selectTemplate(template);
      }
    }
  }, [templatesData]);

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

  // Filtrer et classer les modèles avec une recherche floue simple
  const filteredTemplates = useMemo(() => {
    if (!templatesData) return [];
    let list = templatesData.templates;

    // Filtre par catégorie en premier (inclut catégorie spéciale "favorites")
    if (selectedCategory === "favorites") {
      const favSet = new Set(favorites);
      list = list.filter((t) => favSet.has(t.id));
    } else if (selectedCategory !== "all") {
      list = list.filter((t) => t.category === selectedCategory);
    }

    const q = debouncedQuery?.trim();
    if (!q) return list;

    // Helpers: normaliser (casse/accents), score simple
    const normalize = (s) =>
      (s || "")
        .toString()
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "");

    const nq = normalize(q);
    const tokens = nq.split(/\s+/).filter(Boolean);

    // Language-aware synonyms (normalized), both EN and FR
    const SYN_EN = {
      quote: ["estimate", "quotation"],
      quotes: ["estimate", "quotation"],
      quotation: ["quote", "estimate"],
      quotations: ["quote", "estimate"],
      estimate: ["quote", "quotation"],
      estimates: ["quote", "quotation"],
      proposal: ["quote", "estimate"],
      proposals: ["quote", "estimate"],
    };
    const SYN_FR = {
      devis: ["soumission", "estimation"],
      soumission: ["devis", "estimation"],
      estimation: ["devis", "soumission"],
    };

    const singularize = (s) => (s.endsWith("s") ? s.slice(0, -1) : s);
    const pluralize = (s) => (s.endsWith("s") ? s : s + "s");

    const expandToken = (tok) => {
      const set = new Set();
      const base = singularize(tok);
      set.add(base);
      set.add(pluralize(base));

      // Pull synonyms from BOTH languages
      const syns = [
        ...(SYN_EN[tok] || []),
        ...(SYN_EN[base] || []),
        ...(SYN_FR[tok] || []),
        ...(SYN_FR[base] || []),
      ];
      for (const s of syns) {
        const ns = normalize(s);
        const sb = singularize(ns);
        set.add(sb);
        set.add(pluralize(sb));
      }
      return Array.from(set);
    };
    const expandedTokens = tokens.map(expandToken).filter((arr) => arr.length);

    const scoreField = (fieldText, weight = 1) => {
      const nt = normalize(fieldText);
      if (!nt) return 0;
      let score = 0;
      // match complet sur la requête entière
      if (nt.includes(nq)) {
        score += 50 * weight;
        if (nt.startsWith(nq)) score += 20 * weight;
      }
      // correspondance par groupes de tokens (avec synonymes)
      for (const group of expandedTokens) {
        let bestForGroup = 0;
        for (const tok of group) {
          const idx = nt.indexOf(tok);
          if (idx >= 0) {
            let s = 10 * weight;
            // bonus au début de mot
            if (idx === 0 || /\W/.test(nt[idx - 1])) s += 4 * weight;
            // léger bonus si longueur du token >= 5
            if (tok.length >= 5) s += 2 * weight;
            if (s > bestForGroup) bestForGroup = s;
          } else {
            // très léger fallback « sous-séquence » (premières lettres)
            let i = 0;
            for (const ch of tok) {
              i = nt.indexOf(ch, i);
              if (i === -1) break;
              i++;
            }
            if (i !== -1) bestForGroup = Math.max(bestForGroup, 3 * weight);
          }
        }
        score += bestForGroup;
      }
      return score;
    };

    // Calculer un score par template à partir de titre/description (FR & EN)/catégorie
    const ranked = list
      .map((t) => {
        const titleFR = t.title?.fr || "";
        const titleEN = t.title?.en || "";
        const descFR = t.description?.fr || "";
        const descEN = t.description?.en || "";
        const cat = t.category || "";
        // Slightly favor the currently selected display language
        const langBoost = (lang) => (lang === templateLanguage ? 1.0 : 0.92);
        const score =
          scoreField(titleFR, 2.5 * langBoost("fr")) +
          scoreField(titleEN, 2.5 * langBoost("en")) +
          scoreField(descFR, 1.2 * langBoost("fr")) +
          scoreField(descEN, 1.2 * langBoost("en")) +
          scoreField(cat, 1.0);
        return { t, score };
      })
      // Seuil minimal: écarter si score trop faible
      .filter((r) => r.score > 0)
      // Ordre décroissant par pertinence
      .sort((a, b) => b.score - a.score)
      .map((r) => r.t);

    return ranked;
  }, [templatesData, debouncedQuery, selectedCategory, templateLanguage, favorites]);

  // Derive ordered Favorites and Recents lists from filteredTemplates
  const { favoriteTemplates, recentTemplates, otherTemplates } = useMemo(() => {
    const byId = new Map();
    filteredTemplates.forEach((t) => byId.set(t.id, t));
    const favList = favorites.map((id) => byId.get(id)).filter(Boolean);
    const recList = recents
      .map((id) => byId.get(id))
      .filter(Boolean)
      .filter((t) => !favList.some((f) => f.id === t.id));
    const excludeIds = new Set([...favList.map((t) => t.id), ...recList.map((t) => t.id)]);
    const rest = filteredTemplates.filter((t) => !excludeIds.has(t.id));
    return { favoriteTemplates: favList, recentTemplates: recList, otherTemplates: rest };
  }, [filteredTemplates, favorites, recents]);

  // Toggle favorite handler
  const toggleFavorite = (templateId) => {
    setFavorites((prev) => {
      const set = new Set(prev);
      if (set.has(templateId)) set.delete(templateId);
      else set.add(templateId);
      const arr = Array.from(set);
      saveState({ favorites: arr });
      return arr;
    });
  };

  // When selecting a template, update recents MRU
  const selectTemplate = (template) => {
    setSelectedTemplate(template);
    if (!template?.id) return;
    setRecents((prev) => {
      const arr = [template.id, ...prev.filter((id) => id !== template.id)];
      const capped = arr.slice(0, 20);
      saveState({ recents: capped });
      return capped;
    });
    // Ensure the selected template becomes visible at the top of the list
    // If user was scrolled far down, bring them back to the top to see it highlighted
    try {
      const vp = listViewportRef.current;
      if (vp && typeof vp.scrollTo === 'function') {
        vp.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (_) { /* no-op */ }
  };

  // Obtenir les catégories uniques
  const categories = useMemo(() => {
    if (!templatesData) return [];
    const cats = [...new Set(templatesData.templates.map((t) => t.category))];
    return ["favorites", ...cats];
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
   * Convertit le texte avec variables en JSX avec surlignage colorée
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

  // Export current email as EML (openable in Outlook; users can Save As .oft)
  const exportAsEML = () => {
    if (!selectedTemplate) return;

    const toCRLF = (s) => (s || "").replace(/\r?\n/g, "\r\n");

    // RFC 2047: encode non-ASCII subject as UTF-8 Base64
    const encodeRFC2047 = (str) => {
      try {
        const utf8 = new TextEncoder().encode(str || "");
        let binary = "";
        for (const b of utf8) binary += String.fromCharCode(b);
        const b64 = btoa(binary);
        return `=?UTF-8?B?${b64}?=`;
      } catch {
        return str || "";
      }
    };

    const subjectHeader = encodeRFC2047(finalSubject || "");
    const bodyText = toCRLF(finalBody || "");
    const dateStr = new Date().toUTCString();
    const msgId = `<${Date.now()}.${Math.random().toString(36).slice(2)}@email-assistant>`;

    const headers = [
      "From:",
      "To:",
      `Subject: ${subjectHeader}`,
      `Date: ${dateStr}`,
      "MIME-Version: 1.0",
      "Content-Type: text/plain; charset=UTF-8",
      "Content-Transfer-Encoding: 8bit",
    ].join("\r\n");

    const eml = `${headers}\r\nMessage-ID: ${msgId}\r\n\r\n${bodyText}`;
    const blob = new Blob([eml], { type: "message/rfc822" });

    const title = selectedTemplate.title?.[templateLanguage] || "email-template";
    const safeName = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "email-template";
    const filename = `${safeName}.eml`;

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      URL.revokeObjectURL(a.href);
      a.remove();
    }, 0);
  };

  // --- HTML export & copy helpers ---
  const escapeHtml = (str) =>
    String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  const buildHtml = () => {
    const title = escapeHtml(finalSubject || "");
    const bodyText = finalBody || "";
    const paragraphs = escapeHtml(bodyText)
      .split(/\n\n+/)
      .map((p) => `<p>${p.replace(/\n/g, '<br/>' )}</p>`) // single newlines -> <br/>
      .join("\n");
    const styles = `:root{--tb-navy:#1a365d;--tb-teal:#1f8a99;--tb-mint:#bfe7e3;--tb-sage:#d8e2b0}body{font-family:Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;margin:24px;color:#0f172a;line-height:1.7}h1{color:var(--tb-navy);font-size:22px;margin:0 0 12px;font-weight:800}p{margin:0 0 12px}`;
    return `<!doctype html>\n<html lang="${interfaceLanguage}">\n<head>\n  <meta charset="utf-8" />\n  <meta name="viewport" content="width=device-width, initial-scale=1" />\n  <title>${title}</title>\n  <style>${styles}</style>\n  <meta name="generator" content="email-assistant-v7" />\n</head>\n<body>\n  ${title ? `<h1>${title}</h1>` : ''}\n  ${paragraphs}\n</body>\n</html>`;
  };

  const exportAsHTML = () => {
    try {
      const html = buildHtml();
      const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
      const safeTitle = (finalSubject || 'email').replace(/[^a-z0-9\-_.]+/gi, '_').slice(0, 80);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${safeTitle}.html`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      toast.success(interfaceLanguage === 'fr' ? 'HTML exporté' : 'HTML exported');
    } catch (e) {
      console.error(e);
      toast.error(interfaceLanguage === 'fr' ? "Échec de l'export HTML" : 'HTML export failed');
    }
  };

  const copyHtmlToClipboard = async () => {
    try {
      const html = buildHtml();
      if (navigator.clipboard && window.ClipboardItem) {
        const item = new ClipboardItem({ 'text/html': new Blob([html], { type: 'text/html' }) });
        await navigator.clipboard.write([item]);
      } else if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(html);
      } else {
        const ta = document.createElement('textarea');
        ta.value = html;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
      }
      toast.success(interfaceLanguage === 'fr' ? 'HTML copié' : 'HTML copied');
    } catch (e) {
      console.error(e);
      toast.error(interfaceLanguage === 'fr' ? 'Copie HTML échouée' : 'Copy HTML failed');
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
  <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
    {/* Page-edge blending layers to fully fade edges */}
    <div
      aria-hidden
      className="fixed right-0 top-0 bottom-0 w-6 pointer-events-none z-30"
      style={{
        backgroundImage: 'linear-gradient(to left, var(--background), transparent)'
      }}
    />
    <div
      aria-hidden
      className="fixed left-0 right-0 bottom-0 h-10 pointer-events-none z-30"
      style={{
        backgroundImage: 'linear-gradient(to top, var(--background), transparent)'
      }}
    />
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
          <header className="organic-header relative sticky top-0 z-40" style={{ boxShadow: isHeaderStuck ? '0 10px 34px rgba(26,54,93,0.18)' : '0 4px 16px rgba(26,54,93,0.10)', borderBottom: '4px solid rgba(31,138,153,0.26)' }}>
            {/* under-glow that appears only on scroll */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-0 right-0"
              style={{
                bottom: '-12px',
                height: '36px',
                opacity: isHeaderStuck ? 1 : 0,
                transition: 'opacity 240ms ease',
                background: 'linear-gradient(to bottom, rgba(26,54,93,0.12), rgba(26,54,93,0))',
                filter: 'blur(0.2px)'
              }}
            />
            {/* subtle inner highlight and soft glows to make banner stand out */}
            <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
              <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: '2px', background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.7), transparent)' }} />
              <div style={{ position: 'absolute', left: '-8%', top: '-24%', width: '40%', height: '120%', background: 'radial-gradient(40% 40% at 30% 30%, rgba(255,255,255,0.28), transparent 70%)' }} />
              <div style={{ position: 'absolute', right: '-6%', top: '-18%', width: '32%', height: '110%', background: 'radial-gradient(38% 38% at 70% 30%, rgba(255,255,255,0.24), transparent 72%)' }} />
            </div>
            {/* Grandes capsules inspirées de l'identité Bureau de la traduction */}
            <div className="absolute inset-0 overflow-hidden">
              {/* Staff lines variant: gentle, asymmetrical horizontal lines behind header */}
              <div
                aria-hidden
                className="absolute"
                style={{
                  left: '8%',
                  right: '60%',
                  top: '22px',
                  height: '2px',
                  backgroundColor: 'var(--tb-navy)',
                  opacity: 0.25,
                  borderRadius: '9999px',
                }}
              />
              <div
                aria-hidden
                className="absolute"
                style={{
                  left: '14%',
                  right: '18%',
                  top: '38px',
                  height: '2px',
                  backgroundColor: 'var(--tb-light-blue)',
                  opacity: 0.30,
                  borderRadius: '9999px',
                }}
              />
              <div
                aria-hidden
                className="absolute"
                style={{
                  left: '22%',
                  right: '10%',
                  top: '56px',
                  height: '3px',
                  backgroundColor: 'var(--tb-mint)',
                  opacity: 0.22,
                  borderRadius: '9999px',
                }}
              />
              {/* Très grande capsule navy verticale à gauche (bolder) */}
              <div 
                className="absolute -left-12 -top-4 w-28 h-52 opacity-95"
                style={{ 
                  backgroundColor: 'var(--tb-navy)',
                  borderRadius: '56px'
                }}
              ></div>
              
              {/* Grande capsule teal verticale au centre (bolder, vertical) */}
              <div 
                className="absolute left-28 top-2 w-20 h-64 opacity-95"
                style={{ 
                  backgroundColor: 'var(--tb-teal)',
                  borderRadius: '48px'
                }}
              ></div>
              
              {/* Énorme capsule verticale à droite (light-blue) */}
              <div 
                className="absolute right-8 -top-6 w-32 h-56 opacity-70"
                style={{ 
                  backgroundColor: 'var(--tb-light-blue)',
                  borderRadius: '64px'
                }}
              ></div>
              
              {/* Capsule verticale en bas à droite (light-blue, soft) */}
              <div 
                className="absolute right-16 bottom-2 w-16 h-40 opacity-65"
                style={{ 
                  backgroundColor: 'var(--tb-light-blue)',
                  borderRadius: '40px'
                }}
              ></div>

              {/* Petite capsule mint verticale (subtle) */}
              <div 
                className="absolute left-2 bottom-0 w-10 h-40 opacity-50"
                style={{ 
                  backgroundColor: 'var(--tb-mint)',
                  borderRadius: '36px'
                }}
              ></div>
              {/* Petite capsule sage verticale (very subtle, adds warmth) */}
              <div 
                className="absolute left-56 bottom-6 w-24 h-44"
                style={{ 
                  backgroundColor: 'var(--tb-sage-muted)',
                  borderRadius: '30px',
                  opacity: 0.9
                }}
              ></div>

              {/* Tall vertical pill on the right side (higher) */}
              <div 
                className="absolute right-3 -top-8"
                style={{ 
                  width: '56px',
                  height: '340px',
                  backgroundColor: 'var(--tb-teal)',
                  borderRadius: '44px',
                  opacity: 0.28
                }}
              ></div>

              {/* Horizontal capsules for banner layering (bold, blue-leaning) */}
              <div
                className="absolute left-6 bottom-3 w-80 h-12 opacity-80"
                style={{ backgroundColor: 'var(--tb-light-blue)', borderRadius: '9999px' }}
              ></div>
              <div
                className="absolute right-44 top-8 w-48 h-10 opacity-70"
                style={{ backgroundColor: 'var(--tb-mint)', borderRadius: '9999px' }}
              ></div>
              <div
                className="absolute top-6 right-6 opacity-90"
                style={{ backgroundColor: 'var(--tb-sage-muted)', borderRadius: '9999px', width: '360px', height: '16px' }}
              ></div>
            </div>
            
            
            <div className="w-full mx-auto max-w-none page-wrap py-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6" style={{ marginLeft: '2in' }}>
                  {/* Icône avec bold impact - solide */}
                  <div className="relative">
                    {/* halo behind the icon */}
                    <div
                      aria-hidden
                      className="absolute"
                      style={{
                        zIndex: 0,
                        left: '-18px',
                        top: '-18px',
                        width: '110px',
                        height: '110px',
                        borderRadius: '9999px',
                        background: 'radial-gradient(52% 52% at 50% 50%, rgba(255,255,255,0.7), rgba(31,138,153,0.18) 60%, transparent 72%)',
                        filter: 'blur(0.4px)'
                      }}
                    />
                    <div 
                      className="p-6 shadow-xl transform hover:scale-105 transition-transform duration-300"
                      style={{ 
                        backgroundColor: 'var(--tb-navy)',
                        borderRadius: '56px',
                        boxShadow: '0 18px 36px rgba(26, 54, 93, 0.35)'
                      }}
                    >
                      <Mail className="text-white" style={{ width: '60px', height: '60px', position: 'relative', zIndex: 1 }} />
                    </div>
                  </div>
                  
                  {/* Textes avec contraste élevé */}
                  <div>
                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight" style={{ color: 'var(--tb-navy)' }}>
                      {t.title}
                    </h1>
                    <p className="text-xl md:text-2xl font-semibold" style={{ color: 'var(--tb-teal)' }}>
                      {t.subtitle}
                    </p>
                  </div>
                </div>

                {/* Sélecteur de langue avec punch - solide */}
                <div 
                  className="flex items-center space-x-3 px-6 py-4 shadow-xl"
                  style={{ 
                    backgroundColor: 'var(--tb-teal)',
                    borderRadius: 'calc(var(--radius) + 10px)'
                  }}
                >
                  <Globe className="h-8 w-8 text-white" />
                  <span className="font-bold text-base text-white">
                    {t.interfaceLanguage}
                  </span>
                  <div className="flex bg-white p-1.5 shadow-lg" style={{ borderRadius: '18px' }}>
                    <button
                      onClick={() => setInterfaceLanguage("fr")}
                      className={`px-5 py-2.5 text-sm font-bold transition-all duration-200 transform button-ripple teal-focus ${
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
                      className={`px-5 py-2.5 text-sm font-bold transition-all duration-200 transform button-ripple teal-focus ${
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

          {/* Contenu principal wrapper (clean, blue backdrop only) */}
          <div className="relative w-full mx-auto page-wrap max-w-none">
            <main className="relative z-10 overflow-visible w-full px-0 py-3">
            <div className="relative z-10">
              <PanelGroup
                key={remountKey}
                direction="horizontal"
                className="h-full gap-1 lg:gap-1.5"
                defaultLayout={[20, 80]}
              >
                {/* Panneau de gauche - Liste des modèles */}
                <Panel minSize={16} maxSize={46} defaultSize={22} className="min-w-[280px]" style={{ overflowAnchor: 'none', scrollbarGutter: 'stable both-edges' }}>
                  <div>
                <Card className="shadow-xl border-0 overflow-hidden relative gap-0 py-0" style={{ backgroundColor: 'white', boxShadow: '0 12px 28px rgba(26, 54, 93, 0.08)' }}>
                  {/* Solid teal header (no washout) to match Variables */}
                  <div className="absolute inset-x-0 top-0" style={{ height: '56px', backgroundColor: 'var(--tb-teal)', zIndex: 0 }}></div>
                  <CardHeader className="pb-3 relative z-10" style={{ backgroundColor: 'transparent' }}>
                    <div className="h-[56px] grid grid-cols-[1fr_auto_1fr] items-center">
                      <div className="col-start-2 justify-self-center min-w-0">
                        <CardTitle className="text-lg md:text-xl font-bold text-white flex items-center justify-center gap-2 leading-tight whitespace-nowrap">
                          <FileText className="h-6 w-6 text-white" />
                          <span className="truncate">{t.selectTemplate}</span>
                        </CardTitle>
                      </div>
                      <span className="col-start-3 justify-self-end ml-3 px-2 py-0.5 rounded-full text-[11px] font-bold border" style={{ backgroundColor: 'rgba(255,255,255,0.9)', color: 'var(--tb-navy)', borderColor: 'rgba(255,255,255,0.8)' }}>
                        {filteredTemplates.length}
                      </span>
                    </div>
                  </CardHeader>

                  <CardContent className="p-0">
                    {/* Controls moved under the teal header for alignment with right pane */}
                    <div className="px-6 pt-3 space-y-2 filters-row">
                      {/* Filtre par catégorie avec style */}
                      <div>
                        <Select
                          modal={false}
                          value={selectedCategory}
                          onValueChange={(val) => { setSelectedCategory(val); hasInteractedRef.current.categoryChanged = true; }}
                        >
                          <SelectTrigger className="w-full min-w-[200px] border-2 transition-colors duration-200" style={{ borderColor: 'var(--tb-teal)', backgroundColor: 'white' }}>
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
                      </div>

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
                    </div>
                    <ScrollArea className="h-[55vh] sm:h-[60vh] md:h-[65vh] lg:h-[70vh]" style={{ "--scrollbar-width": "8px" }} showBottomHint={false} viewportRef={listViewportRef}>
                      <div className="relative space-y-2 p-3 pt-8 pb-9">
                        {/* No results message */}
                        {filteredTemplates.length === 0 && (
                          <div className="px-2 py-3 rounded-lg border-2 text-center" style={{ borderColor: 'var(--tb-mint)', backgroundColor: 'white' }}>
                            <div className="text-sm font-semibold" style={{ color: 'var(--tb-navy)' }}>{t.noResults}</div>
                            <div className="text-xs mt-1" style={{ color: 'var(--tb-gray)' }}>{t.tryDifferentSearch}</div>
                          </div>
                        )}

                        {/* Favorites section */}
                        {favoriteTemplates.length > 0 && (
                          <div className="mb-2">
                            <div className="flex items-center justify-between px-1 mb-1">
                              <span className="text-xs font-bold" style={{ color: 'var(--tb-navy)' }}>{t.favorites}</span>
                            </div>
                            <div className="space-y-2">
                              {favoriteTemplates.map((template) => (
                                <div
                                  key={template.id}
                                  onClick={() => selectTemplate(template)}
                                  className="p-3 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-102"
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
                                    <button
                                      className="ml-2 shrink-0 h-7 w-7 rounded-md border-2 flex items-center justify-center"
                                      style={{ borderColor: 'var(--tb-mint)', color: 'var(--tb-teal)', backgroundColor: 'white' }}
                                      title="Toggle favorite"
                                      onClick={(e) => { e.stopPropagation(); toggleFavorite(template.id); }}
                                    >
                                      <Star className="h-4 w-4" style={{ fill: 'currentColor' }} />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Recents section */}
                        {recentTemplates.length > 0 && (
                          <div className="mb-2">
                            <div className="flex items-center justify-between px-1 mb-1">
                              <span className="text-xs font-bold" style={{ color: 'var(--tb-navy)' }}>{t.recents}</span>
                            </div>
                            <div className="space-y-2">
                              {recentTemplates.map((template) => (
                                <div
                                  key={template.id}
                                  onClick={() => selectTemplate(template)}
                                  className="p-3 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-102"
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
                                    <button
                                      className="ml-2 shrink-0 h-7 w-7 rounded-md border-2 flex items-center justify-center"
                                      style={{ borderColor: 'var(--tb-mint)', color: favorites.includes(template.id) ? 'var(--tb-teal)' : 'var(--tb-gray)', backgroundColor: 'white' }}
                                      title="Toggle favorite"
                                      onClick={(e) => { e.stopPropagation(); toggleFavorite(template.id); }}
                                    >
                                      <Star className="h-4 w-4" style={{ fill: favorites.includes(template.id) ? 'currentColor' : 'transparent' }} />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Remaining templates */}
                        {otherTemplates.map((template) => (
                          <div
                            key={template.id}
                            onClick={() => selectTemplate(template)}
                            className="p-3 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-102"
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
                              <button
                                className="ml-2 shrink-0 h-7 w-7 rounded-md border-2 flex items-center justify-center"
                                style={{ borderColor: 'var(--tb-mint)', color: favorites.includes(template.id) ? 'var(--tb-teal)' : 'var(--tb-gray)', backgroundColor: 'white' }}
                                title="Toggle favorite"
                                onClick={(e) => { e.stopPropagation(); toggleFavorite(template.id); }}
                              >
                                <Star className="h-4 w-4" style={{ fill: favorites.includes(template.id) ? 'currentColor' : 'transparent' }} />
                              </button>
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
              <Panel minSize={56} maxSize={100} defaultSize={78} className="min-w-[540px]" style={{ overflowAnchor: 'none', scrollbarGutter: 'stable both-edges' }}>
                <div className="space-y-4 lg:space-y-5 w-full">
                {selectedTemplate ? (
                  <>
                    {/* Variables avec style moderne */}
                    {selectedTemplate.variables &&
                      selectedTemplate.variables.length > 0 && (
                        <Card className="shadow-xl border-0 overflow-hidden relative gap-0 py-0" style={{ backgroundColor: 'white' }}>
                          {/* Fill header gap with teal to match editors */}
                          <div className="absolute inset-x-0 top-0" style={{ height: '56px', backgroundColor: 'var(--tb-teal)', zIndex: 0 }}></div>
                          <Collapsible open={varsOpen} onOpenChange={(v) => { setVarsOpen(v); hasInteractedRef.current.varsOpen = true; }}>
                            <CardHeader className="relative z-10 py-2.5" style={{ backgroundColor: 'transparent' }}>
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
                  <CardContent className="p-4 pt-2">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
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
                                    className="rounded-md p-2 border-2 transition-all duration-200"
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
                                      autoComplete="off"
                                      autoCorrect="off"
                                      autoCapitalize="none"
                                      spellCheck={false}
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
                        <Card className="shadow-2xl border-0 overflow-hidden relative gap-0 py-0" style={{ backgroundColor: 'white', boxShadow: '0 12px 28px rgba(26, 54, 93, 0.08)' }}>
                      {/* Solid teal header (no washout) to match Variables */}
                      <div className="absolute inset-x-0 top-0" style={{ height: '56px', backgroundColor: 'var(--tb-teal)', zIndex: 0 }}></div>
                      <CardHeader className="relative z-10 py-2.5" style={{ backgroundColor: 'transparent' }}>
                        <CardTitle className="font-bold text-white flex items-center text-xl">
                          <Mail className="h-6 w-6 mr-3 text-white" />
                          {t.editEmail}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-5 lg:space-y-6 p-4">
                        {/* Objet éditable avec aperçu surlignement */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center">
                              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--tb-teal)' }}></span>
                            </span>
                            <span className="text-base font-bold text-[var(--tb-navy)]">{t.subject}</span>
                          </div>
                          <HighlightingEditor
                            value={finalSubject}
                            onChange={(e) => setFinalSubject(e.target.value)}
                            variables={variables}
                            templateWithPlaceholders={selectedTemplate.subject[templateLanguage] || ""}
                            placeholder={t.subject}
                            minHeight="48px"
                            style={{ border: '1.5px solid var(--tb-mint)', borderRadius: 'var(--radius)' }}
                          />
                        </div>

                        {/* Corps éditable avec aperçu surlignement */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center">
                              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--tb-teal)' }}></span>
                            </span>
                            <span className="text-base font-bold text-[var(--tb-navy)]">{t.body}</span>
                          </div>
                          <HighlightingEditor
                            value={finalBody}
                            onChange={(e) => setFinalBody(e.target.value)}
                            variables={variables}
                            templateWithPlaceholders={selectedTemplate.body[templateLanguage] || ""}
                            placeholder={t.body}
                            minHeight="200px"
                            style={{ border: '1.5px solid var(--tb-mint)', borderRadius: 'var(--radius)' }}
                          />
                        </div>
                      </CardContent>
                    </Card>

                    {/* Actions avec style moderne */}
                    <div className="flex flex-wrap items-center gap-2 min-w-0">
                      {/* Bouton Copier le lien - Discret à gauche */}
                      <Button
                        variant="ghost"
                        onClick={() => copyTemplateLink()}
                        className="text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 font-medium text-sm px-2 py-1 shrink-0"
                        title="Copier le lien direct vers ce template"
                      >
                        <Link className="h-4 w-4 mr-2" />
                        Copier le lien
                      </Button>

                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 ml-auto w-full md:w-auto justify-end">
                        {/* More actions dropdown */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="outline"
                              className="border transition-all duration-200 font-medium text-sm px-2 py-1.5 hover:bg-blue-50"
                              style={{ borderColor: 'rgba(26,54,93,0.15)', color: 'var(--tb-navy)', backgroundColor: 'transparent' }}
                              title={t.moreActions || 'More actions'}
                            >
                              <MoreHorizontal className="h-4 w-4 mr-1" />
                              <span className="hidden sm:inline">{t.more || 'More'}</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="min-w-[220px]" align="end">
                            <DropdownMenuItem onClick={exportAsEML}>
                              <Mail className="h-4 w-4" />
                              {t.exportEml || 'Export .eml (Outlook)'}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={exportAsHTML}>
                              <FileText className="h-4 w-4" />
                              {t.exportHtml || 'Export HTML'}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={copyHtmlToClipboard}>
                              <Copy className="h-4 w-4" />
                              {t.copyHtml || 'Copy HTML'}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>

                        <Button
                          variant="outline"
                          onClick={resetForm}
                          className="border-2 transition-all duration-300 font-semibold text-sm px-3 py-2"
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
                className="font-medium text-sm px-3 py-2 border-2 transition-all duration-300 group"
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
                            className="font-medium text-sm px-3 py-2 border-2 transition-all duration-300 group"
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
                            className="font-bold text-sm px-4 py-2.5 transition-all duration-300 shadow-lg transform"
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
          </div>
        </>
      )}
    </div>
  );
}

export default App;

/**
 * TemplateSelector - Composant de sélection des modèles d'emails
 *
 * Ce composant affiche la liste des modèles d'emails disponibles
 * et permet à l'utilisateur de sélectionner celui qui convient
 * le mieux à sa situation.
 *
 * Props:
 * - templates: Array - Liste des modèles d'emails disponibles
 * - selectedTemplate: Object - Le modèle actuellement sélectionné
 * - onTemplateSelect: Function - Callback pour la sélection d'un modèle
 *
 * @author Bureau de la traduction
 */

import React, { useState, useMemo, useEffect, useRef } from "react";

const TemplateSelector = ({
  templates,
  selectedTemplate,
  onTemplateSelect,
}) => {
  // Recherche (saisie immédiate -> debounce pour filtrage)
  const [rawSearch, setRawSearch] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  // Debounce: applique la recherche après une courte pause
  useEffect(() => {
    const t = setTimeout(() => setSearchFilter(rawSearch.trim()), 160);
    return () => clearTimeout(t);
  }, [rawSearch]);

  // État pour le filtre par catégorie
  const [categoryFilter, setCategoryFilter] = useState("all");

  /**
   * Filtre les modèles selon les critères de recherche et de catégorie
   * @returns {Array} Liste des modèles filtrés
   */
  const getFilteredTemplates = () => {
    if (!templates) return [];

    return templates.filter((template) => {
      // Filtre par recherche textuelle
      const matchesSearch =
        searchFilter === "" ||
        template.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
        template.description
          .toLowerCase()
          .includes(searchFilter.toLowerCase()) ||
        (template.tags &&
          template.tags.some((tag) =>
            tag.toLowerCase().includes(searchFilter.toLowerCase())
          ));

      // Filtre par catégorie
      const matchesCategory =
        categoryFilter === "all" || template.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  };

  /**
   * Obtient toutes les catégories disponibles
   * @returns {Array} Liste des catégories uniques
   */
  const getAvailableCategories = () => {
    if (!templates) return [];

    const categories = templates.map((template) => template.category);
    return [...new Set(categories)].sort();
  };

  /**
   * Obtient l'icône appropriée pour une catégorie
   * @param {string} category - La catégorie
   * @returns {string} L'emoji correspondant
   */
  const getCategoryIcon = (category) => {
    const icons = {
      information: "📋",
      demande: "❓",
      confirmation: "✅",
      suivi: "📞",
      probleme: "⚠️",
      remerciement: "🙏",
      urgence: "🚨",
      standard: "📧",
    };
    return icons[category] || "📄";
  };

  /**
   * Obtient la couleur de l'indicateur de priorité
   * @param {string} priority - Le niveau de priorité
   * @returns {string} Les classes CSS pour la couleur
   */
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-white font-bold";
      case "medium":
        return "text-white font-bold"; 
      case "low":
        return "text-white font-bold";
      default:
        return "text-white font-bold";
      case 'unknown':
        return "text-white font-bold";
    }
  };

  const filteredTemplates = useMemo(() => getFilteredTemplates(), [templates, searchFilter, categoryFilter]);
  const listContainerRef = useRef(null);

  // Gestion sélection + scroll dans la vue
  const handleSelect = (template) => {
    onTemplateSelect(template);
    // Scroll vers l'élément sélectionné lors de grands ensembles
    requestAnimationFrame(() => {
      if (!listContainerRef.current || !template?.id) return;
      const el = listContainerRef.current.querySelector(`[data-template-id="${template.id}"]`);
      if (el) {
        el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    });
  };
  const availableCategories = getAvailableCategories();

  return (
    <div className="bg-white rounded-lg shadow-lg border-2" style={{ borderColor: 'var(--tb-mint)' }}>
      {/* En-tête avec couleurs Bureau de la traduction */}
      <div className="px-6 py-4" style={{ backgroundColor: 'var(--tb-teal)', color: 'white' }}>
        <h2 className="text-xl font-bold text-white">
          📚 Modèles d'emails
        </h2>
        <p className="text-sm text-white/90 mt-1">
          Sélectionnez un modèle adapté à votre situation
        </p>
      </div>

      {/* Filtres avec style coloré */}
      <div className="p-4 space-y-3 border-b-2" style={{ backgroundColor: 'var(--tb-light-blue)', borderColor: 'var(--tb-mint)' }}>
        {/* Recherche */}
        <div>
          <label
            htmlFor="search"
            className="block text-xs font-bold mb-1"
            style={{ color: 'var(--tb-navy)' }}
          >
            Rechercher
          </label>
          <input
            type="text"
            id="search"
            value={rawSearch}
            onChange={(e) => setRawSearch(e.target.value)}
            placeholder="Nom, description, mots-clés..."
            className="w-full px-4 py-3 text-sm border-2 rounded-lg focus:outline-none transition-all"
            style={{
              borderColor: 'var(--tb-mint)',
              backgroundColor: 'white'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--tb-teal)';
              e.target.style.boxShadow = `0 0 0 3px rgba(8, 145, 178, 0.1)`;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--tb-mint)';
              e.target.style.boxShadow = 'none';
            }}
          />
          {(rawSearch || categoryFilter !== 'all') && (
            <div className="mt-2 flex gap-2 items-center">
              <button
                type="button"
                onClick={() => { setRawSearch(""); setSearchFilter(""); setCategoryFilter("all"); }}
                className="text-xs font-semibold px-3 py-1 btn-reset-animate"
              >Réinitialiser</button>
              <span className="text-[10px] uppercase tracking-wide opacity-70" style={{color:'var(--tb-navy)'}}>
                {filteredTemplates.length} résultat{filteredTemplates.length !== 1 ? 's' : ''}
              </span>
            </div>
          )}
        </div>

        {/* Filtre par catégorie */}
        <div className="flex flex-col" style={{alignItems:'flex-start'}}>
          <label
            htmlFor="category"
            className="block text-xs font-bold mb-1"
            style={{ color: 'var(--tb-navy)' }}
          >
            Catégorie
          </label>
          <select
            id="category"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-3 text-sm border-2 rounded-lg focus:outline-none transition-all"
            style={{
              width: '75%',
              borderColor: 'var(--tb-mint)',
              backgroundColor: 'white'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--tb-teal)';
              e.target.style.boxShadow = `0 0 0 3px rgba(8, 145, 178, 0.1)`;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--tb-mint)';
              e.target.style.boxShadow = 'none';
            }}
          >
            <option value="all">Toutes les catégories</option>
            {availableCategories.map((category) => (
              <option key={category} value={category}>
                {getCategoryIcon(category)}{" "}
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Liste des modèles */}
  <div ref={listContainerRef} className="max-h-96 overflow-y-auto">
        {filteredTemplates.length === 0 ? (
          <div className="p-6 text-center">
            <div className="text-4xl mb-2">🔍</div>
            <p className="text-sm mb-3" style={{ color: 'var(--tb-navy)' }}>
              Aucun modèle trouvé pour ces critères
            </p>
            <button
              onClick={() => {
                setSearchFilter("");
                setCategoryFilter("all");
              }}
              className="px-4 py-2 text-sm font-bold btn-reset-animate"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <div className="space-y-1">
            {filteredTemplates.map((template, index) => {
              const isSelected = selectedTemplate?.id === template.id;
              return (
                <div
                  key={template.id || index}
                  data-template-id={template.id}
                  onClick={() => handleSelect(template)}
                  aria-selected={isSelected}
                  className={
                    "p-5 cursor-pointer rounded-md transition-all will-change-transform " +
                    "duration-300 ease-out hover:scale-[1.015] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--tb-teal)] " +
                    (isSelected ? "scale-[1.01] shadow-md" : "")
                  }
                  style={{
                    backgroundColor: isSelected ? 'var(--tb-light-blue)' : 'white',
                    borderRight: isSelected ? `6px solid var(--tb-sage-muted)` : 'none',
                    boxShadow: isSelected ? '0 6px 18px -2px rgba(26,54,93,0.18)' : '0 1px 2px rgba(26,54,93,0.06)'
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) e.currentTarget.style.backgroundColor = 'var(--tb-light-blue)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) e.currentTarget.style.backgroundColor = 'white';
                  }}
                >
                {/* En-tête du modèle */}
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">
                      {getCategoryIcon(template.category)}
                    </span>
                    <h3 className="font-bold text-sm" style={{ color: 'var(--tb-navy)' }}>
                      {template.name}
                    </h3>
                  </div>

                  {/* Indicateur de priorité */}
                  {template.priority && (
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(
                        template.priority
                      )}`}
                    >
                      {template.priority === "high"
                        ? "Urgent"
                        : template.priority === "medium"
                        ? "Normal"
                        : "Standard"}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm mb-2 line-clamp-2" style={{ color: 'var(--tb-navy)' }}>
                  {template.description}
                </p>

                {/* Tags */}
                {template.tags && template.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {template.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 text-xs rounded-full"
                        style={{ 
                          backgroundColor: 'var(--tb-mint)', 
                          color: 'var(--tb-navy)' 
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                    {template.tags.length > 3 && (
                      <span className="px-2 py-1 text-xs" style={{ color: 'var(--tb-teal)' }}>
                        +{template.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}

                {/* Métadonnées */}
                <div className="flex items-center justify-between text-xs" style={{ color: 'var(--tb-teal)' }}>
                  <span>Catégorie: {template.category}</span>
                  {template.estimatedTime && (
                    <span>⏱️ {template.estimatedTime} min</span>
                  )}
                </div>

                {/* Indicateur de sélection avec animation */}
                {isSelected && (
                  <div className="mt-2 flex items-center text-blue-600 text-sm animate-fade-in">
                    <span className="mr-1">✓</span>
                    Modèle sélectionné
                  </div>
                )}
              </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Pied de page avec statistiques */}
      <div className="px-4 py-3 border-t-2" style={{ borderColor: 'var(--tb-mint)', backgroundColor: 'var(--tb-light-blue)' }}>
        <div className="flex justify-between items-center text-sm font-medium" style={{ color: 'var(--tb-navy)' }}>
          <span>
            {filteredTemplates.length} modèle
            {filteredTemplates.length !== 1 ? "s" : ""}
            {searchFilter || categoryFilter !== "all"
              ? " trouvé" + (filteredTemplates.length !== 1 ? "s" : "")
              : " disponible" + (filteredTemplates.length !== 1 ? "s" : "")}
          </span>
          {selectedTemplate && (
            <span className="text-blue-600 font-medium">
              {selectedTemplate.name}
            </span>
          )}
        </div>
      </div>

      {/* Aide contextuelle */}
      {!selectedTemplate && (
        <div className="p-4 bg-blue-50 border-t border-blue-200">
          <div className="flex">
            <div className="flex-shrink-0">
              <span className="text-blue-400 text-lg">💡</span>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                Comment choisir un modèle ?
              </h3>
              <div className="mt-1 text-sm text-blue-700">
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    Identifiez le type de communication (information, demande,
                    etc.)
                  </li>
                  <li>Considérez le niveau d'urgence de votre message</li>
                  <li>
                    Utilisez les filtres pour trouver rapidement le bon modèle
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;

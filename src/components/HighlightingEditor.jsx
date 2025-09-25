import React, { useState } from "react";

const HighlightingEditor = ({
  value,
  onChange,
  variables = {},
  placeholder,
  minHeight = "60px",
  className = "",
  style = {},
}) => {
  const [isEditing, setIsEditing] = useState(false);

  // Générer le contenu avec surlignage des variables
  const generateHighlightedContent = (text) => {
    if (!text || !variables || Object.keys(variables).length === 0) {
      return text;
    }

    let highlightedText = text;

    // Créer un tableau des valeurs de variables non vides, triées par longueur décroissante
    const variableValues = Object.values(variables)
      .filter(
        (value) => value && typeof value === "string" && value.trim() !== ""
      )
      .sort((a, b) => b.length - a.length);

    // Remplacer chaque valeur par sa version surlignée
    variableValues.forEach((value) => {
      const escapedValue = value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

      // Pour les nombres courts, utiliser un pattern plus spécifique
      let pattern;
      if (/^\d+$/.test(value)) {
        // Pour les nombres purs, chercher le nombre entouré d'espaces, ponctuation ou symboles
        pattern = `(?<=\\s|^|\\$|\\()(${escapedValue})(?=\\s|$|\\)|\\.|,|\\$)`;
      } else {
        // Pour les autres valeurs, utiliser word boundaries
        pattern = `\\b(${escapedValue})\\b`;
      }

      const regex = new RegExp(pattern, "g");
      highlightedText = highlightedText.replace(regex, (match) => {
        // Éviter de surligner si déjà surligné
        if (match.includes('<span class="variable-highlight">')) {
          return match;
        }
        return `<span class="variable-highlight">${match}</span>`;
      });
    });

    return highlightedText;
  };

  const baseStyle = {
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif",
    fontSize: "16px",
    fontWeight: "400",
    lineHeight: "1.5",
    minHeight,
    padding: "12px",
    width: "100%",
  border: "none",
    borderRadius: "var(--radius)",
    backgroundColor: "#ffffff",
    color: "var(--tb-navy)",
    ...style,
  };

  const readOnlyStyle = {
    ...baseStyle,
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
    overflow: "auto",
  };

  const editStyle = {
    ...baseStyle,
    resize: "vertical",
    outline: "none",
  boxShadow: "none",
  };

  if (isEditing) {
    return (
      <textarea
        value={value}
        onChange={onChange}
        onBlur={() => setIsEditing(false)}
        placeholder={placeholder}
        className={className}
        style={editStyle}
        autoFocus
      />
    );
  }

  return (
    <>
      <div
        onClick={() => setIsEditing(true)}
        className={className}
        style={readOnlyStyle}
        dangerouslySetInnerHTML={{
          __html: value
            ? generateHighlightedContent(value)
            : `<span style="color: var(--tb-gray);">${placeholder}</span>`,
        }}
      />

      <style jsx>{`
        .variable-highlight {
          background-color: var(--muted) !important;
          color: var(--tb-navy) !important;
          padding: 2px 4px;
          border-radius: 4px;
          font-weight: 600;
          border: 1px solid var(--tb-mint);
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
          display: inline;
          text-decoration: none;
        }
      `}</style>
    </>
  );
};

export default HighlightingEditor;

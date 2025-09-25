import React, { useState, useEffect, useRef } from "react";
import { Edit3, Eye } from "lucide-react";

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
  const textareaRef = useRef(null);

  // Focus textarea and place caret at end when entering edit mode
  useEffect(() => {
    if (isEditing && textareaRef.current) {
      const len = (value || "").length;
      textareaRef.current.focus();
      try {
        textareaRef.current.setSelectionRange(len, len);
      } catch (_) {
        // Ignore if not supported
      }
    }
  }, [isEditing, value]);

  // Generate highlighted HTML for variables
  const generateHighlightedContent = (text) => {
    if (!text || !variables || Object.keys(variables).length === 0) {
      return text || "";
    }

    let highlightedText = text;

    const variableValues = Object.values(variables)
      .filter((v) => v && typeof v === "string" && v.trim() !== "")
      .sort((a, b) => b.length - a.length);

    variableValues.forEach((val) => {
      const escapedValue = val.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      let pattern;
      if (/^\d+$/.test(val)) {
        pattern = `(?<=\\s|^|\\$|\\()(${escapedValue})(?=\\s|$|\\)|\\.|,|\\$)`;
      } else {
        pattern = `\\b(${escapedValue})\\b`;
      }
      const regex = new RegExp(pattern, "g");
      highlightedText = highlightedText.replace(regex, (match) => {
        if (match.includes('<span class="variable-highlight">')) return match;
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
    cursor: "text",
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

  return (
    <>
      <div className="relative group">
        {isEditing ? (
          <textarea
            ref={textareaRef}
            value={value}
            onChange={onChange}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                e.preventDefault();
                setIsEditing(false);
              }
            }}
            placeholder={placeholder}
            className={className}
            style={editStyle}
            autoFocus
          />
        ) : (
          <div
            role="button"
            tabIndex={0}
            onClick={() => setIsEditing(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setIsEditing(true);
              }
            }}
            className={className}
            style={readOnlyStyle}
            dangerouslySetInnerHTML={{
              __html: value
                ? generateHighlightedContent(value)
                : `<span style=\"color: var(--tb-gray);\">${placeholder}</span>`,
            }}
          />
        )}

        {/* Small toggle button in the corner */}
        <button
          type="button"
          onClick={() => setIsEditing((v) => !v)}
          aria-label={isEditing ? "Preview" : "Edit"}
          title={isEditing ? "Preview" : "Edit"}
          className="absolute top-2 right-2 h-7 w-7 rounded-md shadow-sm border-2 transition-colors opacity-90 hover:opacity-100"
          style={{
            backgroundColor: "white",
            borderColor: "var(--tb-mint)",
            color: "var(--tb-teal)",
          }}
        >
          {isEditing ? (
            <Eye className="h-4 w-4 mx-auto" />
          ) : (
            <Edit3 className="h-4 w-4 mx-auto" />
          )}
        </button>
      </div>

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

import React, { useEffect, useRef } from "react";

const HighlightingEditor = ({
  value,
  onChange,
  placeholder,
  minHeight = "60px",
  className = "",
  style = {},
}) => {
  // Always editing now – toggle + preview removed.
  const textareaRef = useRef(null);

  // Auto-resize helper for textarea
  const autoResize = () => {
    const el = textareaRef.current;
    if (!el) return;
    // Reset height to measure correct scrollHeight and then set it
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  };

  // Focus textarea and place caret at end only when entering edit mode
  useEffect(() => {
    // Focus once on mount for convenience
    if (textareaRef.current) {
      try { textareaRef.current.focus({ preventScroll: true }); } catch { /* ignore */ }
      autoResize();
    }
  }, []);

  // Re-calc height when value changes while editing
  useEffect(() => { autoResize(); }, [value]);

  // Escape HTML to safely render user content
  // (Removed escapeHtml + highlighting logic in simplified always-edit mode)

  // Build preview HTML strictly from the template with <<variables>> so only placeholder positions are highlighted
  // buildFromTemplate removed (unused).

  // Generate highlighted HTML: prefer template-driven highlighting; if text diverged, avoid noisy guessing
  // Highlighting logic removed (always plain text now for simplicity)

  // Utilities to compute caret index inside the preview based on click position
  // Caret calculation helpers removed.

  // nodeTextLength helper removed (unused).

  // caretIndexInContainer removed.

  // Preview click handler removed.

  // Split template into alternating [static, var, static, var, ..., static]
  // splitTemplate removed.

  // Try to find anchor in text; if not found, try trimmed or small snippets; fallback to -1
  // findAnchor removed.

  // Highlight regions between static anchors surrounding each variable placeholder
  // highlightUsingAnchors removed.

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

  // readOnlyStyle removed – no preview mode now.

  const editStyle = {
    ...baseStyle,
    resize: "none",
    outline: "none",
    boxShadow: "none",
    overflowY: "hidden",
  };

  return (
    <>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={onChange}
        onInput={autoResize}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="none"
        spellCheck={false}
        placeholder={placeholder}
        className={className}
        style={editStyle}
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

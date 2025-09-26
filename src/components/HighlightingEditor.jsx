import React, { useEffect, useRef, useState, useCallback } from "react";
import { Eye, Pencil } from "lucide-react";

/**
 * HighlightingEditor
 * Dual-mode (preview/edit) editor used for Subject & Body areas.
 * Default mode: preview (non-editable) showing variable replacement values highlighted.
 * Clicking anywhere inside the preview (or the pencil icon) switches to edit mode.
 * Toggling the eye icon reverts to preview mode.
 *
 * Props:
 *  - value: current editable value (final text with variables already replaced)
 *  - onChange: change handler for edit mode
 *  - variables: object mapping variableName -> value
 *  - templateWithPlaceholders: original template string containing <<varName>> placeholders
 *  - placeholder: placeholder text for textarea
 *  - minHeight: minimum editor height
 *  - className, style: presentation overrides
 */
const HighlightingEditor = ({
  value,
  onChange,
  variables = {},
  templateWithPlaceholders = "",
  placeholder,
  minHeight = "60px",
  className = "",
  style = {},
}) => {
  const textareaRef = useRef(null);
  const previewRef = useRef(null);
  const [mode, setMode] = useState("preview"); // 'preview' | 'edit'

  // Escape HTML to prevent injection inside preview spans
  const escapeHtml = useCallback((str) => {
    if (str == null) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }, []);

  // Escape regex special chars
  const escapeRegExp = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  // Build preview HTML that preserves user edits while still highlighting variable values.
  const buildPreviewHtml = useCallback(() => {
    const current = value || "";

    // Extract placeholder variable names from original template (if any)
    let placeholderNames = [];
    if (templateWithPlaceholders) {
      const set = new Set();
      templateWithPlaceholders.replace(/<<([^>]+)>>/g, (_, n) => { set.add(n); return ''; });
      placeholderNames = Array.from(set);
    }

    if (templateWithPlaceholders && placeholderNames.length) {
      // Build fully replaced baseline
      const replaced = templateWithPlaceholders.replace(/<<([^>]+)>>/g, (m, v) => variables[v] ?? m);
      // If user hasn't diverged from replacement version, use placeholder map (cleaner segmentation)
      if (replaced === current) {
        return templateWithPlaceholders.replace(/<<([^>]+)>>/g, (match, varName) => {
          const rawVal = variables[varName] ?? match;
          const safeVal = escapeHtml(rawVal);
          return `<span class=\"ea-var-value\" data-var=\"${escapeHtml(varName)}\">${safeVal}</span>`;
        });
      }
    }

    // If no placeholders originally, don't attempt value-based highlighting (avoid false positives like short "7" or "OK")
    if (!placeholderNames.length) {
      return escapeHtml(current);
    }

    // Generic pass: highlight occurrences of variable values in the edited text—but only for
    // variables that existed as placeholders AND whose values are sufficiently descriptive.
    const MIN_LEN = 4; // minimal length to consider highlighting
    const entries = Object.entries(variables)
      .filter(([name, v]) => {
        if (!v || !v.trim()) return false;
        // Only highlight if there was a real placeholder originally
        return placeholderNames.includes(name);
      })
      .sort((a, b) => (b[1] || "").length - (a[1] || "").length); // longest first to reduce substring collisions

    if (!entries.length) return escapeHtml(current);

    let working = current;
    const tokens = [];
    entries.forEach(([varName, varVal], idx) => {
      const token = `__EA_VAR_${idx}__`;
      try {
        const regex = new RegExp(escapeRegExp(varVal), 'g');
        working = working.replace(regex, token);
        tokens.push({ token, varName, value: varVal });
      } catch {
        // ignore malformed regex
      }
    });

    let html = escapeHtml(working);
    tokens.forEach(({ token, varName, value: v }) => {
      const tokenRegex = new RegExp(escapeRegExp(token), 'g');
      html = html.replace(tokenRegex, `<span class=\"ea-var-value\" data-var=\"${escapeHtml(varName)}\">${escapeHtml(v)}</span>`);
    });
    return html;
  }, [value, templateWithPlaceholders, variables, escapeHtml]);

  // Auto-resize textarea in edit mode
  const autoResize = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, []);

  useEffect(() => {
    if (mode === 'edit') autoResize();
  }, [value, mode, autoResize]);

  const focusTextarea = (index) => {
    requestAnimationFrame(() => {
      if (!textareaRef.current) return;
      const len = textareaRef.current.value.length;
      const pos = typeof index === 'number' ? Math.max(0, Math.min(index, len)) : len;
      textareaRef.current.focus();
      try {
        textareaRef.current.setSelectionRange(pos, pos);
      } catch {
        // ignore selection errors (e.g., not supported)
      }
    });
  };

  const switchToEdit = (caretIndex) => {
    if (mode !== 'edit') {
      setMode('edit');
      focusTextarea(caretIndex);
    } else if (typeof caretIndex === 'number') {
      focusTextarea(caretIndex);
    }
  };

  const switchToPreview = () => {
    if (mode !== 'preview') setMode('preview');
  };

  const wrapperStyle = {
    position: 'relative',
    ...style,
  };

  const sharedSurfaceStyle = {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif",
    fontSize: '16px',
    lineHeight: '1.5',
    minHeight,
    border: '1.5px solid var(--tb-mint)',
    borderRadius: 'var(--radius)',
    padding: '12px 14px',
    width: '100%',
    background: 'white',
    color: 'var(--tb-navy)',
    boxSizing: 'border-box',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
  };

  return (
    <div className={`ea-highlighting-editor ${className}`} style={wrapperStyle}>
      {/* Single toggle button */}
      <div className="absolute top-1.5 right-1.5 z-20">
        <button
          type="button"
          onClick={() => (mode === 'preview' ? switchToEdit() : switchToPreview())}
          title={mode === 'preview' ? 'Passer en édition' : 'Revenir à l\'aperçu'}
          aria-label={mode === 'preview' ? 'Passer en édition' : 'Revenir à l\'aperçu'}
          className={`p-1.5 rounded-md border text-[11px] inline-flex items-center justify-center transition-colors ${mode === 'edit' ? 'bg-[var(--tb-teal)] text-white border-[var(--tb-teal)]' : 'bg-white text-[var(--tb-navy)] border-[var(--tb-mint)] hover:bg-[var(--tb-light-blue)]'}`}
          style={{ lineHeight: 0 }}
        >
          {mode === 'preview' ? <Pencil className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>

      {mode === 'preview' ? (
        <div
          ref={previewRef}
          className="ea-preview cursor-text pr-24"
          style={sharedSurfaceStyle}
          onClick={(e) => {
            // Determine caret index based on click position
            let caretIndex = value?.length || 0;
            const container = previewRef.current;
            if (container) {
              try {
                const x = e.clientX;
                const y = e.clientY;
                let range;
                if (document.caretRangeFromPoint) {
                  range = document.caretRangeFromPoint(x, y);
                } else if (document.caretPositionFromPoint) {
                  const pos = document.caretPositionFromPoint(x, y);
                  if (pos) {
                    range = document.createRange();
                    range.setStart(pos.offsetNode, pos.offset);
                    range.collapse(true);
                  }
                }
                if (range) {
                  const preRange = document.createRange();
                  preRange.selectNodeContents(container);
                  preRange.setEnd(range.startContainer, range.startOffset);
                  caretIndex = preRange.toString().length;
                }
              } catch {
                // fallback keeps caretIndex at end
              }
            }
            switchToEdit(caretIndex);
          }}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: buildPreviewHtml() }}
        />
      ) : (
        <textarea
          ref={textareaRef}
          value={value}
          onChange={onChange}
            onFocus={() => setMode('edit')}
          onInput={autoResize}
          placeholder={placeholder}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck={false}
          className="ea-textarea resize-none focus:outline-none pr-24"
          style={{
            ...sharedSurfaceStyle,
            overflow: 'hidden',
            borderColor: 'var(--tb-teal)',
            boxShadow: '0 0 0 3px rgba(8,145,178,0.10)',
          }}
        />
      )}

      {/* Local styles for variable highlighting */}
      <style>{`
        .ea-highlighting-editor .ea-var-value {
          /* Fallback background, then lighter mix for modern browsers */
          background: var(--tb-sage-muted);
          background: color-mix(in srgb, var(--tb-sage-muted) 55%, #ffffff);
          color: var(--tb-navy);
          padding: 2px 6px;
          border-radius: 6px;
          font-weight: 600;
          border: 1px solid color-mix(in srgb, var(--tb-mint) 65%, #ffffff);
          box-shadow: 0 1px 1px rgba(26,54,93,0.06);
          letter-spacing: 0.3px;
          position: relative;
          transition: box-shadow 140ms ease, transform 140ms ease, background-color 160ms ease;
        }
        .ea-highlighting-editor .ea-var-value::after { display: none; }
        .ea-highlighting-editor .ea-var-value:hover {
          box-shadow: 0 2px 5px rgba(26,54,93,0.20);
          transform: translateY(-1px);
          background: color-mix(in srgb, var(--tb-sage-muted) 45%, #ffffff);
        }
      `}</style>
    </div>
  );
};

export default HighlightingEditor;

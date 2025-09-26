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
  // Optional: provide the original template string containing <<Variable>> placeholders
  templateWithPlaceholders,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef(null);
  const previewRef = useRef(null);
  const [pendingCaretIndex, setPendingCaretIndex] = useState(null);

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
    if (isEditing && textareaRef.current) {
      const len = (value || "").length;
      const targetIndex =
        typeof pendingCaretIndex === "number" && pendingCaretIndex >= 0
          ? Math.min(pendingCaretIndex, len)
          : len;
      // Focus without scrolling the page
      try {
        textareaRef.current.focus({ preventScroll: true });
      } catch (_) {
        textareaRef.current.focus();
      }
      try {
        textareaRef.current.setSelectionRange(targetIndex, targetIndex);
      } catch (_) {
        // Ignore if not supported
      }
      // Clear pending index so subsequent toggles default to end unless set again
      setPendingCaretIndex(null);
      // Ensure correct height on entering edit mode
      autoResize();
    }
  }, [isEditing]);

  // Re-calc height when value changes while editing
  useEffect(() => {
    if (isEditing) autoResize();
  }, [value, isEditing]);

  // Escape HTML to safely render user content
  const escapeHtml = (s) =>
    String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  // Build preview HTML strictly from the template with <<variables>> so only placeholder positions are highlighted
  const buildFromTemplate = (template, vars) => {
    if (!template) return { plain: value || "", html: escapeHtml(value || "") };
    const parts = template.split(/(<<[^>]+>>)/g);
    const htmlPieces = [];
    const plainPieces = [];
    parts.forEach((part) => {
      const m = part.match(/^<<([^>]+)>>$/);
      if (m) {
        const name = m[1];
        const val = (vars && typeof vars[name] === "string" ? vars[name] : `<<${name}>>`) || "";
        htmlPieces.push(`<span class="variable-highlight">${escapeHtml(val)}</span>`);
        plainPieces.push(val);
      } else {
        htmlPieces.push(escapeHtml(part));
        plainPieces.push(part);
      }
    });
    return { plain: plainPieces.join(""), html: htmlPieces.join("") };
  };

  // Generate highlighted HTML: prefer template-driven highlighting; if text diverged, avoid noisy guessing
  const generateHighlightedContent = (text) => {
    if (!text) return "";
    // If a template is provided, attempt bracket-based highlighting using static anchors
    if (templateWithPlaceholders) {
      const { html } = highlightUsingAnchors(text, templateWithPlaceholders, variables);
      return html;
    }
    // No template provided: render escaped plain text
    return escapeHtml(text);
  };

  // Utilities to compute caret index inside the preview based on click position
  const getCaretRangeFromPoint = (x, y) => {
    if (document.caretRangeFromPoint) {
      return document.caretRangeFromPoint(x, y);
    }
    const pos = document.caretPositionFromPoint?.(x, y);
    if (pos) {
      const r = document.createRange();
      r.setStart(pos.offsetNode, pos.offset);
      r.collapse(true);
      return r;
    }
    return null;
  };

  const nodeTextLength = (node) => {
    if (!node) return 0;
    if (node.nodeType === Node.TEXT_NODE) return node.textContent.length;
    let len = 0;
    node.childNodes.forEach((child) => {
      len += nodeTextLength(child);
    });
    return len;
  };

  const caretIndexInContainer = (container, targetNode, offset) => {
    // Walk container in-order and sum text lengths until targetNode
    let index = 0;
    const walker = document.createTreeWalker(container, NodeFilter.SHOW_ALL, null);
    let current = walker.currentNode; // container
    // TreeWalker starts at container; move to first node inside for consistent traversal
    current = walker.nextNode();
    while (current) {
      if (current === targetNode) {
        // If it's a text node, offset is within it; otherwise, approximate using accumulated index
        index += current.nodeType === Node.TEXT_NODE ? offset : 0;
        return index;
      }
      // Add the full text length of this node
      if (current.nodeType === Node.TEXT_NODE) {
        index += current.textContent.length;
      }
      current = walker.nextNode();
    }
    return index; // fallback to end
  };

  const handlePreviewClick = (e) => {
    if (!previewRef.current) return;
    const rect = previewRef.current.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    const range = getCaretRangeFromPoint(x, y);
    let nextIndex = null;
    if (range) {
      const { startContainer, startOffset } = range;
      // Ensure the range is within our preview container
      if (previewRef.current.contains(startContainer)) {
        nextIndex = caretIndexInContainer(previewRef.current, startContainer, startOffset);
      }
    }
    // If we failed to compute, default to end
    if (typeof nextIndex !== "number") {
      nextIndex = (value || "").length;
    }
    setPendingCaretIndex(nextIndex);
    setIsEditing(true);
  };

  // Split template into alternating [static, var, static, var, ..., static]
  const splitTemplate = (template) => {
    const parts = template.split(/(<<[^>]+>>)/g);
    const statics = [];
    const vars = [];
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const m = part.match(/^<<([^>]+)>>$/);
      if (m) {
        vars.push(m[1]);
      } else {
        statics.push(part);
      }
    }
    // Ensure statics length is vars.length + 1
    if (statics.length < vars.length + 1) {
      statics.push("");
    }
    return { statics, vars };
  };

  // Try to find anchor in text; if not found, try trimmed or small snippets; fallback to -1
  const findAnchor = (text, anchor, fromIdx) => {
    if (!anchor) return fromIdx; // empty anchor acts as current pointer
    const idx = text.indexOf(anchor, fromIdx);
    if (idx !== -1) return idx;
    const trimmed = anchor.trim();
    if (trimmed && trimmed !== anchor) {
      const i2 = text.indexOf(trimmed, fromIdx);
      if (i2 !== -1) return i2;
    }
    // Try a prefix/suffix snippet to be more forgiving
    const prefix = anchor.slice(0, 12);
    if (prefix) {
      const i3 = text.indexOf(prefix, fromIdx);
      if (i3 !== -1) return i3;
    }
    const suffix = anchor.slice(-12);
    if (suffix) {
      const i4 = text.indexOf(suffix, fromIdx);
      if (i4 !== -1) return i4;
    }
    return -1;
  };

  // Highlight regions between static anchors surrounding each variable placeholder
  const highlightUsingAnchors = (currentText, template, varsMap) => {
    const { statics, vars } = splitTemplate(template);
    const spans = [];
    let cursor = 0;
    for (let i = 0; i < vars.length; i++) {
      const before = statics[i] || "";
      const after = statics[i + 1] || "";
      const varName = vars[i];
      const varVal = typeof varsMap?.[varName] === "string" ? varsMap[varName] : "";
      // Locate 'before' starting at cursor
      let beforeIdx = findAnchor(currentText, before, cursor);
      if (beforeIdx === -1) {
        // If not found, assume cursor as start boundary
        beforeIdx = cursor;
      }
      const beforeEnd = before ? beforeIdx + before.length : beforeIdx;
      // Locate 'after' starting after beforeEnd
      let afterIdx = findAnchor(currentText, after, Math.max(beforeEnd, 0));
      if (afterIdx === -1) {
        afterIdx = currentText.length; // until end
      }
      // Window between anchors
      const winStart = Math.max(beforeEnd, 0);
      const winEnd = Math.max(winStart, afterIdx);
      const windowText = currentText.slice(winStart, winEnd);
      const leftTrimmed = windowText.replace(/^\s+/, "");
      const leftTrimOffset = windowText.length - leftTrimmed.length;
      const trimmedWindowText = leftTrimmed.replace(/\s+$/, "");

      // Attempt to highlight exact replacement text within window
      let start = -1;
      let end = -1;
      if (varVal) {
        // 1) If the trimmed window equals the value, highlight exactly that region
        if (trimmedWindowText === varVal) {
          start = winStart + leftTrimOffset;
          end = start + varVal.length;
        } else if (varVal.length >= 2) {
          // 2) For values length >= 2, search within window
          const idx = windowText.indexOf(varVal);
          if (idx !== -1) {
            start = winStart + idx;
            end = start + varVal.length;
          }
        } else if (varVal.length === 1) {
          // 3) For single-char values, be conservative:
          //    - If the window is small and contains exactly one occurrence, highlight it.
          const maxWindowForSingle = 12; // small window to avoid false positives
          if (windowText.length <= maxWindowForSingle) {
            let count = 0;
            let soleIdx = -1;
            for (let k = 0; k < windowText.length; k++) {
              if (windowText[k] === varVal) {
                count += 1;
                soleIdx = k;
                if (count > 1) break;
              }
            }
            if (count === 1) {
              start = winStart + soleIdx;
              end = start + 1;
            }
          }
        }
      }
      // If value not found, try to highlight placeholder if present
      if (start === -1) {
        const placeholder = `<<${varName}>>`;
        const phIdx = currentText.indexOf(placeholder, winStart);
        if (phIdx !== -1 && phIdx + placeholder.length <= winEnd) {
          start = phIdx;
          end = phIdx + placeholder.length;
        }
      }
      // As a conservative fallback: if we still have nothing and window is small, highlight the whole window
      if (start === -1) {
        const windowLen = winEnd - winStart;
        if (windowLen > 0 && windowLen <= 120 && varVal.length >= 2) {
          start = winStart;
          end = winEnd;
        }
      }
      // Only push a span if we found a confident region
      if (start !== -1 && end !== -1 && end >= start) {
        spans.push({ start, end });
        cursor = end;
      } else {
        cursor = winEnd;
      }
    }

    // Build HTML with spans wrapped
    let html = "";
    let last = 0;
    spans.forEach(({ start, end }) => {
      if (start > last) {
        html += escapeHtml(currentText.slice(last, start));
      }
      html += `<span class="variable-highlight">${escapeHtml(currentText.slice(start, end))}</span>`;
      last = end;
    });
    if (last < currentText.length) {
      html += escapeHtml(currentText.slice(last));
    }
    return { html, spans };
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
    resize: "none",
    outline: "none",
    boxShadow: "none",
    overflowY: "hidden",
  };

  return (
    <>
      <div className="relative group">
        {isEditing ? (
          <textarea
            ref={textareaRef}
            value={value}
            onChange={onChange}
            onInput={autoResize}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck={false}
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
            ref={previewRef}
            onClick={handlePreviewClick}
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

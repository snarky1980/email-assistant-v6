import React, { useRef, useEffect, useState } from "react";

const VariableEditor = ({
  value,
  onChange,
  placeholder,
  minHeight = "60px",
  className = "",
  style = {},
}) => {
  const textareaRef = useRef(null);
  const overlayRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  // Synchronize scroll between textarea and overlay
  const handleScroll = () => {
    if (textareaRef.current && overlayRef.current) {
      overlayRef.current.scrollTop = textareaRef.current.scrollTop;
      overlayRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  };

  // Create highlighted text for overlay
  const createHighlightedText = (text) => {
    if (!text) return "";

    // Replace variables with highlighted spans
    return text.replace(/<<([^>]+)>>/g, (match, variable) => {
      return `<span class="variable">${match}</span>`;
    });
  };

  // Handle textarea changes
  const handleChange = (e) => {
    onChange(e);
  };

  // Handle focus and blur
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  // Update overlay content when value changes
  useEffect(() => {
    if (overlayRef.current) {
      overlayRef.current.innerHTML = createHighlightedText(value);
    }
  }, [value]);

  const baseStyle = {
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif",
    fontSize: "16px",
    fontWeight: "400",
    lineHeight: "1.7",
    letterSpacing: "0.01em",
    minHeight,
    border: "3px solid rgb(134 239 172)",
    borderRadius: "12px",
    padding: "16px",
    resize: "vertical",
    width: "100%",
    transition: "all 0.2s ease-in-out",
    ...style,
  };

  return (
    <div
      className={`editor-container ${className}`}
      style={{ position: "relative" }}
    >
      {/* Overlay for highlighting */}
      <div
        ref={overlayRef}
        className="editor-overlay"
        style={{
          ...baseStyle,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: "none",
          color: "transparent",
          zIndex: 1,
          overflow: "hidden",
          whiteSpace: "pre-wrap",
          wordWrap: "break-word",
          background: "transparent",
        }}
        dangerouslySetInnerHTML={{ __html: createHighlightedText(value) }}
      />

      {/* Actual textarea */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onScroll={handleScroll}
        placeholder={placeholder}
        className="editor-textarea"
        style={{
          ...baseStyle,
          position: "relative",
          zIndex: 2,
          background: "transparent",
          color: isFocused ? "#000" : "#333",
          outline: "none",
        }}
      />

      <style jsx>{`
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
      `}</style>
    </div>
  );
};

export default VariableEditor;

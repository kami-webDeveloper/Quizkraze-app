import { useRef, useState, useEffect } from "react";

export default function TextExpander({
  text,
  collapsedLines = 3,
  className = "",
}) {
  const [expanded, setExpanded] = useState(false);
  const [maxHeight, setMaxHeight] = useState("none");
  const [isOverflowing, setIsOverflowing] = useState(false);

  const fullRef = useRef(null);

  useEffect(() => {
    if (fullRef.current) {
      const el = fullRef.current;
      const fullHeight = el.scrollHeight;
      const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
      const collapsedHeight = lineHeight * collapsedLines;

      if (fullHeight > collapsedHeight + 1) {
        setIsOverflowing(true);
        setMaxHeight(expanded ? `${fullHeight}px` : `${collapsedHeight}px`);
      } else {
        setIsOverflowing(false);
        setMaxHeight("none");
      }
    }
  }, [expanded, collapsedLines, text]);

  return (
    <div className={`relative ${className}`}>
      <div
        ref={fullRef}
        style={{ maxHeight }}
        className="overflow-hidden text-sm text-yellow-800 transition-all duration-500 ease-in-out dark:text-yellow-200"
      >
        {text}
      </div>

      {/* Fading overlay when collapsed */}
      {isOverflowing && !expanded && (
        <div className="absolute left-0 w-full h-8 pointer-events-none bottom-6 bg-gradient-to-t from-yellow-50 to-transparent dark:from-yellow-900/30" />
      )}

      {/* Toggle button */}
      {isOverflowing && (
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="mt-1 text-xs font-medium text-yellow-600 dark:text-yellow-300 hover:underline focus:outline-none"
        >
          {expanded ? "Show less" : "Show more"}
        </button>
      )}
    </div>
  );
}

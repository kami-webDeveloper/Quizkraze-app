import Badge from "./Badge";

// Normalize difficulty-to-color mapping
const difficultyColorMap = {
  easy: "green",
  medium: "amber",
  hard: "red",
  expert: "rose",

  // Fallbacks in case old data structure is still used
  regular: "emerald",
  intermediate: "blue",
  advanced: "rose",
};

export default function DifficultyBadge({ difficulty }) {
  const key = difficulty?.toLowerCase?.();
  const color = difficultyColorMap[key] || "slate";

  return <Badge label={difficulty} color={color} />;
}

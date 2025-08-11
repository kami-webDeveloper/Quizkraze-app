import Badge from "./Badge";

export default function CategoryBadge({ category, color = "slate" }) {
  return <Badge label={category} color={color} />;
}

import Badge from "./Badge";

export default function StatusBadge({ isActive }) {
  return (
    <Badge
      label={isActive ? "Active" : "Finished"}
      color={isActive ? "green" : "orange"}
    />
  );
}

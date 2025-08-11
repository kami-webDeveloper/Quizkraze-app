export default function ActionButton({
  onClick,
  icon: Icon,
  children,
  color = "blue", // 'blue', 'red', 'green', 'orange'
  variant = "filled", // 'filled' | 'outlined' | 'light'
  className = "",
}) {
  const styles = {
    blue: {
      filled: "bg-blue-600 text-white hover:bg-blue-700",
      outlined:
        "border border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100",
      light: "text-blue-600 bg-transparent hover:text-blue-700",
    },
    red: {
      filled: "bg-red-600 text-white hover:bg-red-700",
      outlined: "border border-red-200 bg-red-50 text-red-600 hover:bg-red-100",
      light: "text-red-600 bg-transparent hover:text-red-700",
    },
    green: {
      filled: "bg-green-600 text-white hover:bg-green-700",
      outlined:
        "border border-green-200 bg-green-50 text-green-600 hover:bg-green-100",
      light: "text-green-600 bg-transparent hover:text-green-700",
    },
    orange: {
      filled: "bg-orange-600 text-white hover:bg-orange-700",
      outlined:
        "border border-orange-200 bg-orange-50 text-orange-600 hover:bg-orange-100",
      light: "text-orange-600 bg-transparent hover:text-orange-700",
    },
  };

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-1 px-3 py-1.5 text-sm font-medium rounded-md transition min-w-[100px] ${
        styles[color]?.[variant] || styles.blue.outlined
      } ${className}`}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  );
}

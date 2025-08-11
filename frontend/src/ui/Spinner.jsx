export default function Spinner({ size = 6 }) {
  const sizePx = size * 4; // 1 unit = 0.25rem = 4px approx

  return (
    <div
      className={`inline-block relative`}
      style={{ width: sizePx, height: sizePx }}
      aria-label="Loading"
      role="status"
    >
      <div
        className={`
          absolute inset-0
          border-2 rounded-full
          border-t-blue-500 border-b-green-500 border-l-transparent border-r-transparent
          animate-spin
          dark:border-t-blue-400 dark:border-b-green-400
        `}
      ></div>
    </div>
  );
}

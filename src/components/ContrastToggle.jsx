export default function ContrastToggle({ enabled, onToggle }) {
  return (
    <button
      aria-pressed={enabled}
      onClick={onToggle}
      className="ml-4 p-2 border rounded focus:outline-none focus:ring"
    >
      {enabled ? 'Normal Contrast' : 'High Contrast'}
    </button>
  );
}

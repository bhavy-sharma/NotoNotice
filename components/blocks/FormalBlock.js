export default function FormalBlock({ content, onChange }) {
  return (
    <textarea
      value={content}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Write formal message..."
      className="w-full p-2 border rounded h-24"
    />
  );
}
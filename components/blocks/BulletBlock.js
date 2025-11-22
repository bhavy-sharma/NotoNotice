export default function BulletBlock({ items, onChange }) {
  return (
    <div>
      {items.map((item, i) => (
        <input
          key={i}
          type="text"
          value={item}
          onChange={(e) => {
            const newItems = [...items];
            newItems[i] = e.target.value;
            onChange(newItems);
          }}
          className="w-full p-2 border rounded mt-1"
        />
      ))}
      <button
        onClick={() => onChange([...items, ''])}
        className="mt-2 text-sm text-blue-600"
      >
        + Add Bullet
      </button>
    </div>
  );
}
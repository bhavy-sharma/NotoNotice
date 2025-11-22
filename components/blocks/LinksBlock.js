export default function LinksBlock({ items, onChange }) {
  // Update a specific link field (title or url)
  const updateLink = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    onChange(newItems);
  };

  // Add a new empty link
  const addLink = () => {
    onChange([...items, { title: '', url: '' }]);
  };

  // Remove a link
  const removeLink = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    onChange(newItems);
  };

  return (
    <div className="space-y-3">
      {items.map((link, index) => (
        <div key={index} className="flex flex-col sm:flex-row gap-2 p-2 border rounded">
          <input
            type="text"
            placeholder="Link label (e.g., Registration Form)"
            value={link.title}
            onChange={(e) => updateLink(index, 'title', e.target.value)}
            className="flex-1 p-2 text-sm border border-zinc-300 dark:border-zinc-600 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-zinc-700 text-gray-900 dark:text-white"
          />
          <input
            type="url"
            placeholder="https://example.com"
            value={link.url}
            onChange={(e) => updateLink(index, 'url', e.target.value)}
            className="flex-1 p-2 text-sm border border-zinc-300 dark:border-zinc-600 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-zinc-700 text-gray-900 dark:text-white"
          />
          <button
            type="button"
            onClick={() => removeLink(index)}
            className="px-3 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded self-end sm:self-center"
          >
            Remove
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addLink}
        className="w-full py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded border border-dashed border-blue-300 dark:border-blue-700"
      >
        + Add Another Link
      </button>
    </div>
  );
}
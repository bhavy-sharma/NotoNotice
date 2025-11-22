// src/components/blocks/BulletBlock.js

import { useRef } from 'react';

export default function BulletBlock({ items, onChange }) {
  const textareaRefs = useRef([]);

  const insertFormatting = (index, prefix, suffix) => {
    const input = textareaRefs.current[index];
    if (!input) return;

    const start = input.selectionStart;
    const end = input.selectionEnd;
    const selectedText = items[index].substring(start, end);
    const before = items[index].substring(0, start);
    const after = items[index].substring(end);

    const newText = before + prefix + selectedText + suffix + after;
    const newItems = [...items];
    newItems[index] = newText;
    onChange(newItems);

    // Re-focus and set cursor
    setTimeout(() => {
      input.focus();
      const newCursorPos = start + prefix.length + selectedText.length + suffix.length;
      input.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex flex-col gap-1">
          {/* Toolbar for each bullet */}
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => insertFormatting(i, '**', '**')}
              className="px-2 py-0.5 text-xs bg-gray-200 hover:bg-gray-300 rounded"
              title="Bold (Markdown: **text**)"
            >
              <strong>B</strong>
            </button>
            <button
              type="button"
              onClick={() => insertFormatting(i, '*', '*')}
              className="px-2 py-0.5 text-xs bg-gray-200 hover:bg-gray-300 rounded"
              title="Italic (Markdown: *text*)"
            >
              <em>I</em>
            </button>
          </div>

          {/* Input field */}
          <input
            ref={(el) => (textareaRefs.current[i] = el)}
            type="text"
            value={item}
            onChange={(e) => {
              const newItems = [...items];
              newItems[i] = e.target.value;
              onChange(newItems);
            }}
            placeholder="Type bullet point... (Use **bold** or *italic*)"
            className="w-full p-2 border rounded text-sm"
          />
        </div>
      ))}

      <button
        onClick={() => onChange([...items, ''])}
        className="mt-2 text-sm text-blue-600 font-medium hover:underline"
      >
        + Add Bullet
      </button>
    </div>
  );
}
// src/components/blocks/FormalBlock.js

import { useState, useRef } from 'react';

export default function FormalBlock({ content, onChange }) {
  const textareaRef = useRef(null);

  const insertFormatting = (prefix, suffix) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const before = content.substring(0, start);
    const after = content.substring(end);

    const newText = before + prefix + selectedText + suffix + after;
    onChange(newText);

    // Re-focus and set cursor
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + prefix.length + selectedText.length + suffix.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  return (
    <div className="space-y-2">
      {/* Toolbar */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => insertFormatting('**', '**')}
          className="px-2 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded"
          title="Bold (Markdown: **text**)"
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          onClick={() => insertFormatting('*', '*')}
          className="px-2 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded"
          title="Italic (Markdown: *text*)"
        >
          <em>I</em>
        </button>
      </div>

      {/* Textarea */}
      <textarea
        ref={textareaRef}
        value={content}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write formal message... (Use **bold** or *italic*)"
        className="w-full p-2 border rounded h-32 font-mono text-sm"
      />
    </div>
  );
}
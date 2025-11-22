'use client';

import { useNoticeStore } from '@/store/noticeStore';
import FormalBlock from '@/components/blocks/FormalBlock';
import BulletBlock from '@/components/blocks/BulletBlock';
import LinksBlock from '@/components/blocks/LinksBlock';
import TableBlock from '@/components/blocks/TableBlock'; // Now active!

export default function BlockList() {
  const { notice, addBlock, updateBlock, deleteBlock } = useNoticeStore();

  const handleAddBlock = (type) => {
    let block;
    switch (type) {
      case 'formal':
        block = { type: 'formal', content: '' };
        break;
      case 'bullet':
        block = { type: 'bullet', items: [''] };
        break;
      case 'links':
        block = { type: 'links', items: [{ title: '', url: '' }] };
        break;
      case 'table':
        // Default 2x2 table
        block = { type: 'table', rows: [['', ''], ['', '']] };
        break;
      default:
        return;
    }
    addBlock(block);
  };

  return (
    <div className="mb-6">
      {/* Add Block Buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => handleAddBlock('formal')}
          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium transition-colors"
        >
          + Formal Text
        </button>
        <button
          onClick={() => handleAddBlock('bullet')}
          className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded text-sm font-medium transition-colors"
        >
          + Bullets
        </button>
        <button
          onClick={() => handleAddBlock('links')}
          className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded text-sm font-medium transition-colors"
        >
          + Links
        </button>
        <button
          onClick={() => handleAddBlock('table')}
          className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded text-sm font-medium transition-colors"
        >
          + Table
        </button>
      </div>

      {/* Render Blocks */}
      <div className="space-y-4">
        {notice.blocks.map((block, index) => (
          <div key={index} className="p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg relative bg-white dark:bg-zinc-800">
            {/* Delete Button */}
            <button
              onClick={() => deleteBlock(index)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-lg font-bold"
            >
              &times;
            </button>

            {block.type === 'formal' && (
              <FormalBlock
                content={block.content}
                onChange={(content) => updateBlock(index, { ...block, content })}
              />
            )}

            {block.type === 'bullet' && (
              <BulletBlock
                items={block.items}
                onChange={(items) => updateBlock(index, { ...block, items })}
              />
            )}

            {block.type === 'links' && (
              <LinksBlock
                items={block.items}
                onChange={(items) => updateBlock(index, { ...block, items })}
              />
            )}

            {block.type === 'table' && (
              <TableBlock
                rows={block.rows}
                onChange={(rows) => updateBlock(index, { ...block, rows })}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
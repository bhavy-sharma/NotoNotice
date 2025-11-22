'use client';

import { useNoticeStore } from '@/store/noticeStore';
import FormalBlock from '@/components/blocks/FormalBlock';
import BulletBlock from '@/components/blocks/BulletBlock';
import LinksBlock from '@/components/blocks/LinksBlock';
// Add TableBlock later

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
      default:
        return;
    }
    addBlock(block);
  };

  return (
    <div className="mb-6">
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => handleAddBlock('formal')}
          className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
        >
          + Formal Text
        </button>
        <button
          onClick={() => handleAddBlock('bullet')}
          className="px-3 py-1 bg-green-600 text-white rounded text-sm"
        >
          + Bullets
        </button>
        <button
          onClick={() => handleAddBlock('links')}
          className="px-3 py-1 bg-purple-600 text-white rounded text-sm"
        >
          + Links
        </button>
      </div>

      <div className="space-y-4">
        {notice.blocks.map((block, index) => (
          <div key={index} className="p-3 border rounded relative">
            <button
              onClick={() => deleteBlock(index)}
              className="absolute top-1 right-1 text-red-500 text-xs"
            >
              ✕
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
          </div>
        ))}
      </div>
    </div>
  );
}
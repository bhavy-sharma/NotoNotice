// src/components/editor/BlockList.js

'use client';

import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useNoticeStore } from '@/store/noticeStore';
import FormalBlock from '@/components/blocks/FormalBlock';
import BulletBlock from '@/components/blocks/BulletBlock';
import LinksBlock from '@/components/blocks/LinksBlock';
import TableBlock from '@/components/blocks/TableBlock';

// Sortable Block Wrapper
function SortableBlock({ block, index, updateBlock, deleteBlock }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: index });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : 'auto'
  };

  const renderBlock = () => {
    if (block.type === 'formal') {
      return (
        <FormalBlock
          content={block.content}
          onChange={(content) => updateBlock(index, { ...block, content })}
        />
      );
    }
    if (block.type === 'bullet') {
      return (
        <BulletBlock
          items={block.items}
          onChange={(items) => updateBlock(index, { ...block, items })}
        />
      );
    }
    if (block.type === 'links') {
      return (
        <LinksBlock
          items={block.items}
          onChange={(items) => updateBlock(index, { ...block, items })}
        />
      );
    }
    if (block.type === 'table') {
      return (
        <TableBlock
          rows={block.rows}
          onChange={(rows) => updateBlock(index, { ...block, rows })}
        />
      );
    }
    return null;
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg relative bg-white dark:bg-zinc-800"
    >
      {/* Drag Handle */}
      <div
        {...listeners}
        {...attributes}
        className="absolute top-2 left-2 cursor-grab text-gray-400 hover:text-gray-600"
      >
        ≡
      </div>

      {/* Delete Button */}
      <button
        onClick={() => deleteBlock(index)}
        className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-lg font-bold"
      >
        &times;
      </button>

      {renderBlock()}
    </div>
  );
}

export default function BlockList() {
  const { notice, addBlock, updateBlock, deleteBlock, setNotice } = useNoticeStore();

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = active.id;
    const newIndex = over.id;
    const newBlocks = arrayMove(notice.blocks, oldIndex, newIndex);
    setNotice({ blocks: newBlocks });
  };

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

      {/* Drag & Drop Context */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={notice.blocks.map((_, i) => i)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-4">
            {notice.blocks.map((block, index) => (
              <SortableBlock
                key={index}
                block={block}
                index={index}
                updateBlock={updateBlock}
                deleteBlock={deleteBlock}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
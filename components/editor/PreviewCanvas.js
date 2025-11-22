'use client';

import { useNoticeStore } from '@/store/noticeStore';
import './PreviewCanvas.css'; // We'll write CSS next

export default function PreviewCanvas() {
  const { notice } = useNoticeStore();

  return (
    <div id="notice-preview" className="a4 bg-white shadow">
      {/* Logo & Header */}
      <div className="flex justify-between items-start mb-4">
        {notice.logo && (
          <img src={notice.logo} alt="Logo" className="h-12 object-contain" />
        )}
        <div className="text-center flex-grow">
          <h1 className="text-xl font-bold">{notice.orgName}</h1>
          <p className="text-sm mt-1">Date: {notice.date}</p>
        </div>
        <div></div> {/* Empty right spacer */}
      </div>

      <hr className="mb-4" />

      {/* Title */}
      <h2 className="text-center font-bold text-lg mb-4">{notice.title}</h2>

      {/* Blocks */}
      <div className="space-y-4">
        {notice.blocks.map((block, i) => {
          if (block.type === 'formal') {
            return <p key={i} className="mb-3">{block.content}</p>;
          }
          if (block.type === 'bullet') {
            return (
              <ul key={i} className="list-disc pl-5 space-y-1">
                {block.items.filter(item => item.trim()).map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            );
          }
          if (block.type === 'links') {
            return (
              <div key={i} className="space-y-1">
                {block.items.filter(item => item.title || item.url).map((link, j) => (
                  <div key={j}>
                    <strong>{link.title}:</strong>{' '}
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                      {link.url}
                    </a>
                  </div>
                ))}
              </div>
            );
          }
          return null;
        })}
      </div>

      {/* Signature & Stamp (add later) */}
    </div>
  );
}
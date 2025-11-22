'use client';

import { useNoticeStore } from '@/store/noticeStore';
import './PreviewCanvas.css';

export default function PreviewCanvas() {
  const { notice } = useNoticeStore();

  return (
    <div id="notice-preview" className="a4">
      {/* Logo & Organization Header */}
      <div className="flex justify-between items-start mb-6">
        {notice.logo && (
          <div className="h-12 flex items-center">
            <img src={notice.logo} alt="Organization Logo" className="h-full object-contain" />
          </div>
        )}

        <div className="text-center flex-grow px-4">
          <h1 className="text-xl font-bold text-[#000] leading-tight">
            {notice.orgName || 'Organization Name'}
          </h1>
          <p className="text-[#333] text-sm mt-1">
            Date: {notice.date ? new Date(notice.date).toLocaleDateString('en-GB') : 'DD/MM/YYYY'}
          </p>
        </div>

        {/* Right: Reserve space for notice no. (optional later) */}
        <div className="w-24"></div>
      </div>

      <hr className="border-t border-[#000] mb-6" />

      {/* Notice Title */}
      <h2 className="text-center font-bold text-lg text-[#000] mb-6">
        {notice.title || 'Notice Title'}
      </h2>

      {/* Content Blocks */}
      <div className="space-y-5">
        {notice.blocks.map((block, i) => {
          if (block.type === 'formal') {
            return (
              <p key={i} className="text-[#000] text-base leading-relaxed">
                {block.content || 'Enter formal message...'}
              </p>
            );
          }

          if (block.type === 'bullet') {
            return (
              <ul key={i} className="list-disc pl-6 space-y-1 text-[#000] text-base">
                {block.items
                  .filter(item => item.trim())
                  .map((item, j) => <li key={j}>{item}</li>)}
              </ul>
            );
          }

          if (block.type === 'links') {
            return (
              <div key={i} className="space-y-2">
                {block.items
                  .filter(item => item.title || item.url)
                  .map((link, j) => (
                    <div key={j} className="text-[#000] text-base">
                      <strong>{link.title || 'Link'}:</strong>{' '}
                      <span className="text-blue-700 underline break-words">
                        {link.url}
                      </span>
                    </div>
                  ))}
              </div>
            );
          }

          return null;
        })}
      </div>

      {/* Signature & Stamp placeholders will go here later */}
    </div>
  );
}
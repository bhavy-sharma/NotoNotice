'use client';

import { useEffect } from 'react';
import MetaForm from '@/components/editor/MetaForm';
import BlockList from '@/components/editor/BlockList';
import PreviewCanvas from '@/components/editor/PreviewCanvas';
import { useNoticeStore } from '@/store/noticeStore';

export default function NoticeEditorPage() {
  const { notice, reset } = useNoticeStore();

  // Optional: load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('draft-notice');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        useNoticeStore.getState().setNotice(parsed);
      } catch (e) {
        console.warn('Failed to load draft');
      }
    }

    // Auto-save to localStorage
    const unsubscribe = useNoticeStore.subscribe((state) => {
      localStorage.setItem('draft-notice', JSON.stringify(state.notice));
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-hidden">
      {/* Left Pane - Editor */}
      <div className="w-full lg:w-1/2 p-4 overflow-y-auto">
        <MetaForm />
        <BlockList />
      </div>

      {/* Right Pane - Preview */}
      <div className="w-full lg:w-1/2 bg-gray-50 p-4 overflow-auto">
        <PreviewCanvas />
      </div>
    </div>
  );
}
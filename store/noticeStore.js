import { create } from 'zustand';

export const useNoticeStore = create((set) => ({
  // Initial notice structure
  notice: {
    id: '',
    orgName: '',
    title: '',
    date: new Date().toISOString().split('T')[0],
    logo: null,
    blocks: [],
    signature: null,
    stamp: null,
    styles: {
      font: 'Noto Serif',
      fontSize: '14px',
      primaryColor: '#000'
    }
  },

  // Actions
  setNotice: (partial) => set((state) => ({
    notice: { ...state.notice, ...partial }
  })),

  addBlock: (block) => set((state) => ({
    notice: {
      ...state.notice,
      blocks: [...state.notice.blocks, block]
    }
  })),

  updateBlock: (index, block) => set((state) => {
    const blocks = [...state.notice.blocks];
    blocks[index] = block;
    return { notice: { ...state.notice, blocks } };
  }),

  deleteBlock: (index) => set((state) => {
    const blocks = [...state.notice.blocks];
    blocks.splice(index, 1);
    return { notice: { ...state.notice, blocks } };
  }),

  reset: () => set({
    notice: {
      id: '',
      orgName: '',
      title: '',
      date: new Date().toISOString().split('T')[0],
      logo: null,
      blocks: [],
      signature: null,
      stamp: null,
      styles: {
        font: 'Noto Serif',
        fontSize: '14px',
        primaryColor: '#000'
      }
    }
  })
}));
import { create } from 'zustand';

// Define initial state separately for reuse
const initialNotice = {
  id: '',
  orgName: '',
  branch: '',
  title: '',
  date: new Date().toISOString().split('T')[0],
  logo: null,
  blocks: [],
  signatory: {
    name: '',
    designation: ''
  },
  signature: null,   // for digital signature (image or drawn)
  stamp: null,      // for official stamp
  styles: {
    font: 'Noto Serif',
    fontSize: '14px',
    primaryColor: '#000'
  }
};

export const useNoticeStore = create((set) => ({
  notice: initialNotice,

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
    notice: { ...initialNotice, date: new Date().toISOString().split('T')[0] }
  })
}));
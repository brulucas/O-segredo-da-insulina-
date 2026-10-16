import { create } from 'zustand';

interface HtmlViewState {
  src: string;
  title: string;
}

interface HtmlViewerStore {
  htmlView: HtmlViewState | null;
  openHtml: (src: string, title: string) => void;
  closeHtml: () => void;
}

export const useHtmlViewerStore = create<HtmlViewerStore>((set) => ({
  htmlView: null,
  openHtml: (src: string, title: string) => set({ htmlView: { src, title } }),
  closeHtml: () => set({ htmlView: null })
}));

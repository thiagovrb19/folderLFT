import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ClientProfile, SlideId, DEFAULT_SLIDE_ORDER } from "@/products/consorcios/types/presentation";

interface PresentationState {
  currentSlide: number;
  totalSlides: number;
  isSetupCompleted: boolean;
  isSetupModalOpen: boolean;
  isReorderModalOpen: boolean;
  isPresenterMode: boolean;
  presentationStartTime: number | null;
  client: ClientProfile;
  slideOrder: SlideId[];
  isDrawingMode: boolean;
  slideDrawings: Record<string, string>;

  // Actions
  setSlide: (slide: number) => void;
  nextSlide: () => void;
  prevSlide: () => void;
  setSetupModalOpen: (open: boolean) => void;
  setReorderModalOpen: (open: boolean) => void;
  setSlideOrder: (order: SlideId[]) => void;
  moveSlideOrder: (fromIndex: number, toIndex: number) => void;
  resetSlideOrder: () => void;
  completeSetup: (data: Partial<ClientProfile>) => void;
  togglePresenterMode: () => void;
  updateClient: (data: Partial<ClientProfile>) => void;
  setIsDrawingMode: (active: boolean) => void;
  toggleDrawingMode: () => void;
  setSlideDrawing: (slideKey: string, dataUrl: string | null) => void;
  clearCurrentSlideDrawing: (slideKey: string) => void;
  resetAll: () => void;
}

const initialClient: ClientProfile = {
  brokerName: "Thiago Nunes",
  name: "",
  profession: "",
  company: "",
  clientPhotoUrl: "",
  mainGoal: "Consórcio",

  // Dados PF
  cpf: "",
  rg: "",
  orgaoExpedidor: "",
  dataNascimento: "",
  sexo: "",
  nacionalidade: "Brasileira",
  renda: "",
  cidadeNascimento: "",
  nomeMae: "",
  estadoCivil: "",
  nomeConjuge: "",
  cpfConjuge: "",

  celular: "",
  phone: "",
  email: "",
  cep: "",
  rua: "",
  bairro: "",
  cidadeEstado: "",
  city: "",
  state: "",

  notes: "",
  createdAt: new Date().toISOString(),
};

const customStorage = {
  getItem: (name: string): string | null => {
    if (typeof window === "undefined") return null;
    try {
      return localStorage.getItem(name);
    } catch {
      return null;
    }
  },
  setItem: (name: string, value: string): void => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(name, value);
    } catch {}
  },
  removeItem: (name: string): void => {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem(name);
    } catch {}
  },
};

export const usePresentationStore = create<PresentationState>()(
  persist(
    (set, get) => ({
      currentSlide: 0,
      totalSlides: 11,
      isSetupCompleted: false,
      isSetupModalOpen: false,
      isReorderModalOpen: false,
      isPresenterMode: false,
      presentationStartTime: typeof Date !== "undefined" ? Date.now() : 0,
      client: initialClient,
      slideOrder: [...DEFAULT_SLIDE_ORDER],
      isDrawingMode: false,
      slideDrawings: {},

      setSlide: (slide: number) => {
        const isSetupDone = get().isSetupCompleted;
        if (!isSetupDone && slide !== 0) return;
        const total = get().slideOrder.length;
        const clamped = Math.max(0, Math.min(total, slide));
        set({ currentSlide: clamped });
      },

      nextSlide: () => {
        const isSetupDone = get().isSetupCompleted;
        if (!isSetupDone) return;
        const current = get().currentSlide;
        const total = get().slideOrder.length;
        if (current < total) {
          set({ currentSlide: current + 1 });
        }
      },

      prevSlide: () => {
        const current = get().currentSlide;
        if (current > 0) {
          set({ currentSlide: current - 1 });
        }
      },

      setSetupModalOpen: (open: boolean) => set({ isSetupModalOpen: open }),

      setReorderModalOpen: (open: boolean) => set({ isReorderModalOpen: open }),

      setSlideOrder: (order: SlideId[]) => set({ slideOrder: order }),

      moveSlideOrder: (fromIndex: number, toIndex: number) => {
        const currentOrder = [...get().slideOrder];
        if (
          fromIndex < 0 ||
          fromIndex >= currentOrder.length ||
          toIndex < 0 ||
          toIndex >= currentOrder.length
        ) {
          return;
        }
        const [removed] = currentOrder.splice(fromIndex, 1);
        currentOrder.splice(toIndex, 0, removed);
        set({ slideOrder: currentOrder });
      },

      resetSlideOrder: () => set({ slideOrder: [...DEFAULT_SLIDE_ORDER] }),

      completeSetup: (data: Partial<ClientProfile>) => {
        set((state) => ({
          isSetupCompleted: true,
          client: { ...state.client, ...data },
          currentSlide: 1, // Advance to first presentation slide (Slide 1)
        }));
      },

      togglePresenterMode: () =>
        set((state) => ({ isPresenterMode: !state.isPresenterMode })),

      updateClient: (data: Partial<ClientProfile>) =>
        set((state) => ({
          client: { ...state.client, ...data },
        })),

      setIsDrawingMode: (active: boolean) => set({ isDrawingMode: active }),

      toggleDrawingMode: () =>
        set((state) => ({ isDrawingMode: !state.isDrawingMode })),

      setSlideDrawing: (slideKey: string, dataUrl: string | null) =>
        set((state) => {
          const next = { ...(state.slideDrawings || {}) };
          if (dataUrl) next[slideKey] = dataUrl;
          else delete next[slideKey];
          return { slideDrawings: next };
        }),

      clearCurrentSlideDrawing: (slideKey: string) =>
        set((state) => {
          const next = { ...(state.slideDrawings || {}) };
          delete next[slideKey];
          return { slideDrawings: next };
        }),

      resetAll: () =>
        set({
          isDrawingMode: false,
          slideDrawings: {},
          currentSlide: 0,
          isSetupCompleted: false,
          client: {
            ...initialClient,
            createdAt: new Date().toISOString(),
          },
          slideOrder: [...DEFAULT_SLIDE_ORDER],
          presentationStartTime: Date.now(),
        }),
    }),
    {
      name: "lft-consorcio-v2",
      storage: createJSONStorage(() => customStorage),
      partialize: (state) => ({
        client: state.client,
        isSetupCompleted: state.isSetupCompleted,
        currentSlide: state.currentSlide,
        slideOrder: state.slideOrder,
        slideDrawings: state.slideDrawings || {},
      }),
    }
  )
);

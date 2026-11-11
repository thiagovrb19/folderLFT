import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ClientProfile, Dependent, ActiveInsurance, Recommendation } from "@/products/gestao/types/presentation";
import { SlideId, DEFAULT_SLIDE_ORDER } from "@/products/gestao/lib/slideRegistry";

interface PresentationState {
  currentSlide: number; // 0 = Setup, 1..N = slideOrder[currentSlide - 1]
  slideOrder: SlideId[];
  isSetupCompleted: boolean;
  isSetupModalOpen: boolean;
  isPresenterMode: boolean;
  presentationStartTime: number | null;
  canvasImage: string | null;
  client: ClientProfile;

  // Freehand Drawing Mode across all pages
  isDrawingMode: boolean;
  slideDrawings: Record<string, string>; // slideId or slideIndex -> base64 dataUrl

  // Actions
  setSlide: (slide: number) => void;
  nextSlide: () => void;
  prevSlide: () => void;
  setSlideOrder: (newOrder: SlideId[]) => void;
  moveSlideOrder: (fromIndex: number, toIndex: number) => void;
  resetSlideOrder: () => void;
  setSetupModalOpen: (open: boolean) => void;
  completeSetup: (data: Partial<ClientProfile>) => void;
  togglePresenterMode: () => void;
  setCanvasImage: (dataUrl: string | null) => void;
  setIsDrawingMode: (active: boolean) => void;
  toggleDrawingMode: () => void;
  setSlideDrawing: (slideKey: string, dataUrl: string | null) => void;
  clearCurrentSlideDrawing: (slideKey: string) => void;
  clearAllSlideDrawings: () => void;
  updateClient: (data: Partial<ClientProfile>) => void;
  addDependent: (dependent: Omit<Dependent, "id">) => void;
  removeDependent: (id: string) => void;
  addActiveInsurance: (insurance: Omit<ActiveInsurance, "id">) => void;
  removeActiveInsurance: (id: string) => void;
  addRecommendation: (rec: Omit<Recommendation, "id">) => void;
  removeRecommendation: (id: string) => void;
  resetAll: () => void;
}

const initialClient: ClientProfile = {
  brokerName: "",
  name: "",
  profession: "",
  company: "",
  clientPhotoUrl: "",
  mainGoal: "Seguro de Vida",

  birthDate: "",
  email: "",
  phone: "",
  instagram: "",
  city: "",
  state: "",
  address: "",
  cep: "",
  maritalStatus: "",

  dependents: [],
  clientAge: "",
  clientDependentsSummary: "",

  monthlyIncome: "",
  monthlyExpenses: "",
  expensePercentage: "",
  futureEducationExpenses: "",
  pensionPrivate: "",
  inss: "",
  proLabore: "",
  cardsAndBanks: "",
  emergencyFundMonths: "",

  activeInsurances: [],

  weight: "",
  height: "",
  imc: "",
  hasHealthIssues: "",
  usesMedications: "",
  isSmoker: "",
  riskSportsOrHobbies: "",
  parentsAlive: "",
  parentsHealthIssues: "",

  recommendations: [],
  canvasDrawingData: undefined,
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
      slideOrder: DEFAULT_SLIDE_ORDER,
      isSetupCompleted: false,
      isSetupModalOpen: false,
      isPresenterMode: false,
      presentationStartTime: typeof Date !== "undefined" ? Date.now() : 0,
      canvasImage: null,
      client: initialClient,

      isDrawingMode: false,
      slideDrawings: {},

      setSlide: (slide: number) => {
        const isSetupDone = get().isSetupCompleted;
        if (!isSetupDone && slide !== 0) return;
        const currentOrder = get().slideOrder || DEFAULT_SLIDE_ORDER;
        const total = currentOrder.length;
        const clamped = Math.max(0, Math.min(total, slide));
        set({ currentSlide: clamped });
      },

      nextSlide: () => {
        const isSetupDone = get().isSetupCompleted;
        if (!isSetupDone) return;
        const current = get().currentSlide;
        const currentOrder = get().slideOrder || DEFAULT_SLIDE_ORDER;
        const total = currentOrder.length;
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

      setSlideOrder: (newOrder: SlideId[]) => {
        set({
          slideOrder:
            Array.isArray(newOrder) && newOrder.length > 0
              ? newOrder
              : DEFAULT_SLIDE_ORDER,
        });
      },

      moveSlideOrder: (fromIndex: number, toIndex: number) => {
        const currentOrder = [...(get().slideOrder || DEFAULT_SLIDE_ORDER)];
        if (
          fromIndex < 0 ||
          fromIndex >= currentOrder.length ||
          toIndex < 0 ||
          toIndex >= currentOrder.length
        ) {
          return;
        }
        const [movedItem] = currentOrder.splice(fromIndex, 1);
        currentOrder.splice(toIndex, 0, movedItem);
        set({ slideOrder: currentOrder });
      },

      resetSlideOrder: () => {
        set({ slideOrder: DEFAULT_SLIDE_ORDER });
      },

      completeSetup: (data: Partial<ClientProfile>) => {
        set((state) => ({
          isSetupCompleted: true,
          client: { ...state.client, ...data },
          currentSlide: 1, // Advance to first slide in slideOrder
        }));
      },

      setSetupModalOpen: (open: boolean) => set({ isSetupModalOpen: open }),

      togglePresenterMode: () =>
        set((state) => ({ isPresenterMode: !state.isPresenterMode })),

      setCanvasImage: (dataUrl: string | null) =>
        set((state) => ({
          canvasImage: dataUrl,
          client: {
            ...state.client,
            canvasDrawingData: dataUrl || undefined,
          },
        })),

      setIsDrawingMode: (active: boolean) => set({ isDrawingMode: active }),

      toggleDrawingMode: () =>
        set((state) => ({ isDrawingMode: !state.isDrawingMode })),

      setSlideDrawing: (slideKey: string, dataUrl: string | null) =>
        set((state) => {
          const nextDrawings = { ...(state.slideDrawings || {}) };
          if (dataUrl) {
            nextDrawings[slideKey] = dataUrl;
          } else {
            delete nextDrawings[slideKey];
          }
          return { slideDrawings: nextDrawings };
        }),

      clearCurrentSlideDrawing: (slideKey: string) =>
        set((state) => {
          const nextDrawings = { ...(state.slideDrawings || {}) };
          delete nextDrawings[slideKey];
          return { slideDrawings: nextDrawings };
        }),

      clearAllSlideDrawings: () => set({ slideDrawings: {} }),

      updateClient: (data: Partial<ClientProfile>) =>
        set((state) => {
          const updated = { ...state.client, ...data };
          if (updated.weight && updated.height) {
            const w = parseFloat(String(updated.weight));
            const h = parseFloat(String(updated.height)) / 100;
            if (w > 0 && h > 0) {
              updated.imc = (w / (h * h)).toFixed(1);
            }
          }
          return { client: updated };
        }),

      addDependent: (dependent) =>
        set((state) => ({
          client: {
            ...state.client,
            dependents: [
              ...(state.client.dependents || []),
              { ...dependent, id: Date.now().toString() },
            ],
          },
        })),

      removeDependent: (id) =>
        set((state) => ({
          client: {
            ...state.client,
            dependents: (state.client.dependents || []).filter((d) => d.id !== id),
          },
        })),

      addActiveInsurance: (insurance) =>
        set((state) => ({
          client: {
            ...state.client,
            activeInsurances: [
              ...(state.client.activeInsurances || []),
              { ...insurance, id: Date.now().toString() },
            ],
          },
        })),

      removeActiveInsurance: (id) =>
        set((state) => ({
          client: {
            ...state.client,
            activeInsurances: (state.client.activeInsurances || []).filter(
              (i) => i.id !== id
            ),
          },
        })),

      addRecommendation: (rec) =>
        set((state) => ({
          client: {
            ...state.client,
            recommendations: [
              ...(state.client.recommendations || []),
              { ...rec, id: Date.now().toString() },
            ],
          },
        })),

      removeRecommendation: (id) =>
        set((state) => ({
          client: {
            ...state.client,
            recommendations: (state.client.recommendations || []).filter(
              (r) => r.id !== id
            ),
          },
        })),

      resetAll: () =>
        set({
          currentSlide: 0,
          isSetupCompleted: false,
          client: {
            ...initialClient,
            createdAt: new Date().toISOString(),
          },
          canvasImage: null,
          isDrawingMode: false,
          slideDrawings: {},
          presentationStartTime: Date.now(),
        }),
    }),
    {
      name: "lft-experience-v6",
      storage: createJSONStorage(() => customStorage),
      merge: (persistedState: any, currentState: PresentationState) => {
        const p = persistedState || {};
        const validSlides =
          Array.isArray(p.slideOrder) && p.slideOrder.length > 0
            ? p.slideOrder.filter((id: any) =>
                DEFAULT_SLIDE_ORDER.includes(id as any)
              )
            : DEFAULT_SLIDE_ORDER;

        return {
          ...currentState,
          ...p,
          slideOrder:
            validSlides && validSlides.length > 0
              ? validSlides
              : DEFAULT_SLIDE_ORDER,
          slideDrawings:
            p.slideDrawings && typeof p.slideDrawings === "object"
              ? p.slideDrawings
              : {},
        };
      },
      partialize: (state) => ({
        client: state.client,
        isSetupCompleted: state.isSetupCompleted,
        currentSlide: state.currentSlide,
        slideOrder: state.slideOrder || DEFAULT_SLIDE_ORDER,
        slideDrawings: state.slideDrawings || {},
      }),
    }
  )
);

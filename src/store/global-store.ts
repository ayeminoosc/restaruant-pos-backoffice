import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { Colortype } from "../../types/global";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

type GlobalState = {
  advanceColors: Colortype[];
  isLoading: boolean;
  error: string;
};

type Actions = {
  fetchInitialData: () => Promise<void>;
};

const initialState: GlobalState = {
  advanceColors: [],
  isLoading: false,
  error: "",
};

export const useGlobalStore = create<GlobalState & Actions>()(
  persist(
    immer((set) => ({
      ...initialState,
      fetchInitialData: async () => {
        set((state) => {
          state.isLoading = true;
          state.error = "";
        });
        try {
          const res = await fetch(`${API_BASE}/global/1/global`);
          if (!res.ok) throw new Error("Failed to fetch global data");
          const data: Colortype[] = await res.json();
          set((state) => {
            state.advanceColors = data;
          });
        } catch (err: any) {
          set((state) => {
            state.error = err.message || "Something went wrong";
          });
        } finally {
          set((state) => {
            state.isLoading = false;
          });
        }
      },
    })),
    { name: "global-store" }
  )
);

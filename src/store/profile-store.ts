import { ProfileActions, ProfileState, ProfileType } from "@/types/profile";
import { ENDPOINTS } from "@/utils/api-endpoints";
import { resetLoading, setError, setLoading } from "@/utils/zustand";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const initialState: ProfileState = {
  profile: {
    colorOptions: [],
    groupOptions: [],
    reasonOptions: [],
    unitOptions: [],
  },
  isFetching: false,
  isSubmitting: false,
  status: "idle",
  error: "",
  searchTerm: "",
};

export const useProfileStore = create<ProfileState & ProfileActions>()(
  persist(
    immer((set) => ({
      ...initialState,
      fetchInitialData: async () => {
        setLoading(set, "isFetching");
        try {
          const res = await fetch(ENDPOINTS.getInitialData);
          if (!res.ok) throw new Error("Failed to fetch profile data");
          const data: ProfileType = await res.json();
          set((state) => {
            state.profile = {
              colorOptions: data.colorOptions,
              groupOptions: data.groupOptions,
              reasonOptions: data.reasonOptions,
              unitOptions: data.unitOptions,
            };
          });
        } catch (err: any) {
          if (err instanceof Error) {
            setError(set, err.message);
          } else {
            setError(set, "Something went wrong");
          }
        } finally {
          resetLoading(set, "isFetching");
        }
      },
      setSearchTerm: (term) => set({ searchTerm: term }),
      resetStatus: () =>
        set((state) => {
          state.status = "idle";
        }),
    })),
    { name: "profile-store" }
  )
);

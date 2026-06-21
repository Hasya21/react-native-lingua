import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { LanguageCode } from "@/types/learning";

const LANGUAGE_STORAGE_KEY = "language-storage";

type LanguageState = {
  hasHydrated: boolean;
  selectedLanguage: LanguageCode | null;
  clearSelectedLanguage: () => Promise<void>;
  setHasHydrated: (hasHydrated: boolean) => void;
  setSelectedLanguage: (language: LanguageCode) => void;
};

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      hasHydrated: false,
      selectedLanguage: null,
      clearSelectedLanguage: async () => {
        set({ selectedLanguage: null });
        await AsyncStorage.removeItem(LANGUAGE_STORAGE_KEY);
      },
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
      setSelectedLanguage: (selectedLanguage) => set({ selectedLanguage }),
    }),
    {
      name: LANGUAGE_STORAGE_KEY,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ selectedLanguage: state.selectedLanguage }),
      onRehydrateStorage: (state) => () => state?.setHasHydrated(true),
    },
  ),
);

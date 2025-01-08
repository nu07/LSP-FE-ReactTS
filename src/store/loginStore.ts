import { create } from "zustand";
import { createJSONStorage, persist, devtools } from "zustand/middleware";

interface AppState {
  token: string | null;
  data: Record<string, any> | null;
  isLogin: boolean | null;
  loadingHydration: boolean;
  setToken: (token: string) => void;
  setData: (data: Record<string, any>) => void;
  setIsLogin: (isLogin: boolean) => void;
  setLoadingHydration: (loadingHydration: boolean) => void;
  reset: () => void;
}

const authStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        token: "",
        data: {},
        isLogin: null,
        loadingHydration: true, // Inisialisasi sebagai true
        setToken: (token: string): void => set({ token }),
        setData: (data: Record<string, any>): void => set({ data }),
        setIsLogin: (isLogin: boolean): void => set({ isLogin }),
        setLoadingHydration: (loadingHydration: boolean) =>
          set({ loadingHydration }), // Mengatur state loadingHydrat
        reset: () => {
          // authStore.getState().persist.clearStorage()
          localStorage.clear();
          set({
            token: "",
            data: {},
            isLogin: false,
            // loadingHydration: true,
          });
        },
      }),
      {
        name: "main",
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          token: state.token,
          data: state.data,
          isLogin: state.isLogin,
        }),
        onRehydrateStorage: () => {
          console.log("hydration starts");
          return (state, error) => {
            if (error) {
              console.log("an error happened during hydration", error);
            } else {
              console.log("hydration finished");
            }
            // Pastikan state diatur setelah proses hidrasi selesai
            state?.setLoadingHydration(false);
          };
        },
      }
    ),
    { name: "authStore" }
  )
);

export default authStore;

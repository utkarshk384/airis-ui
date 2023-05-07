import { create } from "zustand";

export type Routes = "patients" | "adminstration";

type NavigationState = {
  route: Routes;
  setRoute: (route: Routes) => void;
};

export const useNavigationStore = create<NavigationState>((set) => ({
  route: "patients",
  setRoute: (route) => set({ route }),
}));

import { create } from "zustand";

type ToastState = {};

export const useNavigationStore = create<ToastState>((set) => ({}));

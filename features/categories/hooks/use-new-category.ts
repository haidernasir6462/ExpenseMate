import { create } from "zustand";

type NewCategoryState = {
  row: { name: string; id: string };
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  setRow: (values: any) => void;
};

export const useNewCategory = create<NewCategoryState>((set) => ({
  row: { name: "", id: "" },
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false, row: { name: "", id: "" } }),
  setRow: (row) => set({ row: row }),
}));

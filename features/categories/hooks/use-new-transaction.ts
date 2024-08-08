import { create } from "zustand";

type NewTransactionState = {
  row: { name: string; id: string };
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  setRow: (values: any) => void;
};

export const useNewTransaction = create<NewTransactionState>((set) => ({
  row: { name: "", id: "" },
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false, row: { name: "", id: "" } }),
  setRow: (row) => set({ row: row }),
}));

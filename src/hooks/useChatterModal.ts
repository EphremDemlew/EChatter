import { create } from "zustand";

interface ChatterModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useChatter = create<ChatterModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  // ^?
}));

export default useChatter;

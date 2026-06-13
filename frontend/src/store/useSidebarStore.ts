import { create } from 'zustand';

interface SidebarState {
  isOpen: boolean;
  isCollapsed: boolean;
  toggleSidebar: () => void;
  collapseSidebar: () => void;
  expandSidebar: () => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isOpen: true,
  isCollapsed: false,
  toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
  collapseSidebar: () => set({ isCollapsed: true }),
  expandSidebar: () => set({ isCollapsed: false }),
}));

// Selectors to prevent unnecessary re-renders
export const useSidebarIsOpen = () => useSidebarStore((state) => state.isOpen);
export const useSidebarIsCollapsed = () => useSidebarStore((state) => state.isCollapsed);
export const useSidebarToggle = () => useSidebarStore((state) => state.toggleSidebar);

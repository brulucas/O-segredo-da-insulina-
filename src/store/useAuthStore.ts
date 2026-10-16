import { create } from 'zustand';

export interface User {
  id: string;
  name: string;
  email: string;
  planType: 'clube' | 'premium';
  startDate: string;
  completedDays: number[];
  timezone: string;
}

export function isClubeMember(_planType?: string): boolean {
  return true;
}

export function createFreshUser(emailInput?: string): User {
  const cleanEmail = (emailInput || "").trim() || "usuario@exemplo.com";
  const nameFromEmail = cleanEmail.includes("@")
    ? cleanEmail.split("@")[0]
    : cleanEmail;
  const capitalizedName =
    nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);

  return {
    id: "user-" + Date.now(),
    name: capitalizedName || "Você",
    email: cleanEmail,
    planType: "premium",
    startDate: new Date().toISOString(), // Starting today (Day 1)
    completedDays: [], // Completely clean, 0 days completed
    timezone: typeof Intl !== 'undefined' ? Intl.DateTimeFormat().resolvedOptions().timeZone : "America/Sao_Paulo"
  };
}

interface AuthState {
  user: User | null;
  ready: boolean;
  init: () => void;
  login: (email: string) => Promise<{ error?: string }>;
  toggleDay: (day: number) => void;
  resetProgress: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  ready: false,
  init: () => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        const parsed = JSON.parse(stored);
        // Ensure completedDays is array and clean any old demo date
        if (!Array.isArray(parsed.completedDays)) {
          parsed.completedDays = [];
        }
        set({ user: parsed, ready: true });
        return;
      }
    } catch {}
    set({ user: null, ready: true });
  },
  login: async (email: string) => {
    const newUser = createFreshUser(email);
    try {
      localStorage.setItem("user", JSON.stringify(newUser));
    } catch {}
    set({ user: newUser });
    return {};
  },
  toggleDay: (day: number) => {
    const curr = get().user;
    if (!curr) return;
    const currentCompleted = Array.isArray(curr.completedDays) ? curr.completedDays : [];
    const exists = currentCompleted.includes(day);
    const updatedDays = exists
      ? currentCompleted.filter(d => d !== day)
      : [...currentCompleted, day].sort((a, b) => a - b);
    
    const updatedUser = { ...curr, completedDays: updatedDays };
    try {
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch {}
    set({ user: updatedUser });
  },
  resetProgress: () => {
    const curr = get().user;
    if (!curr) return;
    const updatedUser = {
      ...curr,
      startDate: new Date().toISOString(),
      completedDays: []
    };
    try {
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch {}
    set({ user: updatedUser });
  },
  logout: () => {
    try {
      localStorage.removeItem("user");
    } catch {}
    set({ user: null });
  }
}));

import { TemplatesData } from '@type/templates';
import { User } from 'firebase/auth';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserStore {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      user: null,
      login: (user: User) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'user-storage',
    }
  )
);

interface InvitationState {
  invitations: TemplatesData[] | null;
  setInvitations: (data: TemplatesData[]) => void;
}

export const useInvitationStore = create<InvitationState>((set) => ({
  invitations: null,
  setInvitations: (data) => set({ invitations: data }),
}));
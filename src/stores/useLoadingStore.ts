import { PageLoading } from '../components/ui/PageLoading';
import { TemplatesData } from '@type/templates';
import { User } from 'firebase/auth';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LoadingStore {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  pageLoading: boolean;
  setPageLoading: (pageLoading: boolean) => void;
}

export const useLoadingStore = create(
  persist<LoadingStore>(
    (set) => ({
      isLoading: false,
      setIsLoading: (isLoading: boolean) => set({ isLoading }),
      pageLoading: false,
      setPageLoading: (pageLoading: boolean) => set({ pageLoading }),
    }),
    {
      name: 'user-storage',
    }
  )
);

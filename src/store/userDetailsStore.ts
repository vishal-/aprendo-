import { create } from 'zustand';
import { UserDetails } from '@/types/userDetails';

interface UserDetailsState {
    userDetails: UserDetails | null;
    setUserDetails: (details: UserDetails | null) => void;
}

export const useUserDetailsStore = create<UserDetailsState>((set) => ({
    userDetails: null,
    setUserDetails: (details) => set({ userDetails: details }),
}));

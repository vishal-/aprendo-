import { create } from 'zustand';
import { persist } from "zustand/middleware";
import { UserDetails } from '@/types/userDetails';

interface UserDetailsState {
    userDetails: UserDetails | null;
    setUserDetails: (details: UserDetails | null) => void;
}

export const useUserDetailsStore = create(
    persist<UserDetailsState>(
        (set) => ({
            userDetails: null,
            setUserDetails: (details) => set({ userDetails: details }),
        }),
        {
            name: "user-info", // key in localStorage
        }
    )
);

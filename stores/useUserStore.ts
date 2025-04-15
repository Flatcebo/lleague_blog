import {create} from "zustand";

interface UserState {
  user: {
    access: string;
    refresh: string;
  } | null;
  setUser: (user: UserState["user"]) => void;
}

const useUserStore = create<UserState>((set) => ({
  user: null,

  setUser: (user) => set({user}),
}));

export default useUserStore;

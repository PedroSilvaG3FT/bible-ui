import { IUserProfile } from "@/modules/@shared/interfaces/user.interface";
import { createStore } from "./_base.store";

interface State {
  user: IUserProfile;
  token: string;

  reset: () => void;
  setUser: (value: IUserProfile) => void;
  setToken: (value: string) => void;
}

export default createStore<State>({
  name: "auth",
  state: (set) => ({
    token: "",
    user: {} as IUserProfile,

    setUser: (user) => set(() => ({ user })),
    setToken: (token) => set(() => ({ token })),
    reset: () => {
      set(() => ({
        token: "",
        user: {} as IUserProfile,
      }));
    },
  }),
});

import { StateCreator, create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface IBuildStoreConfig<Data> {
  state: StateCreator<Data, [], []>;
  storage?: "local" | "session";
  name: string;
}

export const createStore = <State>(config: IBuildStoreConfig<State>) => {
  const { state, name, storage = "local" } = config;

  return create(
    persist(state, {
      name: `@app:${name}`,
      storage: createJSONStorage(() =>
        storage === "local" ? localStorage : sessionStorage
      ),
    })
  );
};

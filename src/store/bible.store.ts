import { createStore } from "./_base.store";
import { IBibleVersionItem } from "@/modules/@shared/interfaces/bible.interface";
import { BIBLE_VERSIONS } from "@/modules/@shared/constants/bible-version.contant";

interface State {
  version: IBibleVersionItem;
  setVersion: (value: IBibleVersionItem) => void;
  reset: () => void;
}

const initialState = {
  version: BIBLE_VERSIONS[0],
} as State;

export default createStore<State>({
  name: "bible",
  state: (set) => ({
    ...initialState,
    setVersion: (version) => set(() => ({ version })),
    reset: () => set(() => ({ ...initialState })),
  }),
});

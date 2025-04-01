import { createStore } from "./_base.store";

import LogoImage from "@/assets/logo.svg";
import { EThemeType } from "@/modules/@shared/enums/theme.enum";

interface State {
  theme: EThemeType;
  logoImage: string;
  setTheme: (theme: EThemeType) => void;
}

export default createStore<State>({
  name: "ui",
  state: (set) => ({
    theme: EThemeType.dark,
    logoImage: LogoImage,
    setTheme: (theme) =>
      set({
        theme,
        logoImage: LogoImage,
      }),
  }),
});

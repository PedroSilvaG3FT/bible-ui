import authStore from "@/store/auth.store";
import { useAuth } from "@/contexts/auth.context";
import { LogIn, LogOut, User } from "lucide-react";
import { Button } from "@/design/components/ui/button";
import useWindowScroll from "@/hooks/window-scroll.hook";
import { useLocation } from "react-router-dom";

export default function AppHeader() {
  const { signOut } = useAuth();
  const isScrolled = useWindowScroll(380);
  const _authStore = authStore((state) => state);
  const location = useLocation();

  const buttonConfig = {
    icon: _authStore.token ? (
      <User className="w-5 h-5" />
    ) : (
      <LogIn className="w-5 h-5" />
    ),
    route: _authStore.token ? "/profile" : "/auth/sign-in",
    label: _authStore.token ? "My Profile" : "Sign In",
  };

  const isHomeRoute = location.pathname === "/";

  return (
    <header className="fixed z-20 w-full h-20 backdrop-blur-sm">
      <nav className="app-container h-full flex gap-4 items-center">
        <img
          alt="iBiblia"
          src="/logo.svg"
          className={`object-contain mr-auto h-6 transition-all duration-300 ${
            isHomeRoute
              ? isScrolled
                ? "brightness-0"
                : "filter brightness-0 invert"
              : "filter brightness-0"
          }`}
        />

        <Button asChild size="sm" variant="outline">
          <a href={buttonConfig.route} className="px-6 flex gap-2 items-center">
            <span className="mobile:hidden">{buttonConfig.label}</span>
            {buttonConfig.icon}
          </a>
        </Button>

        {_authStore.token && (
          <Button
            size="icon"
            variant="outline"
            onClick={signOut}
            className="text-red-400"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        )}
      </nav>
    </header>
  );
}

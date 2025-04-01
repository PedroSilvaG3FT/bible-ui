import { Card, CardContent } from "@/design/components/ui/card";
import { Outlet } from "react-router-dom";

export default function LoginForm({}) {
  return (
    <Card className="overflow-hidden h-[100dvh]">
      <CardContent className="h-full grid p-0 lg:grid-cols-[40%_1fr]">
        <article className="p-6 lg:p-8 flex items-center justify-center max-h-[100dvh] overflow-y-auto">
          <main className="w-full h-full max-w-[450px] bg-red flex items-center justify-center">
            <Outlet />
          </main>
        </article>

        <figure className="relative hidden bg-muted lg:block">
          <img
            src="/images/search-hero-bg.jpg"
            alt="Image"
            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </figure>
      </CardContent>
    </Card>
  );
}

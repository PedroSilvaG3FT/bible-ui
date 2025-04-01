import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth.context";
import { Button } from "@/design/components/ui/button";
import AuthenticationPageNav from "../components/page-nav";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { ArrowRight } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormContainer } from "@/design/components/ui/form";
import Animate from "@/modules/@shared/components/utils/animate";
import { ResponseUtil } from "@/modules/@shared/util/response.util";
import AppFormInput from "@/modules/@shared/components/form/form-input";

const formSchema = z.object({
  email: z.string().min(1, "Required field"),
  password: z.string().min(1, "Required field"),
});

export default function SignIn() {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    signIn(values.email, values.password)
      .then(() => navigate("/"))
      .catch((error) => {
        ResponseUtil.handleError(error);
      });
  }

  return (
    <Animate animation="animate__fadeIn">
      <section className="w-full">
        <AuthenticationPageNav
          title="Login"
          subtitle="Welcome! Please enter your credentials."
        />

        <FormContainer {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 flex flex-col"
          >
            <AppFormInput
              name="email"
              type="email"
              label="Email"
              control={form.control}
              placeholder="Enter your email"
            />

            <AppFormInput
              label="Password"
              name="password"
              type="password"
              control={form.control}
              placeholder="**********"
            />

            <Button type="submit" className="w-full group">
              Sign In
              <ArrowRight className="ml-2 group-hover:ml-4 transition-all duration-500" />
            </Button>

            <section className="flex gap-3 items-center justify-center">
              <a className="underline text-center" href="/auth/sign-up">
                Sign Up
              </a>

              <small>or</small>

              <a className="underline text-center" href="/">
                Back to search
              </a>
            </section>
          </form>
        </FormContainer>
      </section>
    </Animate>
  );
}

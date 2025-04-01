import { z } from "zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import loadingStore from "@/store/loading.store";
import { useAuth } from "@/contexts/auth.context";
import { Button } from "@/design/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthenticationPageNav from "../components/page-nav";
import { FormContainer } from "@/design/components/ui/form";
import Animate from "@/modules/@shared/components/utils/animate";
import { ResponseUtil } from "@/modules/@shared/util/response.util";
import AppFormInput from "@/modules/@shared/components/form/form-input";
import AuthenticationPasswordStrength from "../components/password-strength";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .regex(/[a-zA-Z]/, "Password must contain at least one letter")
  .regex(/\d/, "Password must contain at least one number")
  .regex(
    /[@$!%*#?&]/,
    "Password must contain at least one special character (@$!%*#?&)"
  );

const formSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email").min(1, "Email is required"),
    birthDate: z.string().min(1, "Birth date is required"),
    password: passwordSchema,
    passwordConfirm: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  });

export default function SignUp() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const _loadingStore = loadingStore((state) => state);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      birthDate: "",
      passwordConfirm: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    _loadingStore.setShow(true);
    console.info("values : ", values);
    signUp({
      name: values.name,
      email: values.email,
      password: values.password,
      birthDate: values.birthDate,
    })
      .then(() => {
        navigate("/");
        _loadingStore.setShow(false);
      })
      .catch((error) => {
        ResponseUtil.handleError(error);
        _loadingStore.setShow(false);
      });
  }

  return (
    <Animate animation="animate__fadeIn">
      <section className="w-full overflow-y-auto h-full">
        <AuthenticationPageNav
          title="Sign Up"
          subtitle="Please fill in your details below"
        />

        <FormContainer {...form}>
          <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
            <AppFormInput
              name="name"
              label="Name"
              control={form.control}
              placeholder="Enter your name"
            />

            <AppFormInput
              name="email"
              label="Email"
              control={form.control}
              placeholder="Enter your email"
            />

            <AppFormInput
              type="date"
              name="birthDate"
              label="Birth Date"
              control={form.control}
              placeholder="DD/MM/YYYY"
            />

            <AppFormInput
              label="Password"
              type="password"
              name="password"
              control={form.control}
              placeholder="**********"
            />

            <AppFormInput
              type="password"
              name="passwordConfirm"
              control={form.control}
              placeholder="**********"
              label="Confirm Password"
            />

            <AuthenticationPasswordStrength
              password={form.watch("password") || ""}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={!form.formState.isValid}
            >
              Create Account
            </Button>

            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <a
                onClick={() => navigate("/auth/sign-in")}
                className="underline"
              >
                Go to login
              </a>
            </div>
          </form>
        </FormContainer>
      </section>
    </Animate>
  );
}

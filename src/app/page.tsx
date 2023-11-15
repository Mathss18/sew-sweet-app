"use client";

import Image from "next/image";
import { Button, Input } from "@/components";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { LoginUseCase } from "@/domain/use-cases";
import { useMutation } from "react-query";
import { authService } from "@/services";

const schema = yupResolver(
  yup
    .object()
    .shape({
      email: yup.string().email().required(),
      password: yup.string().min(8).required(),
    })
    .required()
);

export default function LoginPage() {
  const router = useRouter();
  const { mutate: login, isLoading: isBeingSubmited } = useMutation(authService.login, {
    onSuccess: ({ data }) => {
      localStorage.setItem("token", data.accessToken);
      router.push("/admin");
    },
    onError: (error: any) => {
      alert(error.message);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUseCase.Params>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: schema,
  });

  const handleLogin = async ({ email, password }: LoginUseCase.Params) => {
    login({ email, password });
  };

  return (
    <section className="bg-gray-50">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <a className="mb-6 flex items-center text-2xl font-semibold text-gray-900" href="#">
          <Image
            className="mr-2 h-8 w-8"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
            width={32}
            height={32}
          />
          Sew Sweet
        </a>
        <div className="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(handleLogin)}>
              <div>
                <Input
                  data-testid="email"
                  className="w-full"
                  type="text"
                  label="Email"
                  errors={errors}
                  {...register("email")}
                />
              </div>
              <div>
                <Input
                  data-testid="password"
                  className="w-full"
                  type="password"
                  label="Password"
                  errors={errors}
                  {...register("password")}
                />
              </div>
              <Button className="w-full" type="submit" loading={isBeingSubmited}>
                Sign In
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

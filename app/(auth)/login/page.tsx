"use client";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { DEMO_LOGIN_CREDENTIALS } from "@/constants";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { AuthError } from "@supabase/supabase-js";
import Loader from "@/components/loader";
import { redirect } from "next/navigation";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type FormFields = {
  email: string;
  password: string;
};

const schema: yup.ObjectSchema<FormFields> = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const LoginPage = () => {
  const supabase = createClient();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: yupResolver(schema),
  });
  const [error, setError] = useState<AuthError | null>(null);

  const submitHandler = async function(data: FormFields) {
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    setError(error);
    if (!error) {
      redirect("/dashboard");
    }
  };

  return (
    <main className="grid place-content-center h-screen text-center">
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col gap-4 items-center">
          <h1 className="font-sans uppercase text-[6.4rem] leading-[85%]">
            Welcome Back
          </h1>
          <p className="font-serif text-2xl max-w-[642px]">
            Sign in to access your personalized workspace, where you can
            organize tasks, monitor your progress, and keep up with project
            updates.
          </p>
        </div>
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="flex flex-col gap-6 mt-8"
        >
          <div className="flex flex-col gap-4">
            <div>
              <Input
                placeholder="Email"
                className="font-serif placeholder:font-serif px-4 py-5 text-2xl max-w-[400px] h-[3.75rem]"
                type="email"
                {...register("email", {
                  required: true,
                })}
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>
            <div>
              <Input
                placeholder="Password"
                className="font-serif placeholder:font-serif px-4 py-5 text-2xl max-w-[400px] h-[3.75rem]"
                type="password"
                {...register("password", {
                  required: true,
                })}
              />
              {errors.password && <p>{errors.password.message}</p>}
            </div>
          </div>
          <Button
            type="submit"
            className="font-sans grid place-content-center w-[25rem] text-2xl py-5 max-w-[400px] h-[3.75rem]"
          >
            {isSubmitting ? <Loader /> : "Login"}
          </Button>
        </form>
        <p className="font-serif mt-4 text-red-500">{error?.message}</p>
        <div className="font-sans text-xl mt-6">
          <p>Is this your first time here?</p>
          <p>To explore this site, log in with the role of:</p>
        </div>
        <ul className="mt-4 text-base text-white/50 font-serif flex-col flex gap-3">
          {DEMO_LOGIN_CREDENTIALS.map((credentials) => (
            <li key={credentials.username}>
              {`${credentials.username} - with the email `}
              <span className="text-white">{`${credentials.email} `}</span>
              and Password
              <span className="text-white">{` ${credentials.password}`}</span>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default LoginPage;

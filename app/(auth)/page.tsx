"use client";
import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";
import { DEMO_LOGIN_CREDENTIALS } from "@/constants";
import { capitalize } from "@/utils/index";
import { Button } from "@/components/ui/button";

type FormFields = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const { register, handleSubmit } = useForm<FormFields>();

  const submitHandler = function() {
    console.log("hello");
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
            <Input
              placeholder="Username"
              className="placeholder:font-serif px-4 py-5 text-2xl max-w-[400px] h-[3.75rem]"
              {...register("email")}
            />
            <Input
              placeholder="Password"
              className="placeholder:font-serif px-4 py-5 text-2xl max-w-[400px] h-[3.75rem]"
              type="password"
              {...register("password")}
            />
          </div>
          <Button
            type="submit"
            className="font-sans w-[25rem] text-2xl py-5 max-w-[400px] h-[3.75rem]"
          >
            Login
          </Button>
        </form>
        <div className="font-sans text-xl mt-6">
          <p>Is this your first time here?</p>
          <p>To explore this site, log in with the role of:</p>
        </div>
        <ul className="mt-4 text-base text-white/50 font-serif flex-col flex gap-3">
          {DEMO_LOGIN_CREDENTIALS.map((credentials) => (
            <li key={credentials.username}>
              {`${credentials.username
                .split("-")
                .map((word) => capitalize(word))
                .join(" ")} - with the username `}
              <span className="text-white">{`${credentials.username} `}</span>
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

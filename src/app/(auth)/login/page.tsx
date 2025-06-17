"use client";
import { Input } from "@/components/ui/input";
import { Logo1 } from "@/components/ui/logo-1";
import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input/password-input";
import { toast } from "sonner";

const formSchema = z.object({
  username: z.string().min(1, {
    message: "Username field cannot be empty",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});

export default function Login() {
  const [isLogin, setIsLogin] = React.useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLogin(true);
    try {
      const result = await signIn("credentials", {
        username: values.username,
        password: values.password,
        redirect: false,
      });
      if (result?.error) {
        console.error(result.error);
      } else {
        toast("Login success");
        router.push("/");
      }
    } catch (error) {
      toast("Login Failed");
      console.error(error);
    } finally {
      setIsLogin(false);
    }
  }

  return (
    <div className="sm:bg-gray-100 bg-white w-full h-[100vh] flex justify-center items-center">
      <div className=" bg-white rounded-[12px] w-[400px] flex flex-col items-center py-[40px] px-[16px] gap-[24px]">
        <Logo1 className="w-[134px] h-[24px]" />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-[24px]  w-full"
          >
            <div className="flex flex-col gap-[12px]">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium">Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Input username"
                        {...field}
                        className="h-10 font-normal text-gray-900"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium">Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="Input password"
                        {...field}
                        className="h-10 font-normal text-slate-900"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              disabled={isLogin}
              type="submit"
              className=" w-full text-slate-50"
            >
              Login
            </Button>
          </form>
        </Form>
        <p className="font-normal text-[14px] text-sm text-slate-600">
          Don`t have an account?{" "}
          <a
            href="https://logoipsum-test.vercel.app/register"
            className="underline text-blue-600"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
}

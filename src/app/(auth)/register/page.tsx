"use client";
import { Input } from "@/components/ui/input";
import { Logo1 } from "@/components/ui/logo-1";
import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/utils/axios";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
const formSchema = z.object({
  username: z.string().min(1, {
    message: "Username field cannot be empty",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
  role: z.enum(["User", "Admin"], { required_error: "Please select a role" }),
});

export default function Register() {
  const [isRegister, setIsRegister] = React.useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsRegister(true);
    try {
      const response = await api.post("/auth/register", {
        username: values.username,
        password: values.password,
        role: values.role,
      });
      if (response.status == 201) {
        toast("account have been created");
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
      }
    } catch (err) {
      console.log(err);
      toast(`Something went wrong, maybe your username is already registered`);
    } finally {
      setIsRegister(false);
    }
  };

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

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium">Role</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full font-normal text-sm text-[14px] text-gray-900">
                          <SelectValue placeholder="Select Role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="User">User</SelectItem>
                            <SelectItem value="Admin">Admin</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              className=" w-full text-slate-50"
              disabled={isRegister}
            >
              Register
            </Button>
          </form>
        </Form>
        <p className="font-normal text-[14px] text-sm text-slate-600">
          Already have an account?{" "}
          <a
            href="http://localhost:3000/login"
            className="underline text-blue-600"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

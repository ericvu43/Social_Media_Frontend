"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const ResetPasswordPage = () => {
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!token || !email) {
      setErrorMessage("Invalid or missing token/email");
      return;
    }

    const requestData = {
      email,
      token,
      new_password: values.newPassword, // Ensure the field name matches the serializer
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/auth/password-reset/confirm/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to reset password');
      }

      const data = await response.json();
      console.log('Password reset successfully:', data);
      setIsSuccess(true);
    } catch (error) {
      console.error('Error resetting password:', error);
      if (error instanceof Error) {
        setErrorMessage(error.message || 'An error occurred');
      } else {
        setErrorMessage('An error occurred');
      }
    }
  };

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Card className="w-[400px] p-6">
        <div className="flex flex-col space-y-2 text-center mb-6">
          <h1 className="text-2xl font-semibold tracking-tight">
            Reset Password
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your new password below.
          </p>
        </div>

        {isSuccess ? (
          <div className="text-center text-green-600 mb-4">
            Password reset successfully. You can now <a href="/login" className="text-primary hover:underline">login</a> with your new password.
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <input
                        type="password"
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Enter your new password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <input
                        type="password"
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Confirm your new password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {errorMessage && (
                <div className="text-center text-red-600 mb-4">
                  {errorMessage}
                </div>
              )}
              <Button type="submit" className="w-full">
                Reset Password
              </Button>
            </form>
          </Form>
        )}
      </Card>
    </div>
  );
};

export default ResetPasswordPage;
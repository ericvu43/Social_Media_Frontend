"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
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
  email: z.string().email("Please enter a valid email address"),
  otp: z.string().length(6, "OTP must be 6 characters"),
});

const OTPPage = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      otp: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/auth/verify-otp/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response from server:', errorData);
        setErrorMessage(errorData.error || 'Failed to verify OTP');
        throw new Error(errorData.error || 'Failed to verify OTP');
      }

      const data = await response.json();
      console.log('OTP verified successfully:', data);

      // Store tokens in local storage
      localStorage.setItem('accessToken', data.access);
      localStorage.setItem('refreshToken', data.refresh);

      // Redirect to feed page
      router.push('/feed');

    } catch (error) {
      console.error('Error verifying OTP:', error);
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
            Verify OTP
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter the OTP sent to your email
          </p>
        </div>

        {errorMessage && (
          <div className="text-red-500 text-center mb-4">
            {errorMessage}
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <input
                      type="email"
                      className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="john.doe@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>OTP</FormLabel>
                  <FormControl>
                    <input
                      type="text"
                      className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="123456"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Verify OTP
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default OTPPage;
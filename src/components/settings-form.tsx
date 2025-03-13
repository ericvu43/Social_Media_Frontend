"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileForm } from "./profile-form";
import { PasswordForm } from "./password-form";

export function SettingsForm() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <Tabs
      defaultValue="profile"
      value={activeTab}
      onValueChange={setActiveTab}
      className="space-y-4"
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="profile" className="space-y-4">
        <ProfileForm />
      </TabsContent>
      <TabsContent value="password" className="space-y-4">
        <PasswordForm />
      </TabsContent>
    </Tabs>
  );
}

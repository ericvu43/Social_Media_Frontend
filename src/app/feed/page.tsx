"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const FeedPage = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center text-center space-y-6">
        <h1 className="text-4xl font-bold">Your Feed</h1>
        <p className="text-lg text-muted-foreground">
          Stay updated with the latest posts from your community.
        </p>
      </div>

      {/* User Posts Section */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Latest Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Example post cards */}
          <Card className="p-4 shadow-md">
            <h3 className="text-lg font-bold">User123</h3>
            <p className="text-sm text-muted-foreground">Just had an amazing trip to Japan! 🌸</p>
          </Card>
          <Card className="p-4 shadow-md">
            <h3 className="text-lg font-bold">FoodLover</h3>
            <p className="text-sm text-muted-foreground">Tried this new burger place 🍔🔥</p>
          </Card>
          <Card className="p-4 shadow-md">
            <h3 className="text-lg font-bold">GamerX</h3>
            <p className="text-sm text-muted-foreground">Who's hyped for the next-gen consoles? 🎮</p>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-16 text-center text-sm text-muted-foreground">
        © 2025 Social Media Service. All rights reserved.
      </footer>
    </div>
  );
};

export default FeedPage;

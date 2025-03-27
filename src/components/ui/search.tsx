"use client";

import { useState, FormEvent } from "react";

export function Search() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Search query:", searchQuery);
      // Here you would typically call your search API
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSearch} className="flex w-full gap-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow p-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-black text-white hover:bg-black/80 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        >
          Search
        </button>
      </form>
    </div>
  );
}

import { Metadata } from "next";
import { Search } from "@/components/ui/search";

export const metadata: Metadata = {
  title: "Feed",
  description: "Your personalized feed",
};

export default function FeedPage() {
  return (
    <div className="container max-w-screen-md py-8">
      <Search />
      <div className="mt-4">Feed Page</div>
    </div>
  );
}

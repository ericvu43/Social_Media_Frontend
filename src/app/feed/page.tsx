import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Feed",
  description: "Your personalized feed",
};

export default function FeedPage() {
  return <div className="container max-w-screen-md py-8">Feed Page</div>;
}

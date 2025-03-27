import { Metadata } from "next";
import { Search } from "@/components/ui/search";
import { SocialActions } from "@/components/ui/social-actions";

export const metadata: Metadata = {
  title: "Feed",
  description: "Your personalized feed",
};

// Just for testing
const exampleComments = [
  {
    id: "1",
    text: "This is a great example post!",
    username: "Bobby Billy",
  },
  // {
  //   id: "2",
  //   text: "I love the new social features.",
  //   username: "John Smith",
  // },
];

export default function FeedPage() {
  return (
    <div className="container max-w-screen-md py-8">
      <Search />
      <div className="mt-4">
        <div className="rounded-lg border p-4 mb-4">
          <h3 className="font-medium mb-2">Post Title Example</h3>
          <p className="text-gray-600 mb-3">
            This is an example post content to demonstrate the social actions
            component.
          </p>
          <SocialActions initialLikes={12} initialComments={exampleComments} />
        </div>
        <div className="mt-4">Feed Page</div>
      </div>
    </div>
  );
}

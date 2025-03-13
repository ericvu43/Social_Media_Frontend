import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coming Soon",
  description: "This feature will be available soon.",
};

export default function WillUpdatePage() {
  return (
    <div className="container max-w-screen-md py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Update this page to something</h1>
      </div>
    </div>
  );
}

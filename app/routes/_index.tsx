import type { MetaFunction } from "@remix-run/cloudflare";

export const meta: MetaFunction = () => {
  return [
    { title: "Password Sharer" },
    { name: "description", content: "Safely share a password with a friend" },
  ];
};

export default function Index() {
  return (
    <div>
      <h1>Welcome to password sharer</h1>
    </div>
  );
}

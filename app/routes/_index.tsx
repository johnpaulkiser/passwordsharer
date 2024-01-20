import type { MetaFunction } from "@remix-run/cloudflare";
import React from "react";
import { Button } from "~/components/ui/button";

export const meta: MetaFunction = () => {
  return [
    { title: "Password Sharer" },
    { name: "description", content: "Safely share a password with a friend" },
  ];
};

export default function Index() {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <h1 className="text-emerald-700">Welcome to password sharer</h1>
      <Button onPress={() => setCount((c) => c + 1)}>{count}</Button>
    </div>
  );
}

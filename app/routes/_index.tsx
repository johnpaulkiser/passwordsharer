import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/cloudflare";
import { Form, json, useLoaderData } from "@remix-run/react";
import { Button } from "~/components/ui/button";

export const meta: MetaFunction = () => {
  return [
    { title: "Password Sharer" },
    { name: "description", content: "Safely share a password with a friend" },
  ];
};

interface Env {
  URL_KEYS: KVNamespace;
}

export async function action({ context, request }: ActionFunctionArgs) {
  console.log("action", context, request);

  const body = await request.formData();
  const count = body.get("count") as string;

  if (!count) {
    return new Response("Missing count", { status: 400 });
  }

  const env = context.env as Env;
  await env.URL_KEYS.put("count", count);
  return new Response("OK", { status: 200 });
}

export function loader({ context }: LoaderFunctionArgs) {
  const env = context.env as Env;
  console.log("loader", env.URL_KEYS);
  try {
    return env.URL_KEYS.get("count");
  } catch (e) {
    return json({ error: JSON.stringify(e) }, { status: 500 });
  }
}

export default function Index() {
  const data = useLoaderData<typeof loader>();
  if (data && typeof data !== "string") {
    console.error("Invalid data", data);
  }

  const count = data ? parseInt(data as string) : 0;

  return (
    <Form method="post">
      <Button type="submit" value={(count + 1).toString()} name="count">
        {count}
      </Button>
    </Form>
  );
}

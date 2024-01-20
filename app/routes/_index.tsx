import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/cloudflare";
import { Form, json, useFetcher, useLoaderData } from "@remix-run/react";
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
  return env.URL_KEYS.get("count");
}

export default function Index() {
  const data = useLoaderData<typeof loader>();
  const fetcher = useFetcher();
  const count = data ? parseInt(data as string) : 0;

  return (
    <fetcher.Form method="post">
      <Button
        type="submit"
        isDisabled={fetcher.state != "idle"}
        value={(count + 1).toString()}
        name="count"
      >
        {count}
      </Button>
    </fetcher.Form>
  );
}

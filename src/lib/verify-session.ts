import "server-only";

import { headers } from "next/headers";
import { auth } from "./auth";
import { cache } from "react";
import { redirect } from "@/i18n/navigation";

export const verifySession = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect({href: "/login", locale: "en"});
  }
});

import { createServerFn } from "@tanstack/react-start";
// import { ConvexHttpClient } from "convex/browser";
// import { api } from "@/convex/_generated/api";
import { env } from "@/env.server";
import { zContactCreate } from "@/lib/domain";

// CONTACT ---------------------------------------------------------------------------------------------------------------------------------
export const createContact = createServerFn({ method: "POST" })
  .inputValidator(zContactCreate)
  .handler(({ data }) => {
    console.log("creating contact", env.VITE_CONVEX_URL);
    return env.VITE_CONVEX_URL;
    // const convex = new ConvexHttpClient(env.VITE_CONVEX_URL);
    // await convex.mutation(api.contacts.create, data);
  });

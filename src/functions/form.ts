import { createServerFn } from "@tanstack/react-start";
import { zContactCreate } from "@/lib/domain";

// CONTACT ---------------------------------------------------------------------------------------------------------------------------------
export const createContact = createServerFn({ method: "POST" })
  .inputValidator(zContactCreate)
  .handler(({ data }) => {
    return import.meta.env;
    // console.log("creating contact", env.VITE_CONVEX_URL);
    // return env.VITE_CONVEX_URL;
    // const convex = new ConvexHttpClient(env.VITE_CONVEX_URL);
    // await convex.mutation(api.contacts.create, data);
  });

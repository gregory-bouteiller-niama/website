import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    CONVEX_DEPLOYMENT: z.string(),
    VITE_CONVEX_URL: z.url(),
    WORKOS_API_KEY: z.string(),
    WORKOS_CLIENT_ID: z.string(),
    WORKOS_COOKIE_PASSWORD: z.string(),
    WORKOS_REDIRECT_URI: z.url(),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});

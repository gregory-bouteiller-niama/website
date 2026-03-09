import { defineSchema, defineTable } from "convex/server";
import { zodOutputToConvex } from "convex-helpers/server/zod4";
import { zContactFields } from "@/lib/domain";

// The schema is entirely optional.
// You can delete this file (schema.ts) and the
// app will continue to work.
// The schema provides more precise TypeScript types.
export default defineSchema({
  contacts: defineTable(zodOutputToConvex(zContactFields)),
});

import { z } from "zod/mini";

// FIELDS ----------------------------------------------------------------------------------------------------------------------------------
export const zContactFields = z.object({
  discipline: z.enum(["anima", "animus", "new", "unknown", "yogart"]),
  email: z.email(),
  forename: z.string(),
  message: z.string(),
  subject: z.enum(["attendant", "discipline", "question"]),
  surname: z.string(),
});

// VALUES ----------------------------------------------------------------------------------------------------------------------------------
export const zContactCreateValues = z.object({
  discipline: z.enum(["anima", "animus", "new", "unknown", "yogart"]),
  email: z.email("Ce champ doit être un courriel valide"),
  forename: z.string().check(z.minLength(1, "Ce champ est requis")),
  message: z.string().check(z.minLength(1, "Ce champ est requis")),
  subject: z.enum(["attendant", "discipline", "question"]),
  surname: z.string().check(z.minLength(1, "Ce champ est requis")),
});

// CRUD ------------------------------------------------------------------------------------------------------------------------------------
export const zContactCreate = zContactFields;

// TYPES -----------------------------------------------------------------------------------------------------------------------------------
export type Contacts = {
  Create: z.infer<typeof zContactCreate>;
  CreateValues: z.infer<typeof zContactCreateValues>;
  Fields: z.infer<typeof zContactFields>;
};

export const defaultContactCreateValues: Contacts["CreateValues"] = {
  discipline: "unknown",
  email: "",
  forename: "",
  message: "",
  subject: "discipline",
  surname: "",
};

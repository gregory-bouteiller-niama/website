import { linkOptions } from "@tanstack/react-router";

// DATA ------------------------------------------------------------------------------------------------------------------------------------
export const navs = linkOptions([
  { key: "les-voies", text: "Les voies", to: "/", hash: "les-voies" },
  { key: "les-accompagnants", text: "Les accompagnants", to: "/", hash: "les-accompagnants" },
  { key: "contact", text: "Contact", to: "/", hash: "contact" },
]);

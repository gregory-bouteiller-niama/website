import { linkOptions } from "@tanstack/react-router";

// PUBLIC ----------------------------------------------------------------------------------------------------------------------------------
export const readPublicLayout = () => ({
  navs: linkOptions([
    { key: "les-voies", text: "Les voies", to: "/", hash: "les-voies" },
    { key: "les-accompagnants", text: "Les accompagnants", to: "/", hash: "les-accompagnants" },
    { key: "contact", text: "Contact", to: "/", hash: "contact" },
  ]),
  socials: [
    { key: "youtube", icon: "icon-[line-md--youtube-filled]", href: "https://youtube.com/@niama-fr", label: "YouTube" },
    { key: "instagram", icon: "icon-[line-md--instagram]", href: "https://www.instagram.com/niama.fr/", label: "Instagram" },
  ],
});
export type ReadPublicLayoutProps = ReturnType<typeof readPublicLayout>;

export const disciplines = [
  {
    color: "rgba(71, 153, 201, .25)",
    name: "yog'art",
    slug: "yogart",
    title: "Yog'art",
    description: [
      "Le Yog'art associe yoga et exploration artistique au cours de séances mêlant respiration, mouvement et création afin de favoriser la détente et la présence à soi.",
      "Cette approche soutient le bien-être et invite à développer une meilleure connaissance de soi, sans pression ni jugement.",
    ],
  },
  {
    color: "rgba(205, 106, 142, .25)",
    name: "anima",
    slug: "anima",
    title: "Hypnose spirituelle",
    description: [
      "L'hypnose spirituelle vous amène à explorer les facettes de votre Être qui se manifestent sur différents plans, dans un état expansé de conscience.",
      "Par cette connexion à votre partie sage, l'accompagnant fait émerger de vous les enseignements propices à votre parcours.",
    ],
  },
  {
    color: "rgba(76, 167, 171, .25)",
    name: "animus",
    slug: "animus",
    title: "Hormèse subtile",
    description: [
      "L'hormèse subtile allie le concept d'hormèse, consistant à apporter au corps physique un stress modéré afin de le renforcer, et l'applique au niveau des corps subtils.",
      "Par un échange verbal, l'accompagnant suscite le juste mouvement en vous afin de vous aider à retrouver votre alignement.",
    ],
  },
] as const;
export type DisciplinesSlug = (typeof disciplines)[number]["slug"];

export const getDisciplineBySlug = (slug: DisciplinesSlug) => {
  const discipline = disciplines.find((discipline) => discipline.slug === slug);
  if (!discipline) throw new Error(`unknown discipline slug: ${slug}`);
  return discipline;
};

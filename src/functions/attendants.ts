import { readDiscisplinesBySlug } from "./disciplines";
import { readImageBySlug } from "./images";

export const allAttendants = [
  {
    description: [
      "L’art et le yoga m’accompagnent depuis de nombreuses années.",
      " J’ai commencé par le dessin très jeune, en explorant différentes formes artistiques, avant de découvrir plus tard le yoga, qui m’a permis de me reconnecter à mon corps et à mes sensations.",
      "Aujourd’hui, je relie ces deux univers à travers le Yog’art, une pratique qui invite au bien-être, à la créativité et à une meilleure connaissance de soi, dans un espace accessible et bienveillant.",
    ],
    disciplineSlugs: ["yogart" as const],
    imageSlug: "eliana-corre" as const,
    name: "Eliana Corré",
  },
  {
    description: [
      "Un début de parcours chaotique, emprunt de solitude et de mal-être sur ce que j'aime aujourd'hui appeler le plateau de jeu. Et puis un beau jour, une question se présente :",
      "Qui es-Tu ?",
      "M'amenant à changer drastiquement de cap et à me responsabiliser sur le chemin de la Vie.",
      "Depuis, j'accompagne celles et ceux en quête de souveraineté et de liberté à travers deux voies complémentaires : l'hypnose spirituelle et l'hormèse subtile.",
    ],
    disciplineSlugs: ["anima" as const, "animus" as const],
    imageSlug: "gregory-bouteiller" as const,
    name: "Grégory Bouteiller",
  },
];

export const attendantFrom = ({ description, disciplineSlugs, imageSlug, name }: Attendants["Entry"]) => ({
  description,
  disciplines: readDiscisplinesBySlug(disciplineSlugs),
  image: readImageBySlug(imageSlug),
  name,
});

export const readAllAttendants = () => allAttendants.map(attendantFrom);

export type Attendants = { Entity: ReturnType<typeof attendantFrom>; Entry: (typeof allAttendants)[number] };

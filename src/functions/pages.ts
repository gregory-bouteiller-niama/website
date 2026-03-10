import { readAllAttendants } from "./attendants";
import { readAllDisciplines } from "./disciplines";

// INDEX -----------------------------------------------------------------------------------------------------------------------------------
export const readIndexPage = () => ({
  attendants: {
    description:
      "Il est toujours plus agréable et plus éclairant de cheminer avec quelqu'un. Nos accompagnants vous invitent à explorer les sentiers, à leurs côtés, au rythme de votre intuition et vous partagent les expériences de leurs propres pas.",
    items: readAllAttendants(),
    title: "puis votre accompagnant",
  },
  contact: {
    description:
      "Notre portail, actuellement à ses prémices, est amené lui aussi à grandir en vous proposant plus de choix et de fonctionnalités. N'hésitez pas à nous contacter si vous souhaitez entamer un parcours, proposer votre voie ou devenir vous-même accompagnant. Sentez-vous libres de nous faire part de vos remarques ou poser vos questions.",
    title: "Et arpentez le chemin...",
  },
  hero: {
    description:
      "Une constellation d'accompagnants rassemblés autour d'une philosophie commune : vous guider sur le chemin de votre alignement intérieur.",
    title: "L'équilibre invisible rendu tangible",
  },
  disciplines: {
    description:
      "Nous vous proposons différentes pistes sur lesquelles sillonner. Aucune n'est exclusive ou ne détient à elle seule la vérité. Optez simplement pour celle avec laquelle votre Être résonne dans le moment présent et sentez vous libre d'en explorer d'autres par la suite.",
    items: readAllDisciplines(),
    title: "Choisissez votre voie",
  },
});
export type ReadIndexPageProps = ReturnType<typeof readIndexPage>;

import { AttendantsCarousel } from "@/components/attendants/carousel";
import { Section } from "@/components/section";

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
export function IndexAttendants() {
  const data = {
    attendants: [
      {
        description: [
          "L’art et le yoga m’accompagnent depuis de nombreuses années. J’ai commencé par le dessin très jeune, en explorant différentes formes artistiques, avant de découvrir plus tard le yoga, qui m’a permis de me reconnecter à mon corps et à mes sensations.",
          "Aujourd’hui, je relie ces deux univers à travers le Yog’art, une pratique qui invite au bien-être, à la créativité et à une meilleure connaissance de soi, dans un espace accessible et bienveillant.",
        ],
        name: "Eliana Corré",
        disciplines: ["Yog'art"],
        image:
          "https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        description: [
          "This place exceeded all expectations! The atmosphere is inviting, and the staff truly goes above and beyond. I'll keep returning for more exceptional dining experience.",
        ],
        name: "Grégory Bouteiller",
        disciplines: ["Hormèse subtile", "Hypnose spirituelle"],
        image:
          "https://images.unsplash.com/photo-1628749528992-f5702133b686?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D",
      },
      {
        description: [
          "Shining Yam is a hidden gem! The impeccable service and overall attention to detail created a memorable experience. I highly recommend it!",
        ],
        name: "Peut-être vous ?",
        disciplines: ["Votre discipline"],
        image:
          "https://images.unsplash.com/photo-1524267213992-b76e8577d046?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D",
      },
    ],
    description:
      "Il est toujours plus agréable et plus éclairant de cheminer avec quelqu'un. Nos accompagnants vous invitent à explorer les sentiers, à leurs côtés, au rythme de votre intuition et vous partagent les expériences de leurs propres pas.",
    title: "puis votre accompagnant",
  };
  return (
    <Section id="les-accompagnants" {...data} withSeparator>
      <AttendantsCarousel attendants={data.attendants} autoplay={10} />
    </Section>
  );
}

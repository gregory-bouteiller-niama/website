import { cva } from "class-variance-authority";
import { AttendantsCarousel } from "@/components/attendants/carousel";
import { Section } from "@/components/section";

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
const ATTENDANTS = {
  carouselContainer: cva("relative flex items-center justify-center"),
  wrapper: cva("relative flex min-h-[300px] flex-wrap items-center justify-center gap-6 rounded-lg p-16"),
};

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
export function IndexAttendants() {
  const data = {
    attendants: [
      {
        quote:
          "I was impressed by the food! And I could really tell that they use high-quality ingredients. The staff was friendly and attentive. I'll definitely be back for more!",
        name: "Eliana Corré",
        disciplines: ["Yog'Art"],
        src: "https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        quote:
          "This place exceeded all expectations! The atmosphere is inviting, and the staff truly goes above and beyond. I'll keep returning for more exceptional dining experience.",
        name: "Grégory Bouteiller",
        disciplines: ["Hormèse subtile", "Hypnose spirituelle"],
        src: "https://images.unsplash.com/photo-1628749528992-f5702133b686?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D",
      },
      {
        quote:
          "Shining Yam is a hidden gem! The impeccable service and overall attention to detail created a memorable experience. I highly recommend it!",
        name: "Peut-être vous ?",
        disciplines: ["Votre discipline"],
        src: "https://images.unsplash.com/photo-1524267213992-b76e8577d046?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D",
      },
    ],
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    title: "puis votre accompagnant",
  };
  return (
    <Section id="les-accompagnants" {...data} withSeparator>
      <div className={ATTENDANTS.wrapper()}>
        <div className={ATTENDANTS.carouselContainer()} style={{ maxWidth: "1024px" }}>
          <AttendantsCarousel
            autoplay={true}
            colors={{
              name: "#f7f7ff",
              designation: "#e1e1e1",
              testimony: "#f1f1f7",
              arrowBackground: "#0582CA",
              arrowForeground: "#141414",
              arrowHoverBackground: "#f7f7ff",
            }}
            fontSizes={{
              name: "28px",
              designation: "20px",
              quote: "20px",
            }}
            testimonials={data.attendants}
          />
        </div>
      </div>
    </Section>
  );
}

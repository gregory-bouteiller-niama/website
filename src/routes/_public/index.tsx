import { createFileRoute } from "@tanstack/react-router";
import { cva } from "class-variance-authority";
import { MotionCarousel } from "@/components/animate-ui/components/community/motion-carousel";
import { Section } from "@/components/section";
import CircularTestimonials from "@/components/ui/circular-testimonials";
import { Separator } from "@/components/ui/separator";

// ROUTE -----------------------------------------------------------------------------------------------------------------------------------
export const Route = createFileRoute("/_public/")({
  component: IndexPage,
});

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
const PAGE = {
  base: cva("container mx-auto flex flex-col items-center px-4 py-8 sm:px-8"),
};

// PAGE ------------------------------------------------------------------------------------------------------------------------------------
function IndexPage() {
  return (
    <div className={PAGE.base()}>
      <Hero />
      <Disciplines />
      <Attendants />
      <Contact />
    </div>
  );
}

// HERO ------------------------------------------------------------------------------------------------------------------------------------
function Hero() {
  return (
    <Section className="flex flex-1 flex-col items-center justify-center gap-12" id="top-3">
      <div className="flex w-full max-w-3xl flex-col items-center gap-8 py-8">
        <h1 className="text-center font-heading text-7xl sm:text-8xl">L'équilibre invisible rendu tangible</h1>
        <p className="text-center text-lg text-muted-foreground sm:text-xl">
          Une constellation d'accompagnants rassemblés autour d'une philosophie commune : vous guider sur le chemin de votre alignement
          intérieur.
        </p>
      </div>
    </Section>
  );
}

// DISCIPLINES -----------------------------------------------------------------------------------------------------------------------------
function Disciplines() {
  const OPTIONS = { loop: true };
  const SLIDE_COUNT = 6;
  const SLIDES = Array.from(new Array(SLIDE_COUNT).keys());

  return (
    <Section className="relative flex w-full flex-col items-center gap-4" id="les-voies">
      <Separator className="self-center! h-24" orientation="vertical" />
      <h2 className="text-center font-heading text-6xl">Choisissez votre voie</h2>
      <p className="mb-12 max-w-3xl text-center text-lg text-muted-foreground">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor
        sit amet consectetur adipisicing elit.
      </p>
      <MotionCarousel options={OPTIONS} slides={SLIDES} />
    </Section>
  );
}

// ATTENDANTS ------------------------------------------------------------------------------------------------------------------------------
function Attendants() {
  const testimonials = [
    {
      quote:
        "I was impressed by the food! And I could really tell that they use high-quality ingredients. The staff was friendly and attentive. I'll definitely be back for more!",
      name: "Tamar Mendelson",
      designation: "Restaurant Critic",
      src: "https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "This place exceeded all expectations! The atmosphere is inviting, and the staff truly goes above and beyond. I'll keep returning for more exceptional dining experience.",
      name: "Joe Charlescraft",
      designation: "Frequent Visitor",
      src: "https://images.unsplash.com/photo-1628749528992-f5702133b686?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D",
    },
    {
      quote:
        "Shining Yam is a hidden gem! The impeccable service and overall attention to detail created a memorable experience. I highly recommend it!",
      name: "Martina Edelweist",
      designation: "Satisfied Customer",
      src: "https://images.unsplash.com/photo-1524267213992-b76e8577d046?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D",
    },
  ];
  return (
    <Section className="relative flex w-full flex-col items-center gap-4" id="les-accompagnants">
      <Separator className="self-center! h-24" orientation="vertical" />
      <h2 className="text-center font-heading text-6xl">puis votre accompagnant</h2>
      <p className="mb-12 max-w-3xl text-center text-lg text-muted-foreground">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor
        sit amet consectetur adipisicing elit.
      </p>
      <div className="relative flex min-h-[300px] flex-wrap items-center justify-center gap-6 rounded-lg p-16">
        <div className="relative flex items-center justify-center" style={{ maxWidth: "1024px" }}>
          <CircularTestimonials
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
            testimonials={testimonials}
          />
        </div>
      </div>
    </Section>
  );
}

// CONTACT -------------------------------------------------------------------------------------------------------------------------------
function Contact() {
  return (
    <Section className="relative flex h-[1600px] flex-col gap-4" id="contact">
      <Separator className="self-center! h-24" orientation="vertical" />
      <h2 className="text-center font-heading text-6xl">Et arpentez le chemin...</h2>
      <p className="mb-12 max-w-3xl text-center text-lg text-muted-foreground">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor
        sit amet consectetur adipisicing elit.
      </p>
    </Section>
  );
}

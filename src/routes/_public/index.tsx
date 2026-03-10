import { createFileRoute } from "@tanstack/react-router";
import { cva } from "class-variance-authority";
import { AttendantsCarousel } from "@/components/attendants/carousel";
import { DisciplinesCarousel } from "@/components/disciplines/carousel";
import { Section } from "@/components/section";
import { Separator } from "@/components/ui/separator";
import { readIndexPage } from "@/functions/pages";
import { IndexContactForm } from "./index/-contact-form";

// ROUTE -----------------------------------------------------------------------------------------------------------------------------------
export const Route = createFileRoute("/_public/")({
  component: IndexPage,
  loader: () => readIndexPage(),
});

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
const PAGE = {
  base: cva("container mx-auto flex flex-col items-center px-4 py-8 sm:px-8"),
};

const HERO = {
  base: cva("flex flex-1 flex-col items-center justify-center gap-12"),
  content: cva("flex w-full max-w-3xl flex-col items-center gap-8 py-8"),
  description: cva("text-center font-light text-muted-foreground text-xl sm:text-2xl"),
  title: cva("text-center font-heading text-7xl sm:text-8xl"),
};

// PAGE ------------------------------------------------------------------------------------------------------------------------------------
function IndexPage() {
  const { attendants, contact, disciplines, hero } = Route.useLoaderData();

  return (
    <div className={PAGE.base()}>
      <Section className={HERO.base()} id="top-3">
        <div className={HERO.content()}>
          <h1 className={HERO.title()}>{hero.title}</h1>
          <p className={HERO.description()}>{hero.description}</p>
        </div>
      </Section>
      <Section id="les-voies" {...disciplines} withSeparator>
        <DisciplinesCarousel {...disciplines} />
      </Section>
      <Section id="les-accompagnants" {...attendants} withSeparator>
        <AttendantsCarousel {...attendants} autoplay={10} />
      </Section>
      <Section id="contact" {...contact} withSeparator>
        <IndexContactForm />
        <Separator className="self-center! mb-34 h-24" orientation="vertical" />
      </Section>
    </div>
  );
}

import { cva } from "class-variance-authority";
import { Section } from "@/components/section";

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
const HERO = {
  base: cva("flex flex-1 flex-col items-center justify-center gap-12"),
  content: cva("flex w-full max-w-3xl flex-col items-center gap-8 py-8"),
  description: cva("text-center text-lg text-muted-foreground sm:text-xl"),
  title: cva("text-center font-heading text-7xl sm:text-8xl"),
};

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
export function IndexHero() {
  return (
    <Section className={HERO.base()} id="top-3">
      <div className={HERO.content()}>
        <h1 className={HERO.title()}>L'équilibre invisible rendu tangible</h1>
        <p className={HERO.description()}>
          Une constellation d'accompagnants rassemblés autour d'une philosophie commune : vous guider sur le chemin de votre alignement
          intérieur.
        </p>
      </div>
    </Section>
  );
}

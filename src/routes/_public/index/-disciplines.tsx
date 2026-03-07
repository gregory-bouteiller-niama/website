import { MotionCarousel } from "@/components/adapted/motion-carousel";
import { Section } from "@/components/section";

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
export function IndexDisciplines() {
  const OPTIONS = { loop: true };
  const SLIDE_COUNT = 6;
  const SLIDES = Array.from(new Array(SLIDE_COUNT).keys());

  const data = {
    title: "Choisissez votre voie",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  };

  return (
    <Section id="les-voies" {...data} withSeparator>
      <MotionCarousel options={OPTIONS} slides={SLIDES} />
    </Section>
  );
}

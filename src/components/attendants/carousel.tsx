import { Image } from "@unpic/react";
import { cva } from "class-variance-authority";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Attendants } from "@/functions/attendants";
import { Button } from "../adapted/button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "../adapted/card";
import { SpotlightCard } from "../adapted/spotlight-card";
import { DisciplinesBadge } from "../disciplines/badge";

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
const STYLES = {
  actions: cva("flex w-32 justify-between self-center rounded-full border p-2"),
  aside: cva("perspective-[1000px] relative flex aspect-square min-h-96 w-full flex-1 justify-center"),
  base: cva("flex w-full max-w-6xl flex-col items-center gap-8 lg:flex-row lg:gap-20"),
  description: cva("flex flex-col gap-1 text-pretty text-center font-light text-base"),
  disciplines: cva("flex justify-center gap-1"),
  image: cva("absolute size-full rounded-4xl object-cover shadow-xl transition-all duration-800 ease-[cubic-bezier(0.4,2,0.3,1)]", {
    variants: {
      status: {
        current: "translate-0 pointer-events-auto z-40 rotate-y-0 scale-100 opacity-100",
        next: "pointer-events-auto z-30 translate-x-15 -translate-y-12 -rotate-y-15 scale-85 opacity-100",
        other: "pointer-events-none z-10 opacity-0",
        prev: "pointer-events-auto z-20 -translate-x-15 -translate-y-12 rotate-y-15 scale-85 opacity-100",
      },
    },
  }),
  main: cva("flex flex-1 flex-col justify-between gap-4"),
  name: cva("text-center font-bold font-heading text-3xl"),
};

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
export const AttendantsCarousel = ({ autoplay = Number.NaN, items }: AttendantsCarouselProps) => {
  // STATE
  const [activeIndex, setActiveIndex] = useState(0);
  // REFS
  const asideRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<NodeJS.Timeout>(undefined);
  // MEMOS
  const size = items.length;
  const active = items[activeIndex];
  // CALLBACKS
  const getStatus = useCallback(
    (index: number) => {
      if (index === activeIndex) return "current";
      if ((activeIndex - 1 + size) % size === index) return "prev";
      if ((activeIndex + 1) % size === index) return "next";
      return "other";
    },
    [activeIndex, size]
  );

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % size);
    clearInterval(autoplayRef.current);
  }, [size]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + size) % size);
    clearInterval(autoplayRef.current);
  }, [size]);
  // AUTOPLAY
  useEffect(() => {
    if (!Number.isNaN(autoplay)) autoplayRef.current = setInterval(() => setActiveIndex((prev) => (prev + 1) % size), autoplay * 1000);
    return () => clearInterval(autoplayRef.current);
  }, [autoplay, size]);
  // KEYBOARD NAV
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleNext, handlePrev]);

  return (
    <div className={STYLES.base()}>
      <aside className={STYLES.aside()} ref={asideRef}>
        {items.map(({ image }, index) => (
          <Image
            {...image}
            className={STYLES.image({ status: getStatus(index) })}
            data-index={index}
            key={image.alt}
            operations={{ imagekit: { f: "avif" } }}
            sizes="(min-width: 1280px) 536px, (min-width: 1024px) 440px, (min-width: 768px) 704px, (min-width: 640px) 576px, 100vw"
          />
        ))}
      </aside>
      <main className={STYLES.main()}>
        <AnimatePresence mode="wait">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="flex-1"
            exit={{ opacity: 0, y: -20 }}
            initial={{ opacity: 0, y: 20 }}
            key={activeIndex}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <SpotlightCard className="h-full lg:h-[448px] xl:h-[400px]">
              <CardHeader>
                <CardTitle className={STYLES.name()}>{active.name}</CardTitle>
                <CardDescription className={STYLES.disciplines()}>
                  {active.disciplines.map(({ slug }) => (
                    <DisciplinesBadge key={slug} slug={slug} />
                  ))}
                </CardDescription>
              </CardHeader>
              <CardContent className={STYLES.description()}>
                {active.description.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </CardContent>
            </SpotlightCard>
          </motion.div>
        </AnimatePresence>
        <div className={STYLES.actions()}>
          <Button aria-label="Participant précédent" className="cursor-pointer" onClick={handlePrev} size="icon-sm" variant="outline">
            <span className="icon-[lucide--chevron-left]" />
          </Button>
          <Button aria-label="Participant suivant" className="cursor-pointer" onClick={handleNext} size="icon-sm" variant="outline">
            <span className="icon-[lucide--chevron-right]" />
          </Button>
        </div>
      </main>
    </div>
  );
};
export type AttendantsCarouselProps = { autoplay?: number; items: Attendants["Entity"][] };

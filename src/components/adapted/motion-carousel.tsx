import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, type Transition } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/animate-ui/components/buttons/button";

const transition: Transition = {
  type: "spring",
  stiffness: 240,
  damping: 24,
  mass: 1,
};

const useEmblaControls = (emblaApi: EmblaCarouselType | undefined): EmblaControls => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(true);

  const onDotClick = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  const onPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const onNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const updateSelectionState = (api: EmblaCarouselType) => {
    setSelectedIndex(api.selectedScrollSnap());
    setPrevDisabled(!api.canScrollPrev());
    setNextDisabled(!api.canScrollNext());
  };

  const onInit = useCallback((api: EmblaCarouselType) => {
    setScrollSnaps(api.scrollSnapList());
    updateSelectionState(api);
  }, []);

  const onSelect = useCallback((api: EmblaCarouselType) => {
    updateSelectionState(api);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    emblaApi.on("reInit", onInit).on("select", onSelect);

    return () => {
      emblaApi.off("reInit", onInit).off("select", onSelect);
    };
  }, [emblaApi, onInit, onSelect]);

  return {
    selectedIndex,
    scrollSnaps,
    prevDisabled,
    nextDisabled,
    onDotClick,
    onPrev,
    onNext,
  };
};

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
export function MotionCarousel(props: MotionCarouselProps) {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const { selectedIndex, scrollSnaps, prevDisabled, nextDisabled, onDotClick, onPrev, onNext } = useEmblaControls(emblaApi);

  return (
    <div className="w-full space-y-4 [--slide-height:9rem] [--slide-size:55%] [--slide-spacing:1.5rem] sm:[--slide-height:13rem] md:[--slide-height:18rem]">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y touch-pinch-zoom">
          {slides.map((index) => {
            const isActive = index === selectedIndex;

            return (
              <motion.div className="mr-(--slide-spacing) flex h-(--slide-height) min-w-0 flex-none basis-(--slide-size)" key={index}>
                <motion.div
                  animate={{
                    scale: isActive ? 1 : 0.9,
                  }}
                  className="flex size-full select-none items-center justify-center rounded-xl border-4 font-semibold text-3xl md:text-5xl"
                  initial={false}
                  transition={transition}
                >
                  {index + 1}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-between">
        <Button disabled={prevDisabled} onClick={onPrev} size="icon">
          <ChevronLeft className="size-5" />
        </Button>

        <div className="flex flex-wrap items-center justify-end gap-2">
          {scrollSnaps.map((_, index) => (
            <DotButton key={index} label={`Slide ${index + 1}`} onClick={() => onDotClick(index)} selected={index === selectedIndex} />
          ))}
        </div>

        <Button disabled={nextDisabled} onClick={onNext} size="icon">
          <ChevronRight className="size-5" />
        </Button>
      </div>
    </div>
  );
}
type MotionCarouselProps = {
  slides: number[];
  options?: EmblaOptionsType;
};

// DOT BUTTON ------------------------------------------------------------------------------------------------------------------------------
function DotButton({ selected = false, label, onClick }: DotButtonProps) {
  return (
    <motion.button
      animate={{
        width: selected ? 68 : 12,
        height: selected ? 28 : 12,
      }}
      className="flex cursor-pointer select-none items-center justify-center rounded-full border-none bg-primary text-primary-foreground text-sm"
      initial={false}
      layout
      onClick={onClick}
      transition={transition}
      type="button"
    >
      <motion.span
        animate={{
          opacity: selected ? 1 : 0,
          scale: selected ? 1 : 0,
          filter: selected ? "blur(0)" : "blur(4px)",
        }}
        className="block whitespace-nowrap px-3 py-1"
        initial={false}
        layout
        transition={transition}
      >
        {label}
      </motion.span>
    </motion.button>
  );
}
type DotButtonProps = { selected?: boolean; label: string; onClick: () => void };

// TYPES -----------------------------------------------------------------------------------------------------------------------------------
type EmblaControls = {
  selectedIndex: number;
  scrollSnaps: number[];
  prevDisabled: boolean;
  nextDisabled: boolean;
  onDotClick: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
};

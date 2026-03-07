import { cva } from "class-variance-authority";
import { AnimatePresence, motion } from "framer-motion";
import type React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Badge } from "@/components/adapted/badge";

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
const STYLES = {
  arrowButton: cva(
    "flex h-[2.7rem] w-[2.7rem] cursor-pointer items-center justify-center rounded-full border-none transition-colors duration-300"
  ),
  arrowButtons: cva("flex gap-6 pt-12 md:pt-0"),
  designation: cva("mb-8"),
  imageContainer: cva("perspective-[1000px] relative h-96 w-full"),
  name: cva("mb-1 font-bold"),
  quote: cva("leading-[1.75]"),
  testimonialContainer: cva("w-full max-w-4xl p-8"),
  testimonialContent: cva("flex flex-col justify-between"),
  testimonialGrid: cva("grid gap-20 md:grid-cols-2"),
  testimonialImage: cva("absolute h-full w-full rounded-[1.5rem] object-cover shadow-[0_10px_30px_rgba(0,0,0,0.2)]"),
};

function calculateGap(width: number) {
  const minWidth = 1024;
  const maxWidth = 1456;
  const minGap = 60;
  const maxGap = 86;
  if (width <= minWidth) return minGap;
  if (width >= maxWidth) return Math.max(minGap, maxGap + 0.060_18 * (width - maxWidth));
  return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
export const AttendantsCarousel = ({ testimonials, autoplay = true, colors = {}, fontSizes = {} }: AttendantsCarouselProps) => {
  // Color & font config
  const colorName = colors.name ?? "#000";
  const colorDesignation = colors.designation ?? "#6b7280";
  const colorTestimony = colors.testimony ?? "#4b5563";
  const colorArrowBg = colors.arrowBackground ?? "#141414";
  const colorArrowFg = colors.arrowForeground ?? "#f1f1f7";
  const colorArrowHoverBg = colors.arrowHoverBackground ?? "#00a6fb";
  const fontSizeName = fontSizes.name ?? "1.5rem";
  const fontSizeDesignation = fontSizes.designation ?? "0.925rem";
  const fontSizeQuote = fontSizes.quote ?? "1.125rem";

  // State
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverPrev, setHoverPrev] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1200);

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const testimonialsLength = useMemo(() => testimonials.length, [testimonials]);
  const activeTestimonial = useMemo(() => testimonials[activeIndex], [activeIndex, testimonials]);

  // Responsive gap calculation
  useEffect(() => {
    function handleResize() {
      if (imageContainerRef.current) {
        setContainerWidth(imageContainerRef.current.offsetWidth);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Autoplay
  useEffect(() => {
    if (autoplay) {
      autoplayIntervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonialsLength);
      }, 5000);
    }
    return () => {
      if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    };
  }, [autoplay, testimonialsLength]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line
  }, [activeIndex, testimonialsLength]);

  // Navigation handlers
  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonialsLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [testimonialsLength]);
  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + testimonialsLength) % testimonialsLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [testimonialsLength]);

  // Compute transforms for each image (always show 3: left, center, right)
  function getImageStyle(index: number): React.CSSProperties {
    const gap = calculateGap(containerWidth);
    const maxStickUp = gap * 0.8;
    const offset = (index - activeIndex + testimonialsLength) % testimonialsLength;
    const isActive = index === activeIndex;
    const isLeft = (activeIndex - 1 + testimonialsLength) % testimonialsLength === index;
    const isRight = (activeIndex + 1) % testimonialsLength === index;
    if (isActive) {
      return {
        zIndex: 3,
        opacity: 1,
        pointerEvents: "auto",
        transform: "translateX(0px) translateY(0px) scale(1) rotateY(0deg)",
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    if (isLeft) {
      return {
        zIndex: 2,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(15deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    if (isRight) {
      return {
        zIndex: 2,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(-15deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    // Hide all other images
    return {
      zIndex: 1,
      opacity: 0,
      pointerEvents: "none",
      transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
    };
  }

  // Framer Motion variants for quote
  const quoteVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className={STYLES.testimonialContainer()}>
      <div className={STYLES.testimonialGrid()}>
        {/* Images */}
        <div className={STYLES.imageContainer()} ref={imageContainerRef}>
          {testimonials.map((testimonial, index) => (
            <img
              alt={testimonial.name}
              className={STYLES.testimonialImage()}
              data-index={index}
              height={500}
              key={testimonial.src}
              src={testimonial.src}
              style={getImageStyle(index)}
              width={500} // Added to resolve biome/img error
            />
          ))}
        </div>
        {/* Content */}
        <div className={STYLES.testimonialContent()}>
          <AnimatePresence mode="wait">
            <motion.div
              animate="animate"
              exit="exit"
              initial="initial"
              key={activeIndex}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              variants={quoteVariants}
            >
              <h3 className={STYLES.name()} style={{ color: colorName, fontSize: fontSizeName }}>
                {activeTestimonial.name}
              </h3>
              <div className={STYLES.designation()} style={{ color: colorDesignation, fontSize: fontSizeDesignation }}>
                {activeTestimonial.disciplines.map((discipline) => (
                  <Badge key={discipline}>{discipline}</Badge>
                ))}
              </div>
              <motion.p className={STYLES.quote()} style={{ color: colorTestimony, fontSize: fontSizeQuote }}>
                {activeTestimonial.quote.split(" ").map((word, i) => (
                  <motion.span
                    animate={{
                      filter: "blur(0px)",
                      opacity: 1,
                      y: 0,
                    }}
                    initial={{
                      filter: "blur(10px)",
                      opacity: 0,
                      y: 5,
                    }}
                    key={`${activeTestimonial.name}-${word}-${i}`}
                    style={{ display: "inline-block" }}
                    transition={{
                      duration: 0.22,
                      ease: "easeInOut",
                      delay: 0.025 * i,
                    }}
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </motion.p>
            </motion.div>
          </AnimatePresence>
          <div className={STYLES.arrowButtons()}>
            <button
              aria-label="Previous testimonial"
              className={STYLES.arrowButton({ className: "prev-button" })}
              onClick={handlePrev}
              onMouseEnter={() => setHoverPrev(true)}
              onMouseLeave={() => setHoverPrev(false)}
              style={{
                backgroundColor: hoverPrev ? colorArrowHoverBg : colorArrowBg,
              }}
              type="button"
            >
              <FaArrowLeft color={colorArrowFg} size={28} />
            </button>
            <button
              aria-label="Next testimonial"
              className={STYLES.arrowButton({ className: "next-button" })}
              onClick={handleNext}
              onMouseEnter={() => setHoverNext(true)}
              onMouseLeave={() => setHoverNext(false)}
              style={{
                backgroundColor: hoverNext ? colorArrowHoverBg : colorArrowBg,
              }}
              type="button"
            >
              <FaArrowRight color={colorArrowFg} size={28} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export type AttendantsCarouselProps = {
  autoplay?: boolean;
  colors?: Colors;
  fontSizes?: FontSizes;
  testimonials: Testimonial[];
};

// TYPES -----------------------------------------------------------------------------------------------------------------------------------
type Testimonial = {
  disciplines: string[];
  name: string;
  quote: string;
  src: string;
};

type Colors = {
  arrowBackground?: string;
  arrowForeground?: string;
  arrowHoverBackground?: string;
  designation?: string;
  name?: string;
  testimony?: string;
};

type FontSizes = {
  designation?: string;
  name?: string;
  quote?: string;
};

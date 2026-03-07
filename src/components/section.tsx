import { useNavigate } from "@tanstack/react-router";
import { motion, useInView } from "motion/react";
import { useEffect, useRef } from "react";

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
export function Section({ children, className, id }: SectionProps) {
  const navigate = useNavigate();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { margin: "-74px 0px -100% 0px" });
  const isInViewAnimate = useInView(ref, { margin: "0% 0px -30% 0px" });

  useEffect(() => {
    if (isInView) navigate({ to: "/", hash: id?.startsWith("top") ? "top" : id, replace: true, hashScrollIntoView: false });
  }, [isInView, id, navigate]);

  return (
    <>
      {/* <InViewDebugOverlay margin={margin} /> */}
      <motion.section
        animate={isInViewAnimate ? { opacity: 1, y: 0 } : {}}
        className={className}
        id={id}
        initial={{ opacity: 0, y: 20 }}
        ref={ref}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.section>
    </>
  );
}
export type SectionProps = React.PropsWithChildren<{ className?: string; id?: string }>;

function InViewDebugOverlay({ margin = "-100px 0px -100px 0px" }) {
  // Parse "top right bottom left" (like CSS margin, but inverted for inset)
  const [top, right, bottom, left] = margin.split(" ").map((v) => v.trim());

  return (
    <div
      style={{
        position: "fixed",
        top: top.startsWith("-") ? top.slice(1) : `-${top}`,
        right: right.startsWith("-") ? right.slice(1) : `-${right}`,
        bottom: bottom.startsWith("-") ? bottom.slice(1) : `-${bottom}`,
        left: left.startsWith("-") ? left.slice(1) : `-${left}`,
        border: "1px dashed red",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
}

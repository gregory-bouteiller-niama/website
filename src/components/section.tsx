import { useNavigate } from "@tanstack/react-router";
import { cva } from "class-variance-authority";
import { motion, useInView } from "motion/react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
export const SECTION = {
  base: cva("relative flex w-full flex-col items-center gap-4 pb-8"),
  description: cva("mb-12 max-w-4xl text-center font-light text-lg text-muted-foreground sm:text-xl"),
  separator: cva("self-center! h-24"),
  title: cva("text-center font-heading text-6xl"),
};

export function Section({ children, className, description, id, title, withSeparator }: SectionProps) {
  const navigate = useNavigate();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { margin: "-74px 0px -100% 0px" });
  const isInViewAnimate = useInView(ref, { margin: "0% 0px -30% 0px" });

  useEffect(() => {
    if (isInView) navigate({ to: "/", hash: id?.startsWith("top") ? "top" : id, replace: true, hashScrollIntoView: false });
  }, [isInView, id, navigate]);

  return (
    <motion.section
      animate={isInViewAnimate ? { opacity: 1, y: 0 } : {}}
      className={cn(SECTION.base(), className)}
      id={id}
      initial={{ opacity: 0, y: 20 }}
      ref={ref}
      transition={{ duration: 0.5 }}
    >
      {withSeparator && <Separator className={SECTION.separator()} orientation="vertical" />}
      {title && <h2 className={SECTION.title()}>{title}</h2>}
      {description && <p className={SECTION.description()}>{description}</p>}
      {children}
    </motion.section>
  );
}
export type SectionProps = React.ComponentProps<"section"> & { description?: string; id: string; title?: string; withSeparator?: boolean };

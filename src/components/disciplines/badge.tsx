import { cva } from "class-variance-authority";
import { Badge, type BadgeProps } from "@/components/adapted/badge";
import { type DisciplinesSlug, getDisciplineBySlug } from "@/data/disciplines";
import { cn } from "@/lib/utils";

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
export const DISCIPLINES_BADGE = {
  base: cva("font-normal text-sm", { variants: { discipline: { anima: "bg-anima", animus: "bg-animus", yogart: "bg-yogart" } } }),
};

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
export const DisciplinesBadge = ({ className, slug, ...props }: DisciplinesBadgeProps) => {
  const { title } = getDisciplineBySlug(slug);
  return (
    <Badge {...props} className={cn(DISCIPLINES_BADGE.base({ discipline: slug }), className)}>
      {title}
    </Badge>
  );
};
type DisciplinesBadgeProps = BadgeProps & { slug: DisciplinesSlug };

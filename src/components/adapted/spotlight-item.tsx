import { cva } from "class-variance-authority";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Item, type ItemProps } from "./item";

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
const SPOTLIGHT_ITEM = {
  base: cva("relative overflow-hidden rounded-3xl border-none p-8"),
  light: cva("pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out"),
};

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
export function SpotlightItem({ children, className = "", color = "rgba(255, 255, 255, 0.25)" }: SpotlightItemProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState<number>(0);

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!cardRef.current || isFocused) return;

    const rect = cardRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(0.6);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => setOpacity(0.6);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <Item
      className={cn(SPOTLIGHT_ITEM.base(), className)}
      onBlur={handleBlur}
      onFocus={handleFocus}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      ref={cardRef}
    >
      <div
        className={SPOTLIGHT_ITEM.light()}
        style={{
          opacity,
          background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${color}, transparent 80%)`,
        }}
      />
      {children}
    </Item>
  );
}
type SpotlightItemProps = ItemProps & { color?: `rgba(${number}, ${number}, ${number}, ${number})` };
type Position = { x: number; y: number };

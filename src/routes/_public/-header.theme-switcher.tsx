import { cva } from "class-variance-authority";
import { useCallback, useRef } from "react";
import { flushSync } from "react-dom";
import { Button } from "@/components/adapted/button";
import { useTheme } from "@/lib/theme";

// HEADER THEME SWITCHER -------------------------------------------------------------------------------------------------------------------
const HEADER_THEME_SWITCHER = {
  dark: cva("icon-[lucide--sun] size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"),
  light: cva("icon-[lucide--moon] absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"),
};

export function HeaderThemeSwitcher() {
  const { appTheme, setTheme } = useTheme();

  const buttonRef = useRef<HTMLButtonElement>(null);

  const onClickToggle = useCallback(() => {
    const button = buttonRef.current;
    if (!button) return;

    const { top, left, width, height } = button.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const viewportWidth = window.visualViewport?.width ?? window.innerWidth;
    const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
    const maxRadius = Math.hypot(Math.max(x, viewportWidth - x), Math.max(y, viewportHeight - y));

    if (typeof document.startViewTransition !== "function") {
      setTheme(appTheme === "light" ? "dark" : "light");
      return;
    }

    const transition = document.startViewTransition(() => {
      flushSync(() => setTheme(appTheme === "light" ? "dark" : "light"));
    });

    const ready = transition?.ready;
    if (ready && typeof ready.then === "function") {
      ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${maxRadius}px at ${x}px ${y}px)`],
          },
          {
            duration: 400,
            easing: "ease-in-out",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      });
    }
  }, [appTheme, setTheme]);

  return (
    <Button className="cursor-pointer" onClick={onClickToggle} ref={buttonRef} size="icon" type="button" variant="outline">
      <span className={HEADER_THEME_SWITCHER.dark()} />
      <span className={HEADER_THEME_SWITCHER.light()} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

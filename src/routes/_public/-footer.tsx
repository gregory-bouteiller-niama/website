import { Link } from "@tanstack/react-router";
import { Button } from "@/components/adapted/button";
import type { ReadPublicLayoutProps } from "@/functions/layouts";

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
export const PublicFooter = ({ socials }: Pick<ReadPublicLayoutProps, "socials">) => {
  return (
    <footer className="container pointer-events-none fixed bottom-4 mx-auto flex w-full justify-between self-center rounded-full px-4 py-2">
      <Button className="pointer-events-auto backdrop-blur-xl" nativeButton={false} render={<Link to="/" />} variant="outline">
        Mentions Légales
      </Button>
      <div className="flex items-center gap-2">
        {socials.map(({ icon, href, key }) => (
          <Button
            className="pointer-events-auto backdrop-blur-xl"
            key={key}
            nativeButton={false}
            render={<a href={href} target="_blank" />}
            size="icon"
            variant="outline"
          >
            <span className={`${icon} size-5`} />
          </Button>
        ))}
      </div>
    </footer>
  );
};

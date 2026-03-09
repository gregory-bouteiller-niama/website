import { Link } from "@tanstack/react-router";
import { Button } from "@/components/adapted/button";

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
export const PublicFooter = () => {
  const data = {
    socials: [
      { key: "youtube", icon: "icon-[line-md--youtube-filled]", href: "https://youtube.com/@niama-fr" },
      { key: "instagram", icon: "icon-[line-md--instagram]", href: "https://www.instagram.com/niama.fr/" },
    ],
  };

  return (
    <footer className="container pointer-events-none fixed bottom-4 mx-auto flex w-full justify-between self-center rounded-full px-4 py-2">
      <Button className="pointer-events-auto backdrop-blur-xl" nativeButton={false} render={<Link to="/" />} variant="outline">
        Mentions Légales
      </Button>
      <div className="flex items-center gap-2">
        {data.socials.map(({ icon, href, key }) => (
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

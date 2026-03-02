import { Link, linkOptions } from "@tanstack/react-router";
import { Image } from "@unpic/react";
import { useAuth } from "@workos/authkit-tanstack-react-start/client";
import { cva } from "class-variance-authority";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/lib/theme";

// DATA ------------------------------------------------------------------------------------------------------------------------------------
const navs = linkOptions([
  { key: "disciplines", text: "Disciplines", to: "/disciplines" },
  { key: "a-propos", text: "A propos", to: "/a-propos" },
]);

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
const HEADER = {
  aside: cva("flex items-center gap-2"),
  base: cva("glass sticky top-0 z-50 w-full px-2 py-4 sm:px-4"),
  container: cva("container mx-auto flex justify-end"),
  main: cva("flex items-center gap-2"),
  nav: cva("uppercase tracking-widest hover:text-primary"),
  navs: cva("flex items-center gap-1"),
  progress: cva("fixed inset-x-0 top-0 z-50"),
};

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
export default function Header({ signInUrl, signUpUrl }: { signInUrl: string; signUpUrl: string }) {
  return (
    <header className={HEADER.base()}>
      <div className={HEADER.container()}>
        {/* <div className={HEADER.main()}>
          <HeaderLogo />
        </div>
        <HeaderNavs /> */}
        <div className={HEADER.aside()}>
          <HeaderThemeSwitcher />
          {/* <HeaderUser signInUrl={signInUrl} signUpUrl={signUpUrl} /> */}
        </div>
      </div>
    </header>
  );
}

// USER ------------------------------------------------------------------------------------------------------------------------------------
function HeaderUser({ signInUrl, signUpUrl }: { signInUrl: string; signUpUrl: string }) {
  const { signOut, user } = useAuth();

  if (!user)
    return (
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button size="icon">
              <span className="icon-[tabler--user]" />
            </Button>
          }
        />
        <DropdownMenuContent align="end" className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg" sideOffset={4}>
          <DropdownMenuGroup>
            <DropdownMenuItem render={<a href={signInUrl} />}>
              <span className="icon-[tabler--login]" />
              Je me connecte
            </DropdownMenuItem>
            <DropdownMenuItem render={<a href={signUpUrl} />}>
              <span className="icon-[tabler--user-plus]" />
              Je m'inscris
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button size="icon">
            <span className="icon-[tabler--user]" />
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg" side="right" sideOffset={4}>
        <DropdownMenuGroup>
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage alt={user?.name} src={user?.avatar} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user?.name}</span>
                <span className="truncate text-muted-foreground text-xs">{user?.email}</span>
              </div>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <span className="icon-[tabler--user-circle]" />
            Mon compte
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span className="icon-[tabler--notification]" />
            Mes notifications
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          <span className="icon-[tabler--logout]" />
          Je me déconnecte
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// LOGO ------------------------------------------------------------------------------------------------------------------------------------
const LOGO = {
  base: cva("flex items-center gap-2 pl-1 transition-colors hover:text-primary"),
  icon: cva("icon-[tabler--circle] size-7 text-primary drop-shadow-md"),
  me: cva("text-primary"),
  title: cva("hidden font-heading text-xl tracking-tight sm:flex"),
};

function HeaderLogo() {
  return (
    <Link className={LOGO.base()} to="/">
      <Image alt="Logo" className="w-10" height={40} src="/logo.svg" width={40} />
      <h1 className={LOGO.title()}>
        níama
        <span className={LOGO.me()} />
      </h1>
    </Link>
  );
}

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
function HeaderNavs() {
  return (
    <nav className={HEADER.navs()}>
      {navs.map(({ text, to, ...r }) => (
        <Button
          {...r}
          className={HEADER.nav()}
          key={to}
          nativeButton={false}
          render={<Link activeProps={{ className: "text-primary" }} to={to} />}
          variant="ghost"
        >
          {text}
        </Button>
      ))}
    </nav>
  );
}

// THEME SWITCHER --------------------------------------------------------------------------------------------------------------------------
const THEME_SWITCHER = {
  dark: cva("icon-[lucide--sun] size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"),
  light: cva("icon-[lucide--moon] absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"),
};

function HeaderThemeSwitcher() {
  const { appTheme, setTheme } = useTheme();

  function onClickToggle() {
    setTheme(appTheme === "light" ? "dark" : "light");
  }

  return (
    <Button onClick={onClickToggle} size="icon" type="button" variant="outline">
      <span className={THEME_SWITCHER.dark()} />
      <span className={THEME_SWITCHER.light()} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

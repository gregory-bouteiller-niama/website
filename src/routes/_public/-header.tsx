import { Link } from "@tanstack/react-router";
import { useStore } from "@tanstack/react-store";
import { cva } from "class-variance-authority";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useCallback, useMemo } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/adapted/dropdown-menu";
import { Logo } from "@/components/logo";
import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { ReadPublicLayoutProps } from "@/functions/layouts";
import { setHeaderHoveredId, setIsScrolled, store } from "@/lib/store";
import { HeaderThemeSwitcher } from "./-header.theme-switcher";

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
const HEADER = {
  actions: cva("flex gap-1"),
  base: cva("container mx-auto flex h-14.5 items-center justify-between self-center rounded-full border px-2", {
    variants: { isScrolled: { true: "border-muted shadow-lg backdrop-blur-xl", false: "border-transparent" } },
  }),
  logo: cva("duration-300", {
    variants: {
      isScrolled: { true: "" },
      variant: {
        aside: "w-11",
        main: "z-40 mt-12 mb-4 flex w-32 animate-float flex-col items-center self-center",
      },
    },
    compoundVariants: [
      { isScrolled: false, variant: "aside", class: "scale-0" },
      { isScrolled: true, variant: "aside", class: "scale-100" },
    ],
  }),
  menu: cva("sticky top-4 z-50 flex min-h-14.5 w-auto flex-col justify-center self-center border-y py-2", {
    variants: { isScrolled: { true: "border-y-transparent", false: "border-y-muted" } },
  }),
  nav: cva("relative cursor-pointer px-4 py-2 uppercase tracking-widest sm:px-2 sm:py-1 sm:text-sm md:px-4 md:py-2 md:text-base"),
  navs: cva("flex-col items-center sm:flex-row", { variants: { isScrolled: { true: "hidden sm:flex", false: "flex" } } }),
  stain: cva("absolute inset-0 size-full rounded-full bg-accent text-accent-foreground"),
  stainContent: cva("relative z-10"),
  wrapper: cva("fixed inset-x-4 top-4 z-50"),
};

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
export function PublicHeader({ navs }: Pick<ReadPublicLayoutProps, "navs">) {
  const { scrollY } = useScroll();
  const isScrolled = useStore(store, (state) => state.isScrolled);

  useMotionValueEvent(scrollY, "change", (latest) => setIsScrolled(latest > 235));

  const handleOnMouseLeave = () => setHeaderHoveredId();

  return (
    <>
      <div className={HEADER.wrapper()}>
        <header className={HEADER.base({ isScrolled })}>
          <Link className={HEADER.logo({ isScrolled, variant: "aside" })} to="/">
            <Logo showTitle={false} />
          </Link>

          <div className={HEADER.actions()}>
            <HeaderThemeSwitcher />
            {/* <HeaderUser signInUrl={signInUrl} signUpUrl={signUpUrl} /> */}
            <HeaderBurger isScrolled={isScrolled} navs={navs} />
          </div>
        </header>
      </div>
      <Section className="flex justify-center" id="top-1">
        <Link className={HEADER.logo({ variant: "main" })} to="/">
          <Logo className="w-full" />
        </Link>
      </Section>
      <Separator className="self-center! h-6" orientation="vertical" />
      <Section className={HEADER.menu({ isScrolled })} id="top-2">
        <nav className={HEADER.navs({ isScrolled })} {...{ onMouseLeave: handleOnMouseLeave }}>
          {navs.map((nav) => (
            <Link {...nav} activeOptions={{ includeHash: true }} key={nav.key} resetScroll={false}>
              {({ isActive }) => <HeaderNav isActive={isActive} nav={nav} />}
            </Link>
          ))}
        </nav>
      </Section>
      <Separator className="self-center! h-24" orientation="vertical" />
    </>
  );
}

// NAV -------------------------------------------------------------------------------------------------------------------------------------
function HeaderNav({ isActive, nav: { key, text } }: HeaderNavProps) {
  const headerHoveredId = useStore(store, ({ headerHoveredId }) => headerHoveredId);

  const handleOnMouseEnter = useCallback(() => setHeaderHoveredId(key), [key]);

  const isVisible = useMemo(() => headerHoveredId === key || isActive, [headerHoveredId, isActive, key]);

  return (
    <button className={HEADER.nav()} onMouseEnter={handleOnMouseEnter} type="button">
      {isVisible ? <motion.div className={HEADER.stain()} layoutId="hovered" /> : null}
      <span className={HEADER.stainContent()}>{text}</span>
    </button>
  );
}
export type HeaderNavProps = { isActive: boolean; nav: ReadPublicLayoutProps["navs"][number] };

// BURGER ----------------------------------------------------------------------------------------------------------------------------------
const BURGER = {
  content: cva("w-(--radix-dropdown-menu-trigger-width) rounded-3xl border bg-transparent p-4 shadow-lg backdrop-blur-xl"),
  item: cva("uppercase tracking-widest"),
  trigger: cva("cursor-pointer", { variants: { isScrolled: { true: "flex scale-100 sm:hidden", false: "hidden scale-0" } } }),
  triggerIcon: cva("icon-[lucide--menu]"),
};

function HeaderBurger({ isScrolled, navs }: { isScrolled: boolean } & Pick<ReadPublicLayoutProps, "navs">) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button className={BURGER.trigger({ isScrolled })} size="icon" variant="outline">
            <span className={BURGER.triggerIcon()} />
          </Button>
        }
      />
      <DropdownMenuContent align="end" className={BURGER.content()} sideOffset={18}>
        <DropdownMenuGroup>
          {navs.map(({ key, ...nav }) => (
            <DropdownMenuItem
              className={BURGER.item()}
              key={key}
              render={<Link {...nav} activeOptions={{ includeHash: true }} resetScroll={false} />}
            >
              {nav.text}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// USER ------------------------------------------------------------------------------------------------------------------------------------
// function HeaderUser({ signInUrl, signUpUrl }: { signInUrl: string; signUpUrl: string }) {
//   const { signOut, user } = useAuth();

//   if (!user)
//     return (
//       <DropdownMenu>
//         <DropdownMenuTrigger
//           render={
//             <Button size="icon">
//               <span className="icon-[tabler--user]" />
//             </Button>
//           }
//         />
//         <DropdownMenuContent align="end" className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg" sideOffset={4}>
//           <DropdownMenuGroup>
//             <DropdownMenuItem render={<a href={signInUrl} />}>
//               <span className="icon-[tabler--login]" />
//               Je me connecte
//             </DropdownMenuItem>
//             <DropdownMenuItem render={<a href={signUpUrl} />}>
//               <span className="icon-[tabler--user-plus]" />
//               Je m'inscris
//             </DropdownMenuItem>
//           </DropdownMenuGroup>
//         </DropdownMenuContent>
//       </DropdownMenu>
//     );

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger
//         render={
//           <Button size="icon">
//             <span className="icon-[tabler--user]" />
//           </Button>
//         }
//       />
//       <DropdownMenuContent align="end" className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg" side="right" sideOffset={4}>
//         <DropdownMenuGroup>
//           <DropdownMenuLabel className="p-0 font-normal">
//             <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
//               <Avatar className="h-8 w-8 rounded-lg">
//                 <AvatarImage alt={user?.name} src={user?.avatar} />
//                 <AvatarFallback className="rounded-lg">CN</AvatarFallback>
//               </Avatar>
//               <div className="grid flex-1 text-left text-sm leading-tight">
//                 <span className="truncate font-medium">{user?.name}</span>
//                 <span className="truncate text-muted-foreground text-xs">{user?.email}</span>
//               </div>
//             </div>
//           </DropdownMenuLabel>
//         </DropdownMenuGroup>
//         <DropdownMenuSeparator />
//         <DropdownMenuGroup>
//           <DropdownMenuItem>
//             <span className="icon-[tabler--user-circle]" />
//             Mon compte
//           </DropdownMenuItem>
//           <DropdownMenuItem>
//             <span className="icon-[tabler--notification]" />
//             Mes notifications
//           </DropdownMenuItem>
//         </DropdownMenuGroup>
//         <DropdownMenuSeparator />
//         <DropdownMenuItem onClick={() => signOut()}>
//           <span className="icon-[tabler--logout]" />
//           Je me déconnecte
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }

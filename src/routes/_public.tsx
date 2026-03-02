import { createFileRoute, Outlet } from "@tanstack/react-router";
import { getSignInUrl, getSignUpUrl } from "@workos/authkit-tanstack-react-start";
import { cva } from "class-variance-authority";
import { GravityStarsBackground } from "@/components/animate-ui/components/backgrounds/gravity-stars";
import Header from "./-header";

// ROUTE -----------------------------------------------------------------------------------------------------------------------------------
export const Route = createFileRoute("/_public")({
  component: PublicLayout,
  loader: async () => {
    const signInUrl = await getSignInUrl();
    const signUpUrl = await getSignUpUrl();
    return { signInUrl, signUpUrl };
  },
});

// PAGE ------------------------------------------------------------------------------------------------------------------------------------
function PublicLayout() {
  const { signInUrl, signUpUrl } = Route.useLoaderData();
  return (
    <>
      <Header signInUrl={signInUrl} signUpUrl={signUpUrl} />
      <OrbitalBackground />
      <GravityStarsBackground className="fixed inset-0" />
      <Outlet />
    </>
  );
}

// BG --------------------------------------------------------------------------------------------------------------------------------------
const ORBITAL = {
  base: cva(
    "pointer-events-none fixed top-1/2 left-1/2 -z-10 flex size-svw min-h-[1000px] min-w-[1000px] -translate-x-1/2 -translate-y-1/2 items-center justify-center"
  ),
  orbit: cva("absolute animate-spin rounded-full border border-foreground/5"),
  planet: cva(
    "absolute top-0 left-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_0_10px_2px_rgba(255,255,255,0.8)]"
  ),
};

function OrbitalBackground() {
  return (
    <div className={ORBITAL.base()}>
      <div className={ORBITAL.orbit({ className: "animation-duration-[60s] size-1/3" })}>
        <div className={ORBITAL.planet({ className: "bg-yogart dark:bg-white dark:shadow-[0_0_10px_2px_var(--yogart)]" })} />
      </div>
      <div className={ORBITAL.orbit({ className: "animation-duration-[120s] direction-[reverse] size-2/3" })}>
        <div className={ORBITAL.planet({ className: "bg-anima dark:bg-white dark:shadow-[0_0_10px_2px_var(--anima)]" })} />
      </div>
      <div className={ORBITAL.orbit({ className: "animation-duration-[180s] size-11/12" })}>
        <div className={ORBITAL.planet({ className: "bg-animus dark:bg-white dark:shadow-[0_0_10px_2px_var(--animus)]" })} />
      </div>
    </div>
  );
}

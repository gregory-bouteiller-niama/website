import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Image } from "@unpic/react";
import { getAuth, getSignInUrl, getSignUpUrl } from "@workos/authkit-tanstack-react-start";
import { useMutation } from "convex/react";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";

// ROUTE -----------------------------------------------------------------------------------------------------------------------------------
export const Route = createFileRoute("/_public/")({
  component: IndexPage,
  loader: async () => {
    const { user } = await getAuth();
    const signInUrl = await getSignInUrl();
    const signUpUrl = await getSignUpUrl();

    return { user, signInUrl, signUpUrl };
  },
});

// PAGE ------------------------------------------------------------------------------------------------------------------------------------
function IndexPage() {
  const { signInUrl, signUpUrl } = Route.useLoaderData();
  return <IndexPageContent signInUrl={signInUrl} signUpUrl={signUpUrl} />;
}

// CONTENT ---------------------------------------------------------------------------------------------------------------------------------
function IndexPageContent({ signInUrl, signUpUrl }: { signInUrl: string; signUpUrl: string }) {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-12 px-4 py-8 sm:px-8">
      <div className="flex animate-float flex-col items-center gap-2">
        <Image alt="Logo" className="w-32" height={100} sizes="128px" src="/logo.png" width={100} />
        <span className="font-logo text-[40px]">níama</span>
      </div>
      <div className="flex w-full max-w-3xl flex-col items-center gap-8">
        <h1 className="text-center font-heading text-7xl sm:text-8xl">L'équilibre invisible rendu tangible</h1>
        <p className="text-center text-lg text-muted-foreground sm:text-xl">
          Une constellation d'accompagnants rassemblés autour d'une philosophie commune : vous guider sur le chemin de votre alignement
          intérieur.
        </p>
      </div>
      <Button className="relative rounded-4xl p-6 uppercase tracking-widest" size="lg" variant="outline">
        Bientôt disponible
      </Button>
      {/* <h1 className="text-center font-bold text-4xl">Convex + TanStack Start + WorkOS</h1>
      <Authenticated>
        <Suspense fallback={<div>Loading...</div>}>
          <Content />
        </Suspense>
      </Authenticated>
      <Unauthenticated>
        <SignInForm signInUrl={signInUrl} signUpUrl={signUpUrl} />
      </Unauthenticated> */}
    </main>
  );
}

// SIGNIN ----------------------------------------------------------------------------------------------------------------------------------
function SignInForm({ signInUrl, signUpUrl }: { signInUrl: string; signUpUrl: string }) {
  return (
    <div className="mx-auto flex w-96 flex-col gap-8">
      <p>Log in to see the numbers</p>
      <a href={signInUrl}>
        <Button className="rounded-md bg-foreground px-4 py-2 text-background">Sign in</Button>
      </a>
      <a href={signUpUrl}>
        <Button className="rounded-md bg-foreground px-4 py-2 text-background">Sign up</Button>
      </a>
    </div>
  );
}

// CONTENT ---------------------------------------------------------------------------------------------------------------------------------
function Content() {
  const {
    data: { viewer, numbers },
  } = useSuspenseQuery(convexQuery(api.myFunctions.listNumbers, { count: 10 }));
  const addNumber = useMutation(api.myFunctions.addNumber);

  return (
    <div className="mx-auto flex max-w-lg flex-col gap-8">
      <p>Welcome {viewer}!</p>
      <p>Click the button below and open this page in another window - this data is persisted in the Convex cloud database!</p>
      <p>
        <Button
          className="rounded-md bg-foreground px-4 py-2 text-background text-sm"
          onClick={() => addNumber({ value: Math.floor(Math.random() * 10) })}
        >
          Add a random number
        </Button>
      </p>
      <p>Numbers: {numbers.length === 0 ? "Click the button!" : numbers.join(", ")}</p>
      <p>
        Edit{" "}
        <code className="rounded-md bg-slate-200 px-1 py-0.5 font-bold font-mono text-sm dark:bg-slate-800">convex/myFunctions.ts</code> to
        change your backend
      </p>
      <p>
        Edit <code className="rounded-md bg-slate-200 px-1 py-0.5 font-bold font-mono text-sm dark:bg-slate-800">src/routes/index.tsx</code>{" "}
        to change your frontend
      </p>
      <p>
        See{" "}
        <Link className="underline hover:no-underline" to="/authenticated">
          /authenticated
        </Link>{" "}
        for an example of a page only available to authenticated users.
      </p>
      <div className="flex flex-col">
        <p className="font-bold text-lg">Useful resources:</p>
        <div className="flex gap-2">
          <div className="flex w-1/2 flex-col gap-2">
            <ResourceCard
              description="Read comprehensive documentation for all Convex features."
              href="https://docs.convex.dev/home"
              title="Convex docs"
            />
            <ResourceCard
              description="Learn about best practices, use cases, and more from a growing collection of articles, videos, and walkthroughs."
              href="https://stack.convex.dev"
              title="Stack articles"
            />
          </div>
          <div className="flex w-1/2 flex-col gap-2">
            <ResourceCard
              description="Browse our collection of templates to get started quickly."
              href="https://www.convex.dev/templates"
              title="Templates"
            />
            <ResourceCard
              description="Join our developer community to ask questions, trade tips & tricks, and show off your projects."
              href="https://www.convex.dev/community"
              title="Discord"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// RESOURCE CARD ---------------------------------------------------------------------------------------------------------------------------
function ResourceCard({ title, description, href }: { title: string; description: string; href: string }) {
  return (
    <div className="flex h-28 flex-col gap-2 overflow-auto rounded-md bg-slate-200 p-4 dark:bg-slate-800">
      <a className="text-sm underline hover:no-underline" href={href}>
        {title}
      </a>
      <p className="text-xs">{description}</p>
    </div>
  );
}

import type { ConvexQueryClient } from "@convex-dev/react-query";
import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, HeadContent, Scripts } from "@tanstack/react-router";
import type { ConvexReactClient } from "convex/react";
import { ThemeProvider } from "@/lib/theme";
import appCssUrl from "../app.css?url";

// FUNCTIONS -------------------------------------------------------------------------------------------------------------------------------
// const fetchAuth = createServerFn({ method: "GET" }).handler(async () => {
//   const auth = await getAuth();
//   const { user } = auth;
//   return { token: user ? auth.accessToken : null, userId: user?.id ?? null };
// });

// ROUTE -----------------------------------------------------------------------------------------------------------------------------------
export const Route = createRootRouteWithContext<RootContext>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "níama | l'équilibre invisible devenu tangible" },
    ],
    links: [
      { rel: "stylesheet", href: appCssUrl },
      { rel: "icon", href: "/logo.svg" },
    ],
  }),
  // beforeLoad: async (ctx) => {
  //   const { userId, token } = await fetchAuth();
  //   // During SSR only (the only time serverHttpClient exists),
  //   // set the WorkOS auth token to make HTTP queries with.
  //   if (token) ctx.context.convexQueryClient.serverHttpClient?.setAuth(token);
  //   return { token, userId };
  // },
  shellComponent: RootDocument,
});

// DOCUMENT --------------------------------------------------------------------------------------------------------------------------------
function RootDocument({ children }: RootDocumentProps) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="flex min-h-screen flex-col overflow-x-hidden antialiased">
        <ThemeProvider>{children}</ThemeProvider>
        <Scripts />
      </body>
    </html>
  );
}
type RootDocumentProps = React.PropsWithChildren;

// TYPES -----------------------------------------------------------------------------------------------------------------------------------
type RootContext = {
  convexClient: ConvexReactClient;
  convexQueryClient: ConvexQueryClient;
  queryClient: QueryClient;
};
